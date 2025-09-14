// components/sections/Education.tsx
'use client';

export function Education() {
  const experiences = [
    {
      id: '1',
      title: 'Senior Embedded Engineer',
      company: 'Tech Innovations Inc.',
      date: '2022 - Present',
      description: 'Leading development of next-generation IoT devices with focus on power optimization and wireless communication protocols. Architected firmware for products serving 100K+ users globally.'
    },
    {
      id: '2',
      title: 'Experience Designer',
      company: 'Freelance',
      date: '2020 - Present',
      description: 'Creating immersive lighting and interactive installations for events, festivals, and permanent installations across the SF Bay Area. Specializing in real-time audio-reactive systems.'
    },
    {
      id: '3',
      title: 'Firmware Engineer',
      company: 'Connected Devices Corp.',
      date: '2019 - 2022',
      description: 'Developed embedded software for consumer electronics, focusing on sensor integration and real-time data processing. Reduced power consumption by 40% through optimization.'
    }
  ];

  return (
    <section id="education" className="section-padding bg-white">
      <div className="container-minimal">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="section-title">EXPERIENCE</h2>
        </div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="pb-10 border-b border-gray-200 last:border-b-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-lg opacity-70">{exp.company}</p>
                </div>
                <p className="text-sm uppercase tracking-wider opacity-50 mt-2 md:mt-0">{exp.date}</p>
              </div>
              <p className="text-base leading-relaxed mt-4">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}