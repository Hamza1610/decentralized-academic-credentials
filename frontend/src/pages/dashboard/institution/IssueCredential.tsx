
import React, { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { Award, Search, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';

const IssueCredential = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [credentialData, setCredentialData] = useState({
    degreeTitle: '',
    graduationDate: '',
    gpa: '',
    honors: '',
    additionalNotes: ''
  });

  const students = [
    { id: '1', name: 'John Doe', studentId: 'ST001', email: 'john.doe@email.com' },
    { id: '2', name: 'Jane Smith', studentId: 'ST002', email: 'jane.smith@email.com' },
    { id: '3', name: 'Mike Johnson', studentId: 'ST003', email: 'mike.johnson@email.com' }
  ];

  const templates = [
    { id: '1', name: 'Bachelor of Science', type: 'Undergraduate' },
    { id: '2', name: 'Master of Business Administration', type: 'Graduate' },
    { id: '3', name: 'Certificate in Data Science', type: 'Certificate' }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueCredential = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Issuing credential:', { selectedStudent, selectedTemplate, credentialData });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Issue Credential</h1>
        <p className="text-gray-600">Create and issue academic credentials to students</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Student</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedStudent === student.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-600">ID: {student.studentId}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Select Template</span>
                <Button variant="outline" size="sm">
                  <Plus size={16} className="mr-2" />
                  New Template
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-gray-600">{template.type}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Credential Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleIssueCredential} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree Title *
                  </label>
                  <input
                    type="text"
                    value={credentialData.degreeTitle}
                    onChange={(e) => setCredentialData({...credentialData, degreeTitle: e.target.value})}
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Date *
                  </label>
                  <input
                    type="date"
                    value={credentialData.graduationDate}
                    onChange={(e) => setCredentialData({...credentialData, graduationDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA
                    </label>
                    <input
                      type="text"
                      value={credentialData.gpa}
                      onChange={(e) => setCredentialData({...credentialData, gpa: e.target.value})}
                      placeholder="3.75"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Honors
                    </label>
                    <select
                      value={credentialData.honors}
                      onChange={(e) => setCredentialData({...credentialData, honors: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    >
                      <option value="">None</option>
                      <option value="cum_laude">Cum Laude</option>
                      <option value="magna_cum_laude">Magna Cum Laude</option>
                      <option value="summa_cum_laude">Summa Cum Laude</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={credentialData.additionalNotes}
                    onChange={(e) => setCredentialData({...credentialData, additionalNotes: e.target.value})}
                    placeholder="Any additional information or achievements"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline" type="button">
                    Save as Draft
                  </Button>
                  <Button type="submit" disabled={!selectedStudent || !selectedTemplate}>
                    <Award size={16} className="mr-2" />
                    Issue Credential
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IssueCredential;
