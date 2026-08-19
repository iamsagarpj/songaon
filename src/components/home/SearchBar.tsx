import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { searchService } from '@/services/contentService';
import { getLocalized } from '@/utils/helpers';
import type { SearchResult } from '@/types';

const suggestions = ['पाणी योजना', 'जन्म दाखला', 'घरकुल योजना', 'ग्रामपंचायत वेळ', 'तक्रार', 'शाळा'];

export function SearchBar({ className = '' }: { className?: string }) {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await searchService.search(query);
      setResults(res);
      setLoading(false);
      setOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setOpen(true)}
          placeholder={t('search.placeholder')}
          className="w-full pl-12 pr-4 py-4 text-base md:text-lg border-2 border-charcoal-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none bg-white"
          aria-label={t('search.placeholder')}
          aria-expanded={open}
          aria-controls="search-results"
        />
      </div>

      {open && (
        <div id="search-results" className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-charcoal-100 z-50 max-h-80 overflow-y-auto">
          {loading && <p className="p-4 text-charcoal-500">{t('common.loading')}</p>}
          {!loading && results.length === 0 && query && (
            <div className="p-4">
              <p className="text-charcoal-600 mb-3">{t('search.noResults')}</p>
              <p className="text-sm text-charcoal-400 mb-2">{t('search.suggestions')}</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {results.map((r) => (
            <Link
              key={`${r.type}-${r.id}`}
              to={r.url}
              onClick={() => { setOpen(false); setQuery(''); }}
              className="block px-4 py-3 hover:bg-primary-50 border-b border-charcoal-50 last:border-0"
            >
              <p className="font-medium text-charcoal-800">{getLocalized(r.title, language)}</p>
              <p className="text-sm text-charcoal-500 truncate">{getLocalized(r.description, language)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
