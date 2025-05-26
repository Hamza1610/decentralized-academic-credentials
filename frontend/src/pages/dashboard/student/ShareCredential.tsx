
import React, { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { Share2, Copy, Mail, Link as LinkIcon, QrCode, Download } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';

const ShareCredential = () => {
  const [selectedCredential, setSelectedCredential] = useState('');
  const [shareMethod, setShareMethod] = useState('link');
  const [generatedLink, setGeneratedLink] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const credentials = [
    { id: '1', title: 'Bachelor of Science in Computer Science', institution: 'Tech University' },
    { id: '2', title: 'Master of Business Administration', institution: 'Business School' },
  ];

  const generateShareLink = () => {
    if (!selectedCredential) return;
    const link = `https://credchain.app/verify/${selectedCredential}?token=${Date.now()}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Share Credential</h1>
        <p className="text-gray-600">Generate secure links to share your credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Credential</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={selectedCredential}
                onChange={(e) => setSelectedCredential(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="">Choose a credential to share</option>
                {credentials.map((credential) => (
                  <option key={credential.id} value={credential.id}>
                    {credential.title} - {credential.institution}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShareMethod('link')}
                  className={`p-4 border rounded-lg text-center transition-colors duration-200 ${
                    shareMethod === 'link' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <LinkIcon className="mx-auto mb-2 text-primary" size={24} />
                  <p className="font-medium">Secure Link</p>
                </button>
                <button
                  onClick={() => setShareMethod('email')}
                  className={`p-4 border rounded-lg text-center transition-colors duration-200 ${
                    shareMethod === 'email' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Mail className="mx-auto mb-2 text-primary" size={24} />
                  <p className="font-medium">Email</p>
                </button>
                <button
                  onClick={() => setShareMethod('qr')}
                  className={`p-4 border rounded-lg text-center transition-colors duration-200 ${
                    shareMethod === 'qr' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <QrCode className="mx-auto mb-2 text-primary" size={24} />
                  <p className="font-medium">QR Code</p>
                </button>
              </div>

              <div className="mt-6">
                {shareMethod === 'link' && (
                  <div className="space-y-4">
                    <Button onClick={generateShareLink} disabled={!selectedCredential}>
                      <Share2 size={16} className="mr-2" />
                      Generate Share Link
                    </Button>
                    {generatedLink && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 break-all">{generatedLink}</span>
                          <Button variant="outline" size="sm" onClick={copyToClipboard}>
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {shareMethod === 'email' && (
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Recipient email address"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    <Button disabled={!selectedCredential || !recipientEmail}>
                      <Mail size={16} className="mr-2" />
                      Send via Email
                    </Button>
                  </div>
                )}

                {shareMethod === 'qr' && (
                  <div className="text-center space-y-4">
                    <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <QrCode size={48} className="text-gray-400" />
                    </div>
                    <Button disabled={!selectedCredential}>
                      <Download size={16} className="mr-2" />
                      Download QR Code
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Share Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Set expiration date</span>
                </label>
                <input
                  type="date"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Require recipient verification</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Send notification when viewed</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShareCredential;
