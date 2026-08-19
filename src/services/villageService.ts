import { villageConfig } from '@/config/village';
import { mockFetch } from './api';
import type { Village } from '@/types';

export const villageService = {
  async getVillage(slug?: string): Promise<Village> {
    await mockFetch(null);
    if (slug && slug !== villageConfig.slug) {
      throw new Error('Village not found');
    }
    return villageConfig;
  },
};
