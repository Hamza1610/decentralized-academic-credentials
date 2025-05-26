
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { Award, Download, Share2, Eye, Search, Filter } from 'lucide-react';
import { apiService, Credential } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';

const StudentCredentials = () => {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const filteredCredentials = credentials.filter(credential =>
    credential.degree.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Credentials</h1>
        <p className="text-gray-600">View and manage your academic credentials</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
              <Button variant="outline">
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCredentials.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Award className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Credentials Found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'No credentials match your search.' : 'You haven\'t received any credentials yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCredentials.map((credential) => (
                <div
                  key={String(credential.id)}
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary/30 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Award className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{credential.degree}</h3>
                        <p className="text-gray-600 text-sm">
                          Institution: {credential.institution.substring(0, 12)}...
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Issued: {formatDate(credential.issueDate)}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 size={16} className="mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCredentials;
