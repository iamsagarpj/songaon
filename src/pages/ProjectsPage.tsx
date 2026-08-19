import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { PageHeader } from '@/components/ui/SectionHeader';
import { ProjectCard, ProjectCardDetailed } from '@/components/cards/ProjectCard';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/utils/helpers';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types';

export function ProjectsPage() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getAll().then((data) => { setProjects(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'गावातील विकासकामे' : 'Village Projects'} path="/projects" />
      <PageHeader title={t('sections.projects')} />
      <div className="page-container section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </>
  );
}

export function ProjectDetailPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) projectService.getBySlug(id).then((p) => { setProject(p || null); setLoading(false); });
  }, [id]);

  if (loading) return <LoadingState />;
  if (!project) return <EmptyState />;

  return (
    <>
      <SEO title={getLocalized(project.name, language)} path={`/projects/${id}`} />
      <PageHeader title={getLocalized(project.name, language)} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <ProjectCardDetailed project={project} />
        <Link to="/projects" className="inline-block mt-6 text-primary-600 font-semibold">← {language === 'mr' ? 'सर्व प्रकल्प' : 'All Projects'}</Link>
      </div>
    </>
  );
}
