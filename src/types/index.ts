export type Language = 'mr' | 'en';

export type AnnouncementStatus = 'new' | 'important' | 'urgent';

export type ProjectStatus = 'planned' | 'ongoing' | 'completed' | 'stopped';

export type ComplaintStatus = 'registered' | 'investigating' | 'action' | 'resolved';

/** Categories as listed on myScheme.gov.in (15 sectors). */
export type SchemeCategory =
  | 'agriculture-rural-environment'
  | 'banking-finance-insurance'
  | 'business-entrepreneurship'
  | 'education-learning'
  | 'health-wellness'
  | 'housing-shelter'
  | 'public-safety-law'
  | 'science-it-communications'
  | 'skills-employment'
  | 'social-welfare-empowerment'
  | 'sports-culture'
  | 'transport-infrastructure'
  | 'travel-tourism'
  | 'utility-sanitation'
  | 'women-child';

export type FacilityCategory =
  | 'water'
  | 'roads'
  | 'streetlights'
  | 'schools'
  | 'anganwadi'
  | 'health'
  | 'toilets'
  | 'waste'
  | 'cemetery'
  | 'temple'
  | 'bus'
  | 'digital';

export interface LocalizedText {
  mr: string;
  en: string;
}

export interface Official {
  name: LocalizedText;
  role: LocalizedText;
  phone?: string;
  email?: string;
  photo?: string;
}

export interface Village {
  slug: string;
  nameMarathi: string;
  nameEnglish: string;
  taluka: LocalizedText;
  district: LocalizedText;
  state: LocalizedText;
  pincode: string;
  population: number;
  households: number;
  literacy: number;
  wards: number;
  area: string;
  contact: string;
  email: string;
  officeHours: LocalizedText;
  sarpanch: Official;
  gramsevak: Official;
  mapCoordinates?: { lat: number; lng: number };
  lastUpdated: string;
  stats: VillageStats;
  socialLinks?: { facebook?: string; twitter?: string; youtube?: string };
}

export interface VillageStats {
  waterSources: number;
  schools: number;
  anganwadis: number;
  healthFacilities: number;
}

export interface Announcement {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  content: LocalizedText;
  date: string;
  category: LocalizedText;
  status: AnnouncementStatus;
  pinned?: boolean;
  documentUrl?: string;
}

export interface Scheme {
  id: string;
  slug: string;
  name: LocalizedText;
  category: SchemeCategory;
  forWhom: LocalizedText;
  benefits: LocalizedText;
  eligibility: LocalizedText;
  documents: LocalizedText;
  howToApply: LocalizedText;
  deadline?: string;
  officialUrl?: string;
  contactHelp: LocalizedText;
  image?: string;
  isSample?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  name: LocalizedText;
  location: LocalizedText;
  category: LocalizedText;
  status: ProjectStatus;
  estimatedCost: number;
  approvedAmount: number;
  startDate: string;
  expectedCompletion: string;
  progress: number;
  description: LocalizedText;
  fundingSource: LocalizedText;
  contractor?: LocalizedText;
  approvalDate?: string;
  workOrder?: string;
  photos: string[];
  beforePhoto?: string;
  afterPhoto?: string;
  isSample?: boolean;
}

export interface Facility {
  id: string;
  slug: string;
  name: LocalizedText;
  category: FacilityCategory;
  location: LocalizedText;
  status: LocalizedText;
  contact?: string;
  photos?: string[];
}

export interface Complaint {
  id: string;
  number: string;
  name: string;
  mobile: string;
  category: LocalizedText;
  location: string;
  description: string;
  status: ComplaintStatus;
  date: string;
  updates: ComplaintUpdate[];
}

export interface ComplaintUpdate {
  date: string;
  message: LocalizedText;
  status: ComplaintStatus;
}

export interface FormDocument {
  id: string;
  slug: string;
  name: LocalizedText;
  category: LocalizedText;
  purpose: LocalizedText;
  documents: LocalizedText;
  instructions: LocalizedText;
  pdfUrl?: string;
  isSample?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  content: LocalizedText;
  date: string;
  category: LocalizedText;
  image: string;
}

export interface Event {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  time: string;
  location: LocalizedText;
}

export interface GalleryItem {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  image: string;
  date?: string;
}

export interface BudgetRecord {
  year: string;
  totalIncome: number;
  governmentGrants: number;
  localRevenue: number;
  developmentBudget: number;
  spent: number;
  remaining: number;
  isSample?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: LocalizedText;
  phone: string;
  icon: string;
}

export interface EducationInstitution {
  id: string;
  name: LocalizedText;
  type: 'school' | 'anganwadi';
  address: LocalizedText;
  contact: string;
  students?: number;
  facilities: LocalizedText;
  photo?: string;
}

export interface EmploymentOpportunity {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  contact?: string;
  deadline?: string;
}

export interface SearchResult {
  id: string;
  type: 'scheme' | 'notice' | 'project' | 'form' | 'facility' | 'page' | 'news';
  title: LocalizedText;
  description: LocalizedText;
  url: string;
}

export interface WeatherData {
  temperature: number;
  condition: LocalizedText;
  rainPossibility: number;
  humidity: number;
  isPlaceholder: boolean;
}

export interface TimelineEvent {
  year: number;
  title: LocalizedText;
  description: LocalizedText;
}
