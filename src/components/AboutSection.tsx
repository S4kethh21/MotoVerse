import React from 'react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      title: 'DISCOVER',
      desc: 'Authentic manufacturer specifications, telemetry and chassis balances curated in one place without dealership sales bias.'
    },
    {
      title: 'BENCHMARK',
      desc: 'Real manufacturer power-to-weight metrics, torque curves, and ergonomic geometry for objective decision-making.'
    },
    {
      title: 'EXPLORE',
      desc: 'From streetfighters to transcontinental adventure tourers, explore machines designed for every riding philosophy.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0c0f] relative border-t border-[#262a35]/60">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & 3 Values */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-red-500 mb-2">
                Platform Ethos
              </p>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                Built For <br />
                <span className="text-white">Riders.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed max-w-lg">
                MotoVerse is a dedicated motorcycle discovery and comparison platform engineered for riders seeking authentic technical specifications, chassis balance, and unbiased model telemetry.
              </p>
            </div>

            {/* Three Editorial Values */}
            <div className="space-y-4 pt-2">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#111318] border border-[#262a35] flex items-start gap-4"
                >
                  <span className="font-display font-bold text-xs text-red-500 tracking-wider uppercase shrink-0 pt-0.5">
                    {v.title}
                  </span>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Large Motorcycle Editorial Photo */}
          <div className="lg:col-span-6">
            <div className="relative h-80 sm:h-[480px] rounded-xl overflow-hidden border border-[#262a35] bg-[#111318]">
              <img
                src="/images/hero/hero-motorcycle.jpg"
                alt="Motorcycle Culture"
                className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">MotoVerse Archives</p>
                <p className="text-sm font-display font-bold text-white mt-0.5">Precision Engineering. Pure Passion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
