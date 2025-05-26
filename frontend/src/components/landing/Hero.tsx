
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-20 pb-16 md:pb-24 lg:pb-32 xl:pb-48">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Academic Credentials on the Blockchain
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-10">
            A decentralized platform for issuing, managing, and verifying academic credentials 
            with the security and transparency of blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth/register" className="btn-primary flex items-center justify-center gap-2 min-w-[180px]">
              Get Started <ChevronRight size={16} />
            </Link>
            <Link to="#how-it-works" className="btn-outline flex items-center justify-center gap-2 min-w-[180px]">
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 backdrop-blur">
            <div className="relative bg-white p-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
              <div className="flex gap-2 pb-2 border-b border-gray-100">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="animate-pulse flex flex-col gap-4">
                  <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="flex flex-wrap gap-4">
                    <div className="h-32 bg-white rounded shadow flex-1 min-w-[250px] border border-gray-100 flex items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto animate-spin-slow">
                        <div className="w-full h-full rounded-full bg-primary/30 scale-[0.85] animate-spin-slow flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-32 bg-white rounded shadow flex-1 min-w-[250px] border border-gray-100 flex items-center justify-center">
                      <div className="space-y-2 w-full px-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                        <div className="h-4 bg-primary/30 rounded w-2/3 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <div className="h-10 bg-primary rounded w-32"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
