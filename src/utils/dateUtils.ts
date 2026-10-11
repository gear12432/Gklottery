export function formatDate(dateStringOrTimestamp: string | number): string {
  const d = new Date(dateStringOrTimestamp);
  if (isNaN(d.getTime())) return String(dateStringOrTimestamp);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateStringOrTimestamp: string | number): string {
  const d = new Date(dateStringOrTimestamp);
  if (isNaN(d.getTime())) return String(dateStringOrTimestamp);
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getTodayDateKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatCountdown(targetTimestamp: number): { hours: string; minutes: string; seconds: string; isExpired: boolean } {
  const now = Date.now();
  const diff = targetTimestamp - now;

  if (diff <= 0) {
    return { hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isExpired: false,
  };
}
