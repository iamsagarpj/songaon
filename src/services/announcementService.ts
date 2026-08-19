import { announcements } from '@/data/announcements';
import { mockFetch } from './api';
import type { Announcement } from '@/types';

export const announcementService = {
  async getAll(): Promise<Announcement[]> {
    return mockFetch([...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  },
  async getPinned(): Promise<Announcement[]> {
    const all = await this.getAll();
    return all.filter((a) => a.pinned).slice(0, 3);
  },
  async getBySlug(slug: string): Promise<Announcement | undefined> {
    const all = await this.getAll();
    return all.find((a) => a.slug === slug);
  },
};
