import type { Village } from '@/types';

export const defaultVillageSlug = 'sonegaon-tarf-satara';

/** Census 2011 & public directory data — Sonegaon Tarf Satara, Satara taluka, Satara district */
export const villageConfig: Village = {
  slug: 'sonegaon-tarf-satara',
  nameMarathi: 'सोनेगाव तर्फ सातारा',
  nameEnglish: 'Sonegaon Tarf Satara',
  taluka: { mr: 'सातारा', en: 'Satara' },
  district: { mr: 'सातारा', en: 'Satara' },
  state: { mr: 'महाराष्ट्र', en: 'Maharashtra' },
  pincode: '415002',
  population: 2384,
  households: 489,
  literacy: 78,
  wards: 7,
  area: '9.46 चौ. कि.मी. (946 हे.)',
  contact: '+91-2162-234291',
  email: 'gpsongaontarf@gmail.com',
  officeHours: {
    mr: 'सोमवार ते शुक्रवार: सकाळी १० ते संध्याकाळी ५',
    en: 'Monday to Friday: 10 AM to 5 PM',
  },
  sarpanch: {
    name: { mr: 'भारती रमेश कुंभार', en: 'Bharti Ramesh Kumbhar' },
    role: { mr: 'सरपंच', en: 'Sarpanch' },
    phone: '+91-2162-234291',
  },
  gramsevak: {
    name: { mr: 'मदन बापूराव जगताप', en: 'Madan Bapurav Jagtaap' },
    role: { mr: 'ग्रामसेवक / सचिव', en: 'Gram Sevak / Secretary' },
    phone: '+91-2162-234291',
  },
  mapCoordinates: { lat: 17.652669, lng: 74.008988 },
  lastUpdated: '2026-03-01',
  stats: {
    waterSources: 4,
    schools: 2,
    anganwadis: 2,
    healthFacilities: 1,
  },
  socialLinks: {},
};

/** Extended public facts (Census 2011, village directories) */
export const villageFacts = {
  villageCode: '563892',
  gramPanchayatCode: '313',
  blockPanchayat: { mr: 'सातारा', en: 'Satara' },
  talukaHQ: { mr: 'सातारा (४ कि.मी.)', en: 'Satara (4 km)' },
  districtHQ: { mr: 'सातारा (४ कि.मी.)', en: 'Satara (4 km)' },
  nearestTown: { mr: 'सातारा', en: 'Satara' },
  nearestRailway: { mr: 'सातारा', en: 'Satara' },
  nearestAirport: { mr: 'पुणे', en: 'Pune' },
  postOffice: { mr: 'यादोगोपाळ पेठ (४१५००२)', en: 'Yadogophal Peth (415002)' },
  elevation: { mr: '६३७ मी.', en: '637 m' },
  assemblyConstituency: { mr: 'सातारा', en: 'Satara' },
  parliamentConstituency: { mr: 'सातारा', en: 'Satara' },
  gramPanchayatVillages: ['Sonegaon Tarf Satara'],
  sexRatio: 921,
  childPopulation: 237,
  scPopulation: 36,
  stPopulation: 6,
  workingPopulation: 52,
  description: {
    mr: 'सोनेगाव तर्फ सातारा हे सातारा जिल्ह्यातील सातारा तालुक्यातील एक ग्रामीण गाव आहे. गावाचा पिनकोड ४१५००२ आहे आणि यादोगोपाळ पेठ हे जवळचे पोस्ट ऑफिस आहे. २०११ जनगणनेनुसार गावाची लोकसंख्या २,३८४ आणि ४८९ कुटुंबे आहेत. गाव स्वतंत्र सोनेगाव त. सातारा ग्रामपंचायत अंतर्गत येते. तालुका व जिल्हा मुख्यालय सातारा अंदाजे ४ कि.मी. अंतरावर आहे. सार्वजनिक बस सेवा गावात उपलब्ध आहे.',
    en: 'Sonegaon Tarf Satara is a rural village in Satara taluka of Satara district, Maharashtra. PIN code 415002; nearest post office Yadogophal Peth. As per Census 2011, population is 2,384 with 489 households. The village has its own Gram Panchayat (Sonegaon T. Satara). Satara city, the taluka and district headquarters, is about 4 km away. Public bus service is available within the village.',
  },
};
