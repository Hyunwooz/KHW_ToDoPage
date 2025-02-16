'use client';
import StatCard from '@/components/stat/StatCard';
import { useStats } from '@/hooks/useStats';

export default function StatsPage() {
  const { statSections } = useStats();

  return (
    <div className='space-y-8 py-10'>
      {statSections.map((section) => (
        <div key={section.title} className='space-y-6'>
          <h2 className='text-2xl font-bold text-gray-900'>{section.title}</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
            {section.stats.map((stat) => (
              <StatCard
                key={stat.label}
                stat={{
                  label: stat.label,
                  value: stat.value.toString(),
                  description: stat.description,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
