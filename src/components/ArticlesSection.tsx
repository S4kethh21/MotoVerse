import React, { useState } from 'react';
import { ARTICLES } from '../data/articles';
import type { Article } from '../types';
import { ArticleModal } from './ArticleModal';
import { ArrowUpRight } from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="news" className="py-24 bg-[#08090d] border-b border-[#1b1e27] relative">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching View 1 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#222631]">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-red-500 mb-1">
              STORIES &amp; REVIEWS
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              LATEST FROM MOTOVERSE
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs font-mono text-neutral-400">
            Insights, engineering breakdowns, and rider guides
          </p>
        </div>

        {/* 4 Editorial Cards Grid matching View 1 of master reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTICLES.slice(0, 4).map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-[#111318] rounded-2xl border border-[#222631] hover:border-red-500/50 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
            >
              {/* Image Container with Category Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-[#0a0c10]">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#08090d]/80 backdrop-blur-md text-white border border-white/10">
                    {art.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 mb-2">
                    <span>{art.date}</span> • <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-2 line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-[#222631] flex items-center justify-between text-xs font-bold text-neutral-300 group-hover:text-white uppercase tracking-wider">
                  <span>Read Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
};
