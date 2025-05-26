
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to transform your academic credentials?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl mb-8 text-white/90"
          >
            Join thousands of students and institutions already benefiting from blockchain-verified credentials.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/auth/register?role=student" className="bg-white text-primary hover:bg-gray-100 transition-colors duration-200 font-medium py-3 px-8 rounded-md flex items-center justify-center gap-2">
              Register as Student <ArrowRight size={16} />
            </Link>
            <Link to="/auth/register?role=institution" className="bg-transparent border border-white text-white hover:bg-white/10 transition-colors duration-200 font-medium py-3 px-8 rounded-md flex items-center justify-center gap-2">
              Register as Institution
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
