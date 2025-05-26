
import React, { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { UserPlus, Upload, Download } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';

const AddStudent = () => {
  const [addMethod, setAddMethod] = useState('individual');
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    program: '',
    enrollmentDate: '',
    expectedGraduation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding student:', studentData);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Add Student</h1>
        <p className="text-gray-600">Add new students to your institution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Add Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setAddMethod('individual')}
                  className={`p-4 border rounded-lg text-center transition-colors duration-200 ${
                    addMethod === 'individual' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <UserPlus className="mx-auto mb-2 text-primary" size={24} />
                  <p className="font-medium">Individual Student</p>
                  <p className="text-sm text-gray-600">Add one student at a time</p>
                </button>
                <button
                  onClick={() => setAddMethod('bulk')}
                  className={`p-4 border rounded-lg text-center transition-colors duration-200 ${
                    addMethod === 'bulk' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Upload className="mx-auto mb-2 text-primary" size={24} />
                  <p className="font-medium">Bulk Import</p>
                  <p className="text-sm text-gray-600">Upload CSV file with multiple students</p>
                </button>
              </div>

              {addMethod === 'individual' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={studentData.firstName}
                        onChange={(e) => setStudentData({...studentData, firstName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={studentData.lastName}
                        onChange={(e) => setStudentData({...studentData, lastName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={studentData.email}
                        onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student ID *
                      </label>
                      <input
                        type="text"
                        value={studentData.studentId}
                        onChange={(e) => setStudentData({...studentData, studentId: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program/Degree *
                    </label>
                    <input
                      type="text"
                      value={studentData.program}
                      onChange={(e) => setStudentData({...studentData, program: e.target.value})}
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enrollment Date *
                      </label>
                      <input
                        type="date"
                        value={studentData.enrollmentDate}
                        onChange={(e) => setStudentData({...studentData, enrollmentDate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Graduation
                      </label>
                      <input
                        type="date"
                        value={studentData.expectedGraduation}
                        onChange={(e) => setStudentData({...studentData, expectedGraduation: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button type="submit">
                      <UserPlus size={16} className="mr-2" />
                      Add Student
                    </Button>
                  </div>
                </form>
              )}

              {addMethod === 'bulk' && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Upload CSV File</h3>
                    <p className="text-gray-600 mb-4">
                      Upload a CSV file containing student information
                    </p>
                    <Button>
                      <Upload size={16} className="mr-2" />
                      Choose File
                    </Button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">CSV Format Requirements</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Your CSV file should include the following columns:
                    </p>
                    <div className="text-sm text-blue-700 font-mono bg-blue-100 p-2 rounded">
                      firstName,lastName,email,studentId,program,enrollmentDate,expectedGraduation
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Download size={16} className="mr-2" />
                      Download Template
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Programs</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-medium text-green-600">+23 students</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Additions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sarah Wilson</p>
                    <p className="text-xs text-gray-600">Computer Science</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Alex Chen</p>
                    <p className="text-xs text-gray-600">Business Administration</p>
                  </div>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Maria Garcia</p>
                    <p className="text-xs text-gray-600">Engineering</p>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddStudent;
