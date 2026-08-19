import { schemes } from '@/data/schemes';
import { mockFetch } from './api';
import type { Scheme, SchemeCategory } from '@/types';

export const schemeService = {
  async getAll(): Promise<Scheme[]> {
    return mockFetch(schemes);
  },
  async getByCategory(category: SchemeCategory): Promise<Scheme[]> {
    const all = await this.getAll();
    return all.filter((s) => s.category === category);
  },
  async getBySlug(slug: string): Promise<Scheme | undefined> {
    const all = await this.getAll();
    return all.find((s) => s.slug === slug);
  },
  async findByProfile(who: string, help: string): Promise<Scheme[]> {
    const all = await this.getAll();
    const whoMap: Record<string, SchemeCategory[]> = {
      farmer: ['agriculture-rural-environment', 'utility-sanitation'],
      woman: ['women-child', 'business-entrepreneurship', 'skills-employment'],
      student: ['education-learning', 'sports-culture'],
      senior: ['social-welfare-empowerment', 'health-wellness'],
      worker: ['skills-employment', 'social-welfare-empowerment'],
      entrepreneur: ['business-entrepreneurship', 'skills-employment', 'banking-finance-insurance'],
    };
    const helpMap: Record<string, SchemeCategory[]> = {
      financial: ['social-welfare-empowerment', 'agriculture-rural-environment', 'women-child', 'banking-finance-insurance'],
      housing: ['housing-shelter'],
      education: ['education-learning'],
      employment: ['skills-employment', 'business-entrepreneurship'],
      health: ['health-wellness', 'social-welfare-empowerment'],
      farming: ['agriculture-rural-environment'],
    };
    const categories = new Set([...(whoMap[who] || []), ...(helpMap[help] || [])]);
    return all.filter((s) => categories.has(s.category));
  },
};
