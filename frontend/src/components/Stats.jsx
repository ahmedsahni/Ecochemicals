import React, { useEffect, useState, useRef } from 'react';
import { Users, Shield, Award, Sparkles } from 'lucide-react';

const StatItem = ({ count, target, suffix, title, icon: Icon, delay }) => {
  const [currentVal, setCurrentVal] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = parseInt(target, 10);
          if (isNaN(end)) {
            setCurrentVal(target);
            return;
          }
          const duration = 1500; // 1.5s
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            setCurrentVal(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrentVal(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, hasAnimated]);

  return (
    <div 
      ref={elementRef}
      className="flex flex-col items-center justify-center p-6 text-center rounded-2xl glass-card transition-all duration-300 hover:scale-105"
    >
      <div className="p-3.5 bg-primary/10 dark:bg-darkBorder rounded-full mb-3 text-primary dark:text-[#E2E8F0] shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-textDark dark:text-darkText select-none flex items-center justify-center">
        <span>{hasAnimated ? currentVal : 0}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-sm font-semibold text-textDark/70 dark:text-darkText/60 mt-1 uppercase tracking-wider">
        {title}
      </p>
    </div>
  );
};

const Stats = () => {
  const statsList = [
    { target: '500', suffix: '+', title: 'Farms Served', icon: Users },
    { target: '10', suffix: '+', title: 'Years Experience', icon: Award },
    { target: '25', suffix: 'L', title: 'Per Pack Size', icon: Shield },
    { target: '100', suffix: '%', title: 'Satisfaction', icon: Sparkles },
  ];

  return (
    <section className="relative z-20 py-8 bg-[#F0F7FF] dark:bg-darkBg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, index) => (
            <StatItem
              key={index}
              target={stat.target}
              suffix={stat.suffix}
              title={stat.title}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
