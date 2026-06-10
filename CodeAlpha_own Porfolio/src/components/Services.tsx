import React from 'react';
import { SERVICES } from '../data';
import * as Icons from 'lucide-react';

export default function Services() {
  const renderServiceIcon = (iconName: string) => {
    const IconCmp = (Icons as any)[iconName];
    if (IconCmp) {
      return <IconCmp className="w-6 h-6 text-blue-600 dark:text-violet-400" />;
    }
    return <Icons.Briefcase className="w-6 h-6 text-blue-600 dark:text-violet-400" />;
  };

  return (
    <section
      id="services"
      className="py-24 bg-white dark:bg-[#050508] border-t border-slate-100 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">
            Services
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            What I Bring To Your Project
          </p>
          <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-8 bg-slate-50/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-500/25 dark:hover:border-purple-500/20 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Backlight subtle blur */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="flex flex-col sm:flex-row items-start gap-4 h-full justify-between">
                <div className="flex-1">
                  {/* Top Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-white dark:bg-white/5 border dark:border-white/5 rounded-xl shadow-sm group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all">
                      {renderServiceIcon(srv.iconName)}
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-sans group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {srv.title}
                    </h3>
                  </div>

                  {/* Description text */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-455 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="mt-6 w-full h-px bg-slate-200/60 dark:bg-white/5" />

                  {/* Bullet features */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {srv.features.map((feat, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icons.Check className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
