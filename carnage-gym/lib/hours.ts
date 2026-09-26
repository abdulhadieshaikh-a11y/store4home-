import { site } from './site';

export type HoursStatus = {
  open: boolean;
  day: number;
  headline: string;
  detail: string;
};

/** Current weekday (0 = Sunday) in Karachi, regardless of the visitor's timezone. */
export function karachiDay(date = new Date()): number {
  const name = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Asia/Karachi' }).format(date);
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(name);
}

export function hoursStatus(date = new Date()): HoursStatus {
  const day = karachiDay(date);
  const open = (site.hours.openDays as readonly number[]).includes(day);

  if (!open) {
    return { open, day, headline: 'Closed today', detail: 'Reopens Monday · 12:00 AM' };
  }
  if (day === 6) {
    return { open, day, headline: 'Open now', detail: 'Open until midnight tonight' };
  }
  return { open, day, headline: 'Open now', detail: 'Open all day & all night' };
}
