import { facilities } from '@/data/facilities';
import { forms, newsArticles, events, galleryItems, budgetRecords, emergencyContacts, educationInstitutions, employmentOpportunities } from '@/data/content';
import { mockFetch } from './api';
import type { Facility, FormDocument, NewsArticle, Event, GalleryItem, BudgetRecord, EmergencyContact, EducationInstitution, EmploymentOpportunity, Complaint, SearchResult, WeatherData } from '@/types';
import { schemes } from '@/data/schemes';
import { projects } from '@/data/projects';
import { announcements } from '@/data/announcements';
import { generateComplaintNumber } from '@/utils/helpers';

const complaintsStore: Complaint[] = [];

export const facilityService = {
  async getAll(): Promise<Facility[]> {
    return mockFetch(facilities);
  },
  async getBySlug(slug: string): Promise<Facility | undefined> {
    const all = await this.getAll();
    return all.find((f) => f.slug === slug);
  },
};

export const formService = {
  async getAll(): Promise<FormDocument[]> {
    return mockFetch(forms);
  },
  async getBySlug(slug: string): Promise<FormDocument | undefined> {
    const all = await this.getAll();
    return all.find((f) => f.slug === slug);
  },
};

export const newsService = {
  async getAll(): Promise<NewsArticle[]> {
    return mockFetch(newsArticles);
  },
  async getBySlug(slug: string): Promise<NewsArticle | undefined> {
    const all = await this.getAll();
    return all.find((n) => n.slug === slug);
  },
};

export const eventService = {
  async getAll(): Promise<Event[]> {
    return mockFetch(events);
  },
  async getUpcoming(limit = 3): Promise<Event[]> {
    const all = await this.getAll();
    return all.slice(0, limit);
  },
};

export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    return mockFetch(galleryItems);
  },
};

export const budgetService = {
  async getAll(): Promise<BudgetRecord[]> {
    return mockFetch(budgetRecords);
  },
  async getByYear(year: string): Promise<BudgetRecord | undefined> {
    const all = await this.getAll();
    return all.find((b) => b.year === year);
  },
};

export const contactService = {
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return mockFetch(emergencyContacts);
  },
};

export const educationService = {
  async getInstitutions(): Promise<EducationInstitution[]> {
    return mockFetch(educationInstitutions);
  },
};

export const employmentService = {
  async getOpportunities(): Promise<EmploymentOpportunity[]> {
    return mockFetch(employmentOpportunities);
  },
};

export const complaintService = {
  async submit(data: {
    name: string;
    mobile: string;
    category: string;
    location: string;
    description: string;
  }): Promise<{ number: string; complaint: Complaint }> {
    await mockFetch(null, 500);
    const number = generateComplaintNumber();
    const complaint: Complaint = {
      id: String(complaintsStore.length + 1),
      number,
      name: data.name,
      mobile: data.mobile,
      category: { mr: data.category, en: data.category },
      location: data.location,
      description: data.description,
      status: 'registered',
      date: new Date().toISOString().split('T')[0],
      updates: [
        {
          date: new Date().toISOString().split('T')[0],
          message: { mr: 'तक्रार नोंद झाली', en: 'Complaint registered' },
          status: 'registered',
        },
      ],
    };
    complaintsStore.push(complaint);
    return { number, complaint };
  },
  async track(number: string, mobile: string): Promise<Complaint | undefined> {
    await mockFetch(null, 400);
    return complaintsStore.find((c) => c.number === number && c.mobile === mobile);
  },
};

export const searchService = {
  async search(query: string): Promise<SearchResult[]> {
    await mockFetch(null, 200);
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: SearchResult[] = [];

    schemes.forEach((s) => {
      if (s.name.mr.includes(q) || s.name.en.toLowerCase().includes(q) || s.category.includes(q)) {
        results.push({
          id: s.id,
          type: 'scheme',
          title: s.name,
          description: s.benefits,
          url: `/schemes/${s.slug}`,
        });
      }
    });

    announcements.forEach((a) => {
      if (a.title.mr.includes(q) || a.title.en.toLowerCase().includes(q)) {
        results.push({
          id: a.id,
          type: 'notice',
          title: a.title,
          description: a.description,
          url: `/announcements/${a.slug}`,
        });
      }
    });

    projects.forEach((p) => {
      if (p.name.mr.includes(q) || p.name.en.toLowerCase().includes(q)) {
        results.push({
          id: p.id,
          type: 'project',
          title: p.name,
          description: p.description,
          url: `/projects/${p.slug}`,
        });
      }
    });

    forms.forEach((f) => {
      if (f.name.mr.includes(q) || f.name.en.toLowerCase().includes(q)) {
        results.push({
          id: f.id,
          type: 'form',
          title: f.name,
          description: f.purpose,
          url: `/forms#${f.slug}`,
        });
      }
    });

    facilities.forEach((f) => {
      if (f.name.mr.includes(q) || f.name.en.toLowerCase().includes(q)) {
        results.push({
          id: f.id,
          type: 'facility',
          title: f.name,
          description: f.location,
          url: `/facilities#${f.slug}`,
        });
      }
    });

    return results.slice(0, 10);
  },
};

export const weatherService = {
  async getWeather(): Promise<WeatherData> {
    return mockFetch({
      temperature: 0,
      condition: { mr: 'माहिती उपलब्ध नाही', en: 'Data not available' },
      rainPossibility: 0,
      humidity: 0,
      isPlaceholder: true,
    });
  },
};
