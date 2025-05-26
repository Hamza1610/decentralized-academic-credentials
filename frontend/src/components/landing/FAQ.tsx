
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is a blockchain-based credential system?',
    answer: 'A blockchain-based credential system uses distributed ledger technology to create, issue, and verify academic credentials in a way that is secure, transparent, and tamper-proof. It eliminates the need for manual verification and reduces the risk of fraud.'
  },
  {
    question: 'How secure are credentials on this platform?',
    answer: 'Credentials on our platform are extremely secure. They are cryptographically signed by the issuing institution, stored on the Internet Computer blockchain, and can be verified by anyone with the proper authorization. The decentralized nature of blockchain makes tampering virtually impossible.'
  },
  {
    question: 'Who can issue credentials on this platform?',
    answer: 'Only authorized academic institutions can issue credentials on our platform. We have a rigorous verification process to ensure that only legitimate educational institutions can register as issuers.'
  },
  {
    question: 'How do students access their credentials?',
    answer: 'Students can access their credentials through their secure dashboard after logging in with their Internet Identity. From there, they can view, manage, and share their credentials with third parties.'
  },
  {
    question: 'Can credentials be revoked or updated?',
    answer: 'Yes, issuing institutions have the ability to update or revoke credentials if necessary. However, the blockchain maintains a transparent record of all changes, ensuring accountability and trust in the process.'
  },
  {
    question: 'Is the platform compatible with existing credential systems?',
    answer: 'Yes, our platform is built on open standards to ensure maximum interoperability with existing credential systems. We support various credential formats and are continuously working on expanding compatibility.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-4 flex justify-between items-center rounded-t-lg focus:outline-none bg-white border ${
                  activeIndex === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown size={20} className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-60' : 'max-h-0'
                } bg-gray-50 border border-t-0 rounded-b-lg ${
                  activeIndex === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <div className="p-4">{faq.answer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
