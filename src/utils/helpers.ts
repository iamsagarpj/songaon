import type { Language, LocalizedText } from '@/types';

export function getLocalized(text: LocalizedText, lang: Language): string {
  return text[lang] || text.mr;
}

export function formatCurrency(amount: number, lang: Language = 'mr'): string {
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(1);
    return lang === 'mr' ? `₹${lakhs} लाख` : `₹${lakhs} Lakh`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateStr: string, lang: Language = 'mr'): string {
  const date = new Date(dateStr);
  if (lang === 'mr') {
    return date.toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatNumber(num: number, lang: Language = 'mr'): string {
  if (lang === 'mr') {
    return num.toLocaleString('mr-IN');
  }
  return num.toLocaleString('en-IN');
}

export function generateComplaintNumber(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `GP-${year}-${num}`;
}

export function shareOnWhatsApp(text: string, url?: string): void {
  const message = url ? `${text}\n${url}` : text;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export function getGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
