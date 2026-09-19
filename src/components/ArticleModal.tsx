import React from 'react';
import type { Article } from '../types';
import { X, Calendar, Clock, User, ArrowLeft } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#12141a] rounded-2xl border border-[#272a34] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:px-6 bg-[#0e1017] border-b border-[#272a34] flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stories</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181b22] text-neutral-400 hover:text-white border border-[#272a34] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Hero Banner */}
          <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-[#272a34]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-md bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg">
                {article.category}
              </span>
            </div>
          </div>

          {/* Meta Line */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 border-b border-[#272a34] pb-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-red-500" />
              <span>{article.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>{article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Article Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight">
            {article.title}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-medium italic border-l-2 border-red-600 pl-4 py-1">
            {article.summary}
          </p>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
