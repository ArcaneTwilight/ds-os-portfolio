import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Rocket, UserRound } from 'lucide-react';
import { DEVELOPER_PROFILE, EXPERIENCE_DATA, PROJECTS_DATA, TECH_STACK_DATA } from '../../data/portfolioData';

const slides = ['Overview', 'Skills', 'Projects', 'Experience'];

export const WalkthroughApp: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const lastGestureAt = useRef(0);

  const goTo = (index: number) => setActiveSlide((index + slides.length) % slides.length);
  const handleVerticalGesture = (deltaY: number) => {
    if (Math.abs(deltaY) < 42 || Date.now() - lastGestureAt.current < 650) return;
    lastGestureAt.current = Date.now();
    goTo(activeSlide + (deltaY > 0 ? 1 : -1));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') goTo(activeSlide + 1);
    if (event.key === 'ArrowLeft') goTo(activeSlide - 1);
  };

  const featuredProjects = PROJECTS_DATA.slice(0, 3);
  const featuredExperience = EXPERIENCE_DATA;
  const featuredSkills = TECH_STACK_DATA.filter((item) => item.featured).slice(0, 7);

  return (
    <main
      className="walkthrough flex-1"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onWheel={(event) => {
        if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
        handleVerticalGesture(event.deltaY);
      }}
      onTouchStart={(event) => {
        touchStartY.current = event.touches[0]?.clientY ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartY.current === null) return;
        const deltaY = touchStartY.current - (event.changedTouches[0]?.clientY ?? touchStartY.current);
        touchStartY.current = null;
        handleVerticalGesture(deltaY);
      }}
      aria-label="Quick portfolio walkthrough"
    >
      <div className="walkthrough-orbit" aria-hidden="true" />
      <section key={activeSlide} className="walkthrough-slide">
        <div className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-sky-200/70">
          <span>01 / Recruiter preview</span><span className="h-px w-8 bg-white/20" /><span>{slides[activeSlide]}</span>
        </div>
        {activeSlide === 0 && (
          <div className="max-w-2xl">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-sky-200/20 bg-sky-300/10 text-sky-100"><UserRound className="h-6 w-6" /></div>
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">Hi, I'm Deevann —<br /><span className="text-sky-200">React Native Developer</span></h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">{DEVELOPER_PROFILE.tagline}</p>
          </div>
        )}
        {activeSlide === 1 && (
          <div>
            <h2 className="text-2xl font-semibold text-white">Tools I work with</h2>
            <p className="mt-2 text-sm text-slate-300">A practical blend of application delivery, engineering, and product operations.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredSkills.map((skill, index) => <span key={skill.id} className="walkthrough-skill" style={{ animationDelay: `${index * 70}ms` }}>{skill.name}</span>)}
            </div>
          </div>
        )}
        {activeSlide === 2 && (
          <div>
            <h2 className="text-2xl font-semibold text-white">Selected impact</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <article key={project.id} className="walkthrough-card" style={{ animationDelay: `${index * 80}ms` }}>
                  <Rocket className="h-4 w-4 text-sky-200" />
                  <h3 className="mt-3 text-sm font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{project.tagline}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        {activeSlide === 3 && (
          <div>
            <h2 className="text-2xl font-semibold text-white">Career, at a glance</h2>
            <div className="mt-5 space-y-3">
              {featuredExperience.map((role, index) => (
                <article key={role.id} className="walkthrough-career" style={{ animationDelay: `${index * 80}ms` }}>
                  <span className="career-dot" />
                  <div><h3 className="text-sm font-semibold text-white">{role.role}</h3><p className="mt-1 text-xs text-slate-300">{role.company} <span className="text-slate-500">· {role.period}</span></p></div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
      <footer className="walkthrough-footer">
        <button type="button" onClick={() => goTo(activeSlide - 1)} className="walkthrough-control" aria-label="Previous slide"><ArrowLeft className="h-4 w-4" /></button>
        <div className="flex items-center gap-2" role="group" aria-label="Walkthrough slides">
          {slides.map((slide, index) => <button key={slide} type="button" onClick={() => goTo(index)} className={`walkthrough-dot ${activeSlide === index ? 'walkthrough-dot-active' : ''}`} aria-label={`Go to ${slide}`} aria-current={activeSlide === index ? 'step' : undefined} />)}
        </div>
        <button type="button" onClick={() => goTo(activeSlide + 1)} className="walkthrough-control" aria-label="Next slide"><ArrowRight className="h-4 w-4" /></button>
        <span className="ml-auto text-[10px] text-slate-400">{activeSlide + 1} / {slides.length}</span>
      </footer>
    </main>
  );
};
