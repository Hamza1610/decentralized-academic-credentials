
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Link } from 'react-router-dom';
import { Award, PlusCircle, Users, FileText, BarChart2, BarChart3, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const InstitutionDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    {
      title: 'Total Credentials',
      value: '243',
      icon: <Award className="text-primary" size={20} />,
      change: '+12%',
      isPositive: true,
    },
    {
      title: 'Students',
      value: '182',
      icon: <Users className="text-secondary" size={20} />,
      change: '+5%',
      isPositive: true,
    },
    {
      title: 'Templates',
      value: '8',
      icon: <FileText className="text-accent" size={20} />,
      change: '0%',
      isPositive: true,
    },
    {
      title: 'Pending Requests',
      value: '12',
      icon: <Clock className="text-warning" size={20} />,
      change: '-2%',
      isPositive: false,
    },
  ];
  
  const recentCredentials = [
    {
      id: 1,
      student: 'Emma Thompson',
      degree: 'Bachelor of Science in Computer Science',
      date: 'May 15, 2025',
    },
    {
      id: 2,
      student: 'Michael Johnson',
      degree: 'Master of Business Administration',
      date: 'May 14, 2025',
    },
    {
      id: 3,
      student: 'Sophia Williams',
      degree: 'Bachelor of Arts in Psychology',
      date: 'May 12, 2025',
    },
  ];
  
  const pendingRequests = [
    {
      id: 1,
      student: 'James Wilson',
      credential: 'Master of Science in Data Science',
      requestedAt: 'May 10, 2025',
    },
    {
      id: 2,
      student: 'Olivia Davis',
      credential: 'Bachelor of Engineering',
      requestedAt: 'May 8, 2025',
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Institution Dashboard</h1>
        <p className="text-gray-600">Manage credentials, students, and templates</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                {stat.icon}
              </div>
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.isPositive ? (
                  <ArrowUpRight size={12} className="mr-1" />
                ) : (
                  <ArrowDownRight size={12} className="mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{stat.title}</p>
            <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Credential Analytics</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Monthly</button>
              <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-md">Weekly</button>
              <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-md">Daily</button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Credential issuance analytics will appear here</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="p-6">
            <Link
              to="/dashboard/institution/issue"
              className="flex items-center justify-between p-4 mb-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <Award className="text-primary" size={20} />
                </div>
                <span className="font-medium">Issue Credential</span>
              </div>
              <span className="text-primary">→</span>
            </Link>
            
            <Link
              to="/dashboard/institution/students/add"
              className="flex items-center justify-between p-4 mb-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="bg-secondary/20 p-2 rounded-full mr-3">
                  <Users className="text-secondary" size={20} />
                </div>
                <span className="font-medium">Add Student</span>
              </div>
              <span className="text-secondary">→</span>
            </Link>
            
            <Link
              to="/dashboard/institution/templates/create"
              className="flex items-center justify-between p-4 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="bg-accent/20 p-2 rounded-full mr-3">
                  <FileText className="text-accent" size={20} />
                </div>
                <span className="font-medium">Create Template</span>
              </div>
              <span className="text-accent">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Credentials</h2>
            <Link to="/dashboard/institution/credentials" className="text-sm text-primary font-medium">
              View All
            </Link>
          </div>
          <div className="p-6">
            <div className="divide-y divide-gray-100">
              {recentCredentials.map((credential) => (
                <div key={credential.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Award className="text-primary" size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{credential.student}</p>
                      <p className="text-sm text-gray-600">{credential.degree}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{credential.date}</div>
                </div>
              ))}
            </div>
            
            {recentCredentials.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Recent Credentials</h3>
                <p className="text-gray-500 mb-4">
                  You haven't issued any credentials yet
                </p>
                <Link
                  to="/dashboard/institution/issue"
                  className="btn-primary inline-flex items-center"
                >
                  <PlusCircle className="mr-2" size={16} />
                  Issue Credential
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Pending Requests</h2>
            <Link to="/dashboard/institution/requests" className="text-sm text-primary font-medium">
              View All
            </Link>
          </div>
          <div className="p-6">
            <div className="divide-y divide-gray-100">
              {pendingRequests.map((request) => (
                <div key={request.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-warning/10 p-2 rounded-full mr-3">
                      <Clock className="text-warning" size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{request.student}</p>
                      <p className="text-sm text-gray-600">{request.credential}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-4">{request.requestedAt}</span>
                    <button className="text-sm bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 transition-colors duration-200">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {pendingRequests.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Pending Requests</h3>
                <p className="text-gray-500">
                  You have no pending credential requests
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstitutionDashboard;
