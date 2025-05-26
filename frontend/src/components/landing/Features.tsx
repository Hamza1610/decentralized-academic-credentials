
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Globe, Lock, UserCheck, Award } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="card hover:border hover:border-primary/10"
    >
      <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Tamper-Proof",
      description: "Credentials are securely stored on the blockchain, making them impossible to forge or alter."
    },
    {
      icon: <Clock size={24} />,
      title: "Instant Verification",
      description: "Verify academic credentials in seconds, anywhere in the world."
    },
    {
      icon: <Globe size={24} />,
      title: "Global Access",
      description: "Access your credentials anytime, anywhere, with no geographical limitations."
    },
    {
      icon: <Lock size={24} />,
      title: "Privacy Control",
      description: "Students maintain full control over who can access their credentials."
    },
    {
      icon: <UserCheck size={24} />,
      title: "Institutional Trust",
      description: "Only authorized institutions can issue verifiable credentials on the platform."
    },
    {
      icon: <Award size={24} />,
      title: "Standards Compliant",
      description: "Built on open standards for maximum interoperability with existing systems."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium"
          >
            KEY FEATURES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            The Future of Academic Credentials
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
