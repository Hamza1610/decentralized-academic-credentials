
import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { HelpCircle, Search, Book, MessageCircle, Mail, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqItems = [
    {
      category: 'getting-started',
      question: 'How do I request my first credential?',
      answer: 'To request your first credential, navigate to the "Request Credential" page from your dashboard. Fill out the form with your academic information and submit it to your institution for verification.'
    },
    {
      category: 'verification',
      question: 'How long does credential verification take?',
      answer: 'Credential verification typically takes 3-5 business days, depending on your institution\'s verification process. You\'ll receive email notifications when your credential is reviewed and approved.'
    },
    {
      category: 'sharing',
      question: 'Can I share my credentials with employers?',
      answer: 'Yes! You can generate secure, verifiable links to share your credentials with employers, educational institutions, or anyone who needs to verify your academic achievements.'
    },
    {
      category: 'security',
      question: 'How secure are my credentials on the blockchain?',
      answer: 'Your credentials are stored on the Internet Computer blockchain, which provides immutable, tamper-proof storage. Each credential is cryptographically signed and can be verified independently.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'verification', label: 'Verification' },
    { id: 'sharing', label: 'Sharing' },
    { id: 'security', label: 'Security' }
  ];

  const filteredFAQ = faqItems.filter(item =>
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-600">Find answers to common questions and get help with CredChain</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search size={20} className="mr-2" />
                Search Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search for help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">{item.question}</h3>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                ))}
                
                {filteredFAQ.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No Results Found</h3>
                    <p className="text-gray-500">
                      Try adjusting your search terms or browse our help categories.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Book size={16} className="mr-3" />
                User Guide
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText size={16} className="mr-3" />
                API Documentation
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle size={16} className="mr-3" />
                Community Forum
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail size={16} className="mr-3" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Email Support</h4>
                <p className="text-sm text-gray-600">support@credchain.app</p>
                <p className="text-xs text-gray-500">Response time: 24-48 hours</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Documentation</h4>
                <p className="text-sm text-gray-600">docs.credchain.app</p>
                <p className="text-xs text-gray-500">Comprehensive guides and tutorials</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Status Page</h4>
                <p className="text-sm text-gray-600">status.credchain.app</p>
                <p className="text-xs text-gray-500">System status and maintenance updates</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
