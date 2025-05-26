
import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Search, Check, X, Award, Building, User, Calendar, ArrowRight } from 'lucide-react';
import { apiService } from '../../services/api';

const CredentialVerify = () => {
  const [credentialId, setCredentialId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'failure' | null>(null);
  const [credential, setCredential] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentialId.trim()) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      // Mock verification for now
      const id = BigInt(parseInt(credentialId));
      const result = await apiService.getCredentialById(id);
      
      setTimeout(() => {
        setIsVerifying(false);
        
        if (result) {
          setCredential(result);
          setVerificationResult('success');
        } else {
          setCredential(null);
          setVerificationResult('failure');
        }
      }, 1500); // Simulate network delay
    } catch (error) {
      console.error('Verification error:', error);
      setIsVerifying(false);
      setVerificationResult('failure');
      setCredential(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Verify Academic Credentials</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enter a credential ID to verify its authenticity on the blockchain.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <form onSubmit={handleVerify} className="mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 py-4 pr-4 block w-full shadow-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary text-lg"
                    placeholder="Enter Credential ID..."
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    disabled={isVerifying}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 flex items-center bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors duration-200 disabled:opacity-70"
                    disabled={isVerifying || !credentialId.trim()}
                  >
                    <span className="mr-2 hidden md:inline">Verify</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Example: Enter "1" as the credential ID for a demo verification
                </p>
              </form>

              {isVerifying && (
                <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Verifying credential on the blockchain...</p>
                </div>
              )}
              
              {!isVerifying && verificationResult === 'success' && credential && (
                <div className="border border-green-100 rounded-lg bg-green-50 p-6 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Check className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-green-800">Credential Verified</h2>
                      <p className="text-green-700">This credential has been verified on the blockchain</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-green-100 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <Award className="text-primary mr-2" size={16} />
                            <h3 className="font-medium text-gray-700">Credential</h3>
                          </div>
                          <p className="text-gray-900 font-semibold">{credential.degree}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <User className="text-primary mr-2" size={16} />
                            <h3 className="font-medium text-gray-700">Student</h3>
                          </div>
                          <p className="text-gray-900">{credential.student.substring(0, 10)}...</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <Building className="text-primary mr-2" size={16} />
                            <h3 className="font-medium text-gray-700">Institution</h3>
                          </div>
                          <p className="text-gray-900">{credential.institution.substring(0, 10)}...</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <Calendar className="text-primary mr-2" size={16} />
                            <h3 className="font-medium text-gray-700">Issue Date</h3>
                          </div>
                          <p className="text-gray-900">
                            {new Date(Number(credential.issueDate)).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-green-100">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Check className="text-green-600" size={16} />
                      </div>
                      <span className="ml-2 text-green-800 font-medium">Blockchain Verified</span>
                      <div className="ml-auto flex items-center">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-200 mr-3">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
                          Download Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!isVerifying && verificationResult === 'failure' && (
                <div className="border border-red-100 rounded-lg bg-red-50 p-6">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full">
                      <X className="text-red-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-red-800">Verification Failed</h2>
                      <p className="text-red-700">We couldn't verify this credential on the blockchain</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-white p-4 rounded-md border border-red-100">
                    <p className="text-gray-700">Possible reasons for verification failure:</p>
                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                      <li>The credential ID doesn't exist</li>
                      <li>The credential has been revoked</li>
                      <li>There was an issue connecting to the blockchain</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <button 
                      onClick={() => {
                        setVerificationResult(null);
                        setCredentialId('');
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
              
              {!isVerifying && verificationResult === null && (
                <div className="text-center py-6 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Award className="text-gray-500" size={28} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Enter a Credential ID Above</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Enter a credential ID to verify its authenticity and view the details.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">How Credential Verification Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Enter Credential ID</h3>
                  <p className="text-gray-600">
                    Input the unique credential ID provided with the academic credential.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Blockchain Verification</h3>
                  <p className="text-gray-600">
                    Our system checks the blockchain to verify the credential's authenticity.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">View & Download</h3>
                  <p className="text-gray-600">
                    Once verified, view the credential details or download the certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CredentialVerify;
