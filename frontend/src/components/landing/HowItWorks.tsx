
import React from 'react';
import { motion } from 'framer-motion';
import { Building, GraduationCap, CheckCircle, Share2 } from 'lucide-react';

const steps = [
  {
    title: 'Institution Registers',
    description: 'Authorized academic institutions register on the platform to issue credentials.',
    icon: <Building size={32} />,
    color: 'bg-primary',
  },
  {
    title: 'Student Enrollment',
    description: 'Students create accounts to receive and manage their academic credentials.',
    icon: <GraduationCap size={32} />,
    color: 'bg-secondary',
  },
  {
    title: 'Credential Issuance',
    description: 'Institutions issue digital credentials that are cryptographically signed and stored on the blockchain.',
    icon: <CheckCircle size={32} />,
    color: 'bg-accent',
  },
  {
    title: 'Shared & Verified',
    description: 'Students share their credentials with employers or other institutions who can instantly verify them.',
    icon: <Share2 size={32} />,
    color: 'bg-success',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium"
          >
            PROCESS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            How It Works
          </motion.h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gray-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="flex flex-col items-center">
                  <div className={`${step.color} text-white rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
