
import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { value: '10K+', label: 'Students Registered' },
    { value: '500+', label: 'Institutions' },
    { value: '25K+', label: 'Credentials Issued' },
    { value: '100%', label: 'Verification Success' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
