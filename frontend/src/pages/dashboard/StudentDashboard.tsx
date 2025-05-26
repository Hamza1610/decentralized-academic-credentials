
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Award, BookOpen, Share2, PlusCircle, Calendar, BarChart3, History } from 'lucide-react';
import { apiService, Credential } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      if (user?.principal) {
        try {
          const result = await apiService.getCredentialsForStudent(user.principal);
          setCredentials(result);
        } catch (error) {
          console.error('Failed to fetch credentials:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCredentials();
  }, [user]);

  const formatDate = (timestamp: bigint) => {
    return format(new Date(Number(timestamp)), 'MMM d, yyyy');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back, {user?.name || 'Student'}</h1>
        <p className="text-gray-600">Manage your academic credentials and requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Award className="text-primary" size={24} />
            </div>
            <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
              {credentials.length} Total
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">My Credentials</h3>
          <p className="text-gray-600 text-sm">View and share your academic achievements</p>
          <Link
            to="/dashboard/student/credentials"
            className="mt-4 inline-flex items-center text-primary font-medium text-sm"
          >
            View All <span className="ml-1">→</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-secondary/20 p-3 rounded-full">
              <PlusCircle className="text-secondary" size={24} />
            </div>
            <span className="bg-secondary/20 text-secondary text-xs font-medium px-2 py-1 rounded-full">
              Quick Action
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Request Credential</h3>
          <p className="text-gray-600 text-sm">Submit a request for a new academic credential</p>
          <Link
            to="/dashboard/student/request"
            className="mt-4 inline-flex items-center text-secondary font-medium text-sm"
          >
            Start Request <span className="ml-1">→</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Share2 className="text-accent" size={24} />
            </div>
            <span className="bg-accent/20 text-accent text-xs font-medium px-2 py-1 rounded-full">
              Quick Access
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Share Credentials</h3>
          <p className="text-gray-600 text-sm">Generate secure links for your credentials</p>
          <Link
            to="/dashboard/student/share"
            className="mt-4 inline-flex items-center text-accent font-medium text-sm"
          >
            Share Now <span className="ml-1">→</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Credentials</h2>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="animate-pulse">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : credentials.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Credentials Yet</h3>
              <p className="text-gray-500 mb-4">
                You haven't received any academic credentials yet.
              </p>
              <Link
                to="/dashboard/student/request"
                className="btn-primary inline-flex items-center"
              >
                <PlusCircle className="mr-2" size={16} />
                Request Credential
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {credentials.map((credential) => (
                <div
                  key={String(credential.id)}
                  className="py-4 flex items-start hover:bg-gray-50 transition-colors duration-150 px-4 -mx-4 rounded-md"
                >
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Award className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{credential.degree}</h4>
                        <p className="text-sm text-gray-600">
                          Issued by: {credential.institution.substring(0, 12)}...
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(credential.issueDate)}
                      </span>
                    </div>
                    <div className="mt-2 flex">
                      <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mr-2">
                        View
                      </button>
                      <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Credential Activity</h2>
          </div>
          <div className="p-6">
            <div className="h-60 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Credential activity visualization will appear here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <History size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Credential viewed</span> by you
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Share2 size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Credential shared</span> with TechCorp Inc.
                  </p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Award size={16} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">New credential</span> received from University
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                to="/dashboard/student/activity"
                className="text-sm text-primary font-medium flex items-center"
              >
                View All Activity <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
