
import React, { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { Users, Search, Plus, MoreVertical, Edit, Trash2, Eye, Award } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Link } from 'react-router-dom';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const students = [
    { 
      id: '1', 
      name: 'Emma Thompson', 
      studentId: 'ST001', 
      email: 'emma.thompson@email.com',
      department: 'Computer Science',
      credentialsCount: 3,
      status: 'Active',
      enrollmentDate: '2021-09-15',
      graduationDate: '2025-05-20'
    },
    { 
      id: '2', 
      name: 'Michael Johnson', 
      studentId: 'ST002', 
      email: 'michael.johnson@email.com',
      department: 'Business Administration',
      credentialsCount: 2,
      status: 'Active',
      enrollmentDate: '2020-09-10',
      graduationDate: '2024-12-15'
    },
    { 
      id: '3', 
      name: 'Sophia Williams', 
      studentId: 'ST003', 
      email: 'sophia.williams@email.com',
      department: 'Psychology',
      credentialsCount: 1,
      status: 'Graduated',
      enrollmentDate: '2019-09-12',
      graduationDate: '2023-05-18'
    },
    { 
      id: '4', 
      name: 'James Wilson', 
      studentId: 'ST004', 
      email: 'james.wilson@email.com',
      department: 'Data Science',
      credentialsCount: 0,
      status: 'Active',
      enrollmentDate: '2022-01-20',
      graduationDate: '2026-01-15'
    },
    { 
      id: '5', 
      name: 'Olivia Davis', 
      studentId: 'ST005', 
      email: 'olivia.davis@email.com',
      department: 'Engineering',
      credentialsCount: 1,
      status: 'Active',
      enrollmentDate: '2021-09-01',
      graduationDate: '2025-08-30'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents(
      selectedStudents.length === filteredStudents.length 
        ? [] 
        : filteredStudents.map(s => s.id)
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Students</h1>
            <p className="text-gray-600">Manage your institution's students and their credentials</p>
          </div>
          <Link to="/dashboard/institution/students/add">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Add Student
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="text-primary mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="text-secondary mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold">{students.filter(s => s.status === 'Active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="text-accent mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Graduated</p>
                  <p className="text-2xl font-bold">{students.filter(s => s.status === 'Graduated').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="text-warning mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Total Credentials</p>
                  <p className="text-2xl font-bold">{students.reduce((sum, s) => sum + s.credentialsCount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Student Directory</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Credentials</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{student.studentId}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {student.credentialsCount} credentials
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{student.enrollmentDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No students found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first student'}
              </p>
              <Link to="/dashboard/institution/students/add">
                <Button>
                  <Plus size={16} className="mr-2" />
                  Add Student
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Students;
