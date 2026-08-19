import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { SchemesPage, SchemeDetailPage } from '@/pages/SchemesPage';
import { ProjectsPage, ProjectDetailPage } from '@/pages/ProjectsPage';
import { AnnouncementsPage, AnnouncementDetailPage, FacilitiesPage } from '@/pages/AnnouncementsPage';
import { ComplaintsPage, ComplaintTrackPage } from '@/pages/ComplaintsPage';
import {
  FormsPage, ContactPage, EducationPage, EmploymentPage,
  FarmersPage, WomenPage, SeniorCitizensPage, CulturePage,
  EnvironmentPage, BudgetPage, NewsPage, NewsDetailPage,
  EventsPage, GalleryPage, StaticPage,
} from '@/pages/ServicesPages';
import { useLanguage } from '@/context/LanguageContext';

export function AppRoutes() {
  const { language } = useLanguage();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="schemes" element={<SchemesPage />} />
        <Route path="schemes/:id" element={<SchemeDetailPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="facilities" element={<FacilitiesPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="announcements/:id" element={<AnnouncementDetailPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="complaints/track" element={<ComplaintTrackPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="education" element={<EducationPage />} />
        <Route path="employment" element={<EmploymentPage />} />
        <Route path="farmers" element={<FarmersPage />} />
        <Route path="women" element={<WomenPage />} />
        <Route path="senior-citizens" element={<SeniorCitizensPage />} />
        <Route path="culture" element={<CulturePage />} />
        <Route path="environment" element={<EnvironmentPage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:id" element={<NewsDetailPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={
          <StaticPage title={language === 'mr' ? 'गोपनीयता धोरण' : 'Privacy Policy'}>
            <p>{language === 'mr' ? 'ही वेबसाइट नागरिक सेवांसाठी विकसित करण्यात आली आहे. वैयक्तिक माहिती सुरक्षित ठेवली जाते.' : 'This website is developed for citizen services. Personal information is kept secure.'}</p>
          </StaticPage>
        } />
        <Route path="terms" element={
          <StaticPage title={language === 'mr' ? 'अटी व शर्ती' : 'Terms & Conditions'}>
            <p>{language === 'mr' ? 'वेबसाइटवरील माहिती केवळ माहितीच्या उद्देशाने आहे.' : 'Information on this website is for informational purposes only.'}</p>
          </StaticPage>
        } />
        <Route path="accessibility" element={
          <StaticPage title={language === 'mr' ? 'सुलभता' : 'Accessibility'}>
            <p>{language === 'mr' ? 'ही वेबसाइट WCAG 2.2 AA मार्गदर्शक तत्त्वांनुसार विकसित करण्यात आली आहे.' : 'This website is developed following WCAG 2.2 AA guidelines.'}</p>
          </StaticPage>
        } />
        <Route path="*" element={
          <StaticPage title={language === 'mr' ? 'पृष्ठ सापडले नाही' : 'Page Not Found'}>
            <p>{language === 'mr' ? 'हे पृष्ठ अस्तित्वात नाही.' : 'This page does not exist.'}</p>
          </StaticPage>
        } />
      </Route>
    </Routes>
  );
}
