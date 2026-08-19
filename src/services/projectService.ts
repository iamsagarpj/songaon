import { projects } from '@/data/projects';
import { mockFetch } from './api';
import type { Project } from '@/types';

export const projectService = {
  async getAll(): Promise<Project[]> {
    return mockFetch(projects);
  },
  async getBySlug(slug: string): Promise<Project | undefined> {
    const all = await this.getAll();
    return all.find((p) => p.slug === slug);
  },
  async getFeatured(limit = 3): Promise<Project[]> {
    const all = await this.getAll();
    return all.filter((p) => p.status === 'ongoing').slice(0, limit);
  },
};
