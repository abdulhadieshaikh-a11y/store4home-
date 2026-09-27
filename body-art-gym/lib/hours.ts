/**
 * Live "open now" logic, evaluated in Karachi time (Asia/Karachi, UTC+5, no DST).
 * Monday–Saturday 08:00 → 01:00 the following day. Sunday closed.
 * So the gym is open:
 *   - Mon–Sat from 08:00 until midnight, and
 *   - Tue–Sun from 00:00 until 01:00 (the tail of the previous day's session).
 */

export type OpenState = { open: boolean; label: string; detail: string };

function karachiNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { weekday, hour: Number(get('hour')), minute: Number(get('minute')) };
}

export function getOpenState(date = new Date()): OpenState {
  const { weekday, hour } = karachiNow(date);
  const isTrainingDay = (d: number) => d >= 1 && d <= 6; // Mon..Sat
  const prevDay = (weekday + 6) % 7;

  if (hour < 1 && isTrainingDay(prevDay)) {
    return { open: true, label: 'Open now', detail: 'Closes at 1:00 AM' };
  }
  if (isTrainingDay(weekday) && hour >= 8) {
    return { open: true, label: 'Open now', detail: 'Until 1:00 AM tonight' };
  }
  if (isTrainingDay(weekday) && hour < 8) {
    return { open: false, label: 'Closed now', detail: 'Opens today at 8:00 AM' };
  }
  // Sunday (after 1 AM), or Monday before 8 AM is handled above.
  return { open: false, label: 'Closed today', detail: 'Opens Monday at 8:00 AM' };
}
