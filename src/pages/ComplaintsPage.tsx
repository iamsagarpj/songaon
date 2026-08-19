import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { PageHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized, formatDate } from '@/utils/helpers';
import { complaintService } from '@/services/contentService';
import { complaintCategories } from '@/data/content';
import type { Complaint } from '@/types';

export function ComplaintsPage() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [complaintNumber, setComplaintNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', category: '', location: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await complaintService.submit(form);
    setComplaintNumber(result.number);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <SEO title={t('complaint.title')} path="/complaints" />
      <PageHeader title={t('complaint.title')} subtitle={language === 'mr' ? 'सोप्या भाषेत तक्रार नोंदवा' : 'Register complaint in simple language'} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-card-lg p-8 text-center">
            <p className="text-lg text-green-800 mb-4">{t('complaint.success')}</p>
            <p className="text-2xl font-bold text-green-900 mb-6">
              {t('complaint.number')}: {complaintNumber}
            </p>
            <Link to="/complaints/track">
              <Button>{t('complaint.track')}</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 md:p-8 rounded-card-lg border border-charcoal-100">
            <div>
              <label htmlFor="name" className="block font-semibold mb-2">{t('complaint.name')}</label>
              <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-xl text-base focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label htmlFor="mobile" className="block font-semibold mb-2">{t('complaint.mobile')}</label>
              <input id="mobile" type="tel" required pattern="[0-9]{10}" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-xl text-base focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label htmlFor="category" className="block font-semibold mb-2">{t('complaint.category')}</label>
              <select id="category" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-xl text-base focus:border-primary-500 outline-none">
                <option value="">{language === 'mr' ? 'निवडा' : 'Select'}</option>
                {complaintCategories.map((c) => (
                  <option key={c.mr} value={c.mr}>{language === 'mr' ? c.mr : c.en}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block font-semibold mb-2">{t('complaint.location')}</label>
              <input id="location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-xl text-base focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label htmlFor="description" className="block font-semibold mb-2">{t('complaint.description')}</label>
              <textarea id="description" required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-xl text-base focus:border-primary-500 outline-none resize-none" />
            </div>
            <div>
              <label htmlFor="photo" className="block font-semibold mb-2">{t('complaint.photo')}</label>
              <input id="photo" type="file" accept="image/*" className="w-full text-base" />
              <p className="text-sm text-charcoal-400 mt-1">{language === 'mr' ? 'JPEG/PNG, कमाल 2MB' : 'JPEG/PNG, max 2MB'}</p>
            </div>
            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? t('common.loading') : t('common.submit')}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/complaints/track" className="text-primary-600 font-semibold hover:underline">
            {t('complaint.track')} →
          </Link>
        </div>
      </div>
    </>
  );
}

export function ComplaintTrackPage() {
  const { t, language } = useLanguage();
  const [number, setNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await complaintService.track(number, mobile);
    setComplaint(result || null);
    setSearched(true);
    setLoading(false);
  };

  return (
    <>
      <SEO title={t('complaint.trackTitle')} path="/complaints/track" />
      <PageHeader title={t('complaint.trackTitle')} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleTrack} className="space-y-4 bg-white p-6 rounded-card-lg border mb-6">
          <div>
            <label htmlFor="number" className="block font-semibold mb-2">{t('complaint.trackPlaceholder')}</label>
            <input id="number" required value={number} onChange={(e) => setNumber(e.target.value)}
              placeholder="GP-2026-XXXXX"
              className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-xl text-base" />
          </div>
          <div>
            <label htmlFor="track-mobile" className="block font-semibold mb-2">{t('complaint.mobile')}</label>
            <input id="track-mobile" type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-xl text-base" />
          </div>
          <Button type="submit" fullWidth disabled={loading}>{t('complaint.track')}</Button>
        </form>

        {searched && !complaint && (
          <p className="text-center text-charcoal-600">{language === 'mr' ? 'तक्रार सापडली नाही. क्रमांक आणि मोबाईल तपासा.' : 'Complaint not found. Check number and mobile.'}</p>
        )}

        {complaint && (
          <div className="bg-white p-6 rounded-card-lg border space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start min-w-0">
              <div className="min-w-0">
                <p className="font-bold text-lg break-words">{complaint.number}</p>
                <time className="text-xs sm:text-sm text-charcoal-500 break-words">{formatDate(complaint.date, language)}</time>
              </div>
              <StatusBadge status={complaint.status} className="self-start shrink-0" />
            </div>
            <p><strong>{getLocalized(complaint.category, language)}</strong> — {complaint.location}</p>
            <p className="text-charcoal-600">{complaint.description}</p>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">{language === 'mr' ? 'अद्यतने' : 'Updates'}</h3>
              {complaint.updates.map((u, i) => (
                <div key={i} className="flex flex-col xs:flex-row xs:gap-3 gap-1 mb-2 min-w-0">
                  <time className="text-xs sm:text-sm text-charcoal-400 shrink-0">{formatDate(u.date, language)}</time>
                  <p className="text-sm break-words min-w-0">{getLocalized(u.message, language)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
