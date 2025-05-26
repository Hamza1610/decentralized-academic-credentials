
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    role: 'Dean of Admissions, Stanford University',
    content: 'This platform has revolutionized our credential verification process. What used to take weeks now happens instantly, and we have complete confidence in the authenticity of the documents.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Computer Science Graduate',
    content: 'I love being able to share my credentials with potential employers with just a link. The verification is instant, and I have full control over who gets to see my academic achievements.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'HR Director, Tech Innovations Inc.',
    content: 'The ability to instantly verify academic credentials has streamlined our hiring process tremendously. We can now make faster decisions with greater confidence.',
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg p-6 shadow-lg"
    >
      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-3">
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            What Our Users Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
