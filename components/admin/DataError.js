import { AlertCircle } from 'lucide-react';

// Shown when the order database can't be reached or isn't configured yet.
export default function DataError({ error }) {
  const notConfigured = error?.name === 'DatabaseNotConfiguredError';
  return (
    <div role="alert" className="flex items-start gap-2 border border-gold-100 bg-gold-50 text-gold-700 rounded p-4 mb-6 text-[14px]">
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <span>
        {notConfigured
          ? 'The order database is not configured. Set DATABASE_URL and apply the migration in supabase/migrations.'
          : 'Could not load orders from the database. Check the server logs and database connection.'}
      </span>
    </div>
  );
}
