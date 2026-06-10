import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Github, Eye, X, Filter } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'design'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleOpenDetails = (proj: Project) => {
    setSelectedProject(proj);
    // Lock background scroll to prevent layout jitter
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const handleLaunchLive = (proj: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    if (proj.liveUrl && proj.liveUrl !== '#') {
      window.open(proj.liveUrl, '_blank', 'noreferrer,noopener');
    } else {
      alert(`Deploying Preview Mode for "${proj.title}".\n(Simulated static server allocation - Sandbox operational)`);
    }
  };

  return (
    <section
      id="projects"
      className="py-24 bg-slate-50 dark:bg-[#050508] border-t border-slate-100 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">
            Portfolio Showcase
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            Recent Creations & Labs
          </p>
          <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {([
            { id: 'all', label: 'All Projects' },
            { id: 'web', label: 'Web Applications' },
            { id: 'design', label: 'UI/UX Layouts' }
          ] as const).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center space-x-2 transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/15'
                  : 'bg-white/65 dark:bg-white/5 backdrop-blur-md text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10'
              }`}
            >
              {cat.id === 'all' && <Filter className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleOpenDetails(proj)}
              className="group bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Header (Image with subtle zoom) */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <span className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-colors">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-xs font-mono font-semibold text-purple-605 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 3 && (
                    <span className="px-2.5 py-0.5 text-xs font-mono text-slate-450 dark:text-slate-500">
                      +{proj.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-sans group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-450 line-clamp-2 leading-relaxed flex-1">
                  {proj.description}
                </p>

                {/* Direct Action triggers in card footer */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleOpenDetails(proj)}
                    className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center space-x-1.5"
                  >
                    <span>Read Overview</span>
                    <Eye className="w-4 h-4" />
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleLaunchLive(proj, e)}
                      className="p-2 text-slate-650 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                    </button>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-650 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                      title="GitHub Source"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal Window for Project Details */}
        {selectedProject && (
          <div
            id="details-modal-wrapper"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-955/80 dark:bg-black/60 backdrop-blur-xl overflow-y-auto animate-fade-in"
          >
            <div
              className="relative w-full max-w-3xl bg-white dark:bg-[#050508] border border-slate-200/60 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-800 transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner screenshot */}
              <div className="relative aspect-video w-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full uppercase tracking-wider">
                    {selectedProject.category === 'web' ? 'Web Application' : 'Design Artifact'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-white mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Core Contents */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-350 leading-relaxed font-sans">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3.5">
                    Tech Stack Composition
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-semibold text-slate-700 dark:text-slate-250 bg-slate-100 dark:bg-white/5 border dark:border-white/5 rounded-xl"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-6 border-t border-slate-150 dark:border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-end">
                  <button
                    onClick={(e) => handleLaunchLive(selectedProject, e)}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-650 to-blue-605 hover:from-purple-700 hover:to-blue-700 rounded-xl transition-colors"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-sm font-semibold text-slate-750 dark:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-350 dark:border-white/10 rounded-xl transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
