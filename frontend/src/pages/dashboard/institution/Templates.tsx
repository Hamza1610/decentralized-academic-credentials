
import React, { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FileText, Search, Plus, MoreVertical, Edit, Trash2, Copy, Eye } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: '1',
      name: 'Bachelor of Science in Computer Science',
      category: 'Undergraduate',
      description: 'Standard template for BS Computer Science degree',
      fieldsCount: 8,
      lastModified: '2025-05-20',
      createdBy: 'Dr. Smith',
      isActive: true,
      usageCount: 45
    },
    {
      id: '2',
      name: 'Master of Business Administration',
      category: 'Graduate',
      description: 'Template for MBA degree with concentration options',
      fieldsCount: 10,
      lastModified: '2025-05-18',
      createdBy: 'Prof. Johnson',
      isActive: true,
      usageCount: 32
    },
    {
      id: '3',
      name: 'Certificate in Data Science',
      category: 'Certificate',
      description: 'Professional certificate template for data science program',
      fieldsCount: 6,
      lastModified: '2025-05-15',
      createdBy: 'Dr. Williams',
      isActive: true,
      usageCount: 28
    },
    {
      id: '4',
      name: 'Bachelor of Arts in Psychology',
      category: 'Undergraduate',
      description: 'Template for BA Psychology degree',
      fieldsCount: 7,
      lastModified: '2025-05-10',
      createdBy: 'Dr. Brown',
      isActive: false,
      usageCount: 15
    },
    {
      id: '5',
      name: 'Certificate in Project Management',
      category: 'Certificate',
      description: 'Professional certificate for project management',
      fieldsCount: 5,
      lastModified: '2025-05-08',
      createdBy: 'Prof. Davis',
      isActive: true,
      usageCount: 22
    }
  ];

  const categories = ['all', 'Undergraduate', 'Graduate', 'Certificate'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDuplicateTemplate = (templateId: string) => {
    console.log('Duplicating template:', templateId);
  };

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Deleting template:', templateId);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Credential Templates</h1>
            <p className="text-gray-600">Create and manage templates for issuing credentials</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus size={16} className="mr-2" />
            Create Template
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="text-primary mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Total Templates</p>
                  <p className="text-2xl font-bold">{templates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="text-secondary mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Active Templates</p>
                  <p className="text-2xl font-bold">{templates.filter(t => t.isActive).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="text-accent mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Most Used</p>
                  <p className="text-2xl font-bold">{Math.max(...templates.map(t => t.usageCount))}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="text-warning mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Total Usage</p>
                  <p className="text-2xl font-bold">{templates.reduce((sum, t) => sum + t.usageCount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Template Library</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <FileText className="text-primary" size={20} />
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{template.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Fields:</span>
                      <span className="font-medium">{template.fieldsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Usage:</span>
                      <span className="font-medium">{template.usageCount} times</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Modified:</span>
                      <span className="font-medium">{template.lastModified}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Created by:</span>
                      <span className="font-medium">{template.createdBy}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDuplicateTemplate(template.id)}
                    >
                      <Copy size={14} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No templates found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search criteria or filters' 
                  : 'Get started by creating your first credential template'
                }
              </p>
              <Button>
                <Plus size={16} className="mr-2" />
                Create Template
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Templates;
