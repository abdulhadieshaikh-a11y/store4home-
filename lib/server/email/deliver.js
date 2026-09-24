import 'server-only';
import { getSql } from '../db';
import { sendViaResend } from './resend';

// A "pending" row older than this is treated as an abandoned attempt and may be retried.
const STALE_PENDING_MINUTES = 5;

// Sends an email at most once per dedupeKey and records the outcome in email_log.
// Never throws: a failed email is recorded (and can be retried from the admin) but
// never undoes or blocks the order it belongs to.
export async function deliverEmail({ dedupeKey, orderId = null, kind, meta = {}, to, subject, html, text }) {
  try {
    const sql = getSql();
    await sql`
      insert into email_log (dedupe_key, order_id, kind, meta, recipient, subject)
      values (${dedupeKey}, ${orderId}, ${kind}, ${sql.json(meta)}, ${to || '(not configured)'}, ${subject})
      on conflict (dedupe_key) do nothing
    `;

    // Atomically claim the row, so two concurrent requests cannot both send it.
    const [claimed] = await sql`
      update email_log set
        status = 'pending', attempts = attempts + 1, recipient = ${to || '(not configured)'},
        subject = ${subject}, updated_at = now()
      where dedupe_key = ${dedupeKey}
        and (status = 'failed'
             or (status = 'pending' and (attempts = 0 or updated_at < now() - make_interval(mins => ${STALE_PENDING_MINUTES}))))
      returning id
    `;
    if (!claimed) return { status: 'skipped' };

    const result = to
      ? await sendViaResend({ to, subject, html, text, idempotencyKey: dedupeKey })
      : { ok: false, error: 'No recipient address configured.' };

    if (result.ok) {
      await sql`
        update email_log set status = 'sent', provider_message_id = ${result.id}, last_error = null,
          sent_at = now(), updated_at = now()
        where id = ${claimed.id}
      `;
      return { status: 'sent' };
    }

    console.error(`[email] ${kind} for ${dedupeKey} failed: ${result.error}`);
    await sql`update email_log set status = 'failed', last_error = ${result.error}, updated_at = now() where id = ${claimed.id}`;
    return { status: 'failed', error: result.error };
  } catch (error) {
    console.error(`[email] ${kind} for ${dedupeKey} crashed:`, error);
    return { status: 'failed', error: String(error?.message || error) };
  }
}
