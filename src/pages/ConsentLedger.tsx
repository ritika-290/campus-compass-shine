import { useState } from 'react';
import { Shield, CheckCircle, Clock, User, FileText, Eye, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface ConsentRecord {
  id: string;
  timestamp: Date;
  action: string;
  dataType: string;
  recipient: string;
  status: 'active' | 'revoked' | 'expired';
  hash: string;
  details: string;
}

const sampleConsentRecords: ConsentRecord[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T10:30:00'),
    action: 'Data Sharing Consent',
    dataType: 'Mood Check-in Data',
    recipient: 'Dr. Sarah Chen (Licensed Counselor)',
    status: 'active',
    hash: '0x7d4a8f2c1e9b6d3a5f8c2e1b9d6a3f7c4e8b1d5a9c6f3e7b4d8a2f5c9e1b6d3a',
    details: 'Consent given to share mood tracking data for therapeutic purposes'
  },
  {
    id: '2',
    timestamp: new Date('2024-01-12T14:45:00'),
    action: 'Emergency Contact Authorization',
    dataType: 'Crisis Alert Data',
    recipient: 'Campus Crisis Response Team',
    status: 'active',
    hash: '0x3f7c4e8b1d5a9c6f3e7b4d8a2f5c9e1b6d3a7d4a8f2c1e9b6d3a5f8c2e1b9d6a',
    details: 'Authorization to contact emergency contacts during crisis situations'
  },
  {
    id: '3',
    timestamp: new Date('2024-01-10T09:15:00'),
    action: 'Chat History Sharing',
    dataType: 'AI Chatbot Conversations',
    recipient: 'Dr. Maria Rodriguez (Campus Counselor)',
    status: 'revoked',
    hash: '0x9d6a3f7c4e8b1d5a9c6f3e7b4d8a2f5c9e1b6d3a7d4a8f2c1e9b6d3a5f8c2e1b',
    details: 'Consent revoked by user on 2024-01-14'
  },
  {
    id: '4',
    timestamp: new Date('2024-01-08T16:20:00'),
    action: 'Community Post Sharing',
    dataType: 'Anonymous Forum Posts',
    recipient: 'Research Team (Anonymized)',
    status: 'active',
    hash: '0x5f8c2e1b9d6a3f7c4e8b1d5a9c6f3e7b4d8a2f5c9e1b6d3a7d4a8f2c1e9b6d3a',
    details: 'Consent to use anonymized posts for mental health research'
  }
];

const ConsentLedger = () => {
  const [records, setRecords] = useState<ConsentRecord[]>(sampleConsentRecords);
  const [selectedRecord, setSelectedRecord] = useState<ConsentRecord | null>(null);
  const { toast } = useToast();

  const handleRevokeConsent = (recordId: string) => {
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId
          ? { ...record, status: 'revoked' as const }
          : record
      )
    );
    
    toast({
      title: "Consent Revoked",
      description: "Your consent has been revoked and recorded on the blockchain ledger.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'revoked': return 'bg-destructive text-destructive-foreground';
      case 'expired': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'revoked': return <Lock className="w-4 h-4" />;
      case 'expired': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="animate-breathe mb-4">
            <Shield className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Privacy Consent Ledger
          </h1>
          <p className="text-muted-foreground">
            Transparent, immutable record of your data consent and privacy choices
          </p>
        </div>

        {/* Privacy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-gentle">
            <CardContent className="pt-6">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">Total Consents</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-gentle">
            <CardContent className="pt-6">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">3</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-gentle">
            <CardContent className="pt-6">
              <Lock className="w-8 h-8 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-destructive">1</div>
              <p className="text-sm text-muted-foreground">Revoked</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-gentle">
            <CardContent className="pt-6">
              <FileText className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">100%</div>
              <p className="text-sm text-muted-foreground">Transparency</p>
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Explanation */}
        <Card className="mb-8 shadow-gentle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>How Your Privacy is Protected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Immutable Records</h3>
                <p className="text-sm text-muted-foreground">
                  All consent decisions are permanently recorded on the blockchain and cannot be altered.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Full Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  You can see exactly who has access to your data and when consent was given.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Your Control</h3>
                <p className="text-sm text-muted-foreground">
                  Revoke consent at any time, and the change is immediately recorded and enforced.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent Records Table */}
        <Card className="shadow-comfort">
          <CardHeader>
            <CardTitle>Your Consent History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">
                      {record.timestamp.toLocaleDateString()}<br />
                      <span className="text-muted-foreground">
                        {record.timestamp.toLocaleTimeString()}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-medium">{record.action}</div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="outline">{record.dataType}</Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-medium">{record.recipient}</div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(record.status)}
                          <span className="capitalize">{record.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        
                        {record.status === 'active' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRevokeConsent(record.id)}
                          >
                            Revoke
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Record Details Modal/Card */}
        {selectedRecord && (
          <Card className="mt-6 shadow-comfort border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Consent Record Details</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRecord(null)}
                >
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Record Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Action:</strong> {selectedRecord.action}</div>
                    <div><strong>Data Type:</strong> {selectedRecord.dataType}</div>
                    <div><strong>Recipient:</strong> {selectedRecord.recipient}</div>
                    <div><strong>Timestamp:</strong> {selectedRecord.timestamp.toLocaleString()}</div>
                    <div className="flex items-center space-x-2">
                      <strong>Status:</strong>
                      <Badge className={getStatusColor(selectedRecord.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedRecord.status)}
                          <span className="capitalize">{selectedRecord.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Blockchain Hash</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-xs break-all font-mono">
                      {selectedRecord.hash}
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This cryptographic hash proves the integrity of your consent record.
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Details</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.details}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Privacy Rights */}
        <Card className="mt-8 shadow-gentle">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">✅ Right to Know</h4>
                <p className="text-muted-foreground">You have complete visibility into who has access to your data and why.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚫 Right to Revoke</h4>
                <p className="text-muted-foreground">Revoke consent at any time, and access will be immediately terminated.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔒 Right to Security</h4>
                <p className="text-muted-foreground">All consent records are cryptographically secured on the blockchain.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">📋 Right to Portability</h4>
                <p className="text-muted-foreground">Export your consent history and data at any time.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsentLedger;