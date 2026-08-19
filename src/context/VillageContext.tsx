import { createContext, useContext, type ReactNode } from 'react';
import type { Village } from '@/types';
import { villageConfig } from '@/config/village';

interface VillageContextType {
  village: Village;
}

const VillageContext = createContext<VillageContextType | null>(null);

export function VillageProvider({ children, village = villageConfig }: { children: ReactNode; village?: Village }) {
  return <VillageContext.Provider value={{ village }}>{children}</VillageContext.Provider>;
}

export function useVillage() {
  const ctx = useContext(VillageContext);
  if (!ctx) throw new Error('useVillage must be used within VillageProvider');
  return ctx;
}
