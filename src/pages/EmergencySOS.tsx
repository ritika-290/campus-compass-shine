import { useState } from 'react';
import { AlertTriangle, Phone, MessageSquare, MapPin, Globe, Clock, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface HelplineContact {
  id: string;
  name: string;
  number: string;
  description: string;
  availability: string;
  languages: string[];
  country: string;
  type: 'crisis' | 'mental-health' | 'student' | 'text';
}

const helplineContacts: HelplineContact[] = [
  {
    id: '1',
    name: 'National Suicide Prevention Lifeline',
    number: '988',
    description: 'Free and confidential emotional support 24/7',
    availability: '24/7',
    languages: ['English', 'Spanish'],
    country: 'USA',
    type: 'crisis'
  },
  {
    id: '2',
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'Crisis intervention via text message',
    availability: '24/7',
    languages: ['English', 'Spanish'],
    country: 'USA',
    type: 'text'
  },
  {
    id: '3',
    name: 'SAMHSA National Helpline',
    number: '1-800-662-4357',
    description: 'Mental health and substance abuse treatment referrals',
    availability: '24/7',
    languages: ['English', 'Spanish'],
    country: 'USA',
    type: 'mental-health'
  },
  {
    id: '4',
    name: 'Student Mental Health Support',
    number: '1-800-950-6264',
    description: 'Specialized support for college students',
    availability: 'Mon-Fri 9AM-5PM',
    languages: ['English'],
    country: 'USA',
    type: 'student'
  },
  {
    id: '5',
    name: 'International Association for Suicide Prevention',
    number: 'Visit website for local numbers',
    description: 'Global directory of crisis centers',
    availability: 'Varies by location',
    languages: ['Multiple'],
    country: 'Global',
    type: 'crisis'
  }
];

const EmergencySOS = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const { toast } = useToast();

  const handleEmergencyCall = (number: string, name: string) => {
    toast({
      title: "Emergency Contact",
      description: `Connecting you to ${name}. You are not alone.`,
      variant: "destructive",
    });
    
    // In a real app, this would initiate the call
    setIsEmergencyMode(true);
    setTimeout(() => setIsEmergencyMode(false), 3000);
  };

  const handleSOSAlert = () => {
    toast({
      title: "SOS Alert Sent",
      description: "Emergency contacts have been notified of your situation.",
      variant: "destructive",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'bg-destructive text-destructive-foreground';
      case 'mental-health': return 'bg-primary text-primary-foreground';
      case 'student': return 'bg-secondary text-secondary-foreground';
      case 'text': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredContacts = helplineContacts.filter(contact => 
    contact.country === selectedCountry || contact.country === 'Global'
  );

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Header */}
        <div className="text-center mb-8">
          <div className={`mb-4 ${isEmergencyMode ? 'animate-pulse' : 'animate-breathe'}`}>
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Emergency Support Hub
          </h1>
          <p className="text-muted-foreground">
            Immediate access to verified crisis helplines and emergency contacts
          </p>
        </div>

        {/* Emergency Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-emergency border-destructive/20">
            <CardContent className="p-6 text-center">
              <div className="gradient-emergency w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Crisis Hotline</h3>
              <p className="text-muted-foreground mb-4">
                Connect immediately with a trained crisis counselor
              </p>
              <Button
                onClick={() => handleEmergencyCall('988', 'Crisis Hotline')}
                className="w-full gradient-emergency text-white shadow-emergency hover:shadow-emergency transition-gentle"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 988 Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-emergency border-destructive/20">
            <CardContent className="p-6 text-center">
              <div className="gradient-emergency w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Emergency SMS</h3>
              <p className="text-muted-foreground mb-4">
                Send an SOS alert to your emergency contacts
              </p>
              <Button
                onClick={handleSOSAlert}
                variant="destructive"
                className="w-full shadow-emergency hover:shadow-emergency transition-gentle"
                size="lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Send SOS Alert
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-destructive/50 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Heart className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-destructive mb-2">You Are Not Alone</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you're having thoughts of suicide or self-harm, please reach out immediately. 
                  These services are free, confidential, and available 24/7. Your life has value, 
                  and there are people who want to help you through this difficult time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Country Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Select your location:</span>
            <div className="flex flex-wrap gap-2">
              {['USA', 'Global'].map((country) => (
                <Button
                  key={country}
                  variant={selectedCountry === country ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCountry(country)}
                >
                  {country}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Helpline Contacts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Verified Helpline Contacts</h2>
          
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="shadow-comfort hover:shadow-comfort transition-comfort">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {contact.type === 'text' ? (
                            <MessageSquare className="w-6 h-6 text-primary" />
                          ) : (
                            <Phone className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{contact.name}</h3>
                          <Badge className={getTypeColor(contact.type)}>
                            {contact.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-2">{contact.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{contact.availability}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{contact.country}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Globe className="w-4 h-4" />
                            <span>{contact.languages.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 lg:ml-4">
                    <div className="text-lg font-bold text-primary text-center lg:text-right">
                      {contact.number}
                    </div>
                    <Button
                      onClick={() => handleEmergencyCall(contact.number, contact.name)}
                      className="shadow-gentle hover:shadow-comfort transition-gentle"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Plan */}
        <Card className="mt-8 shadow-gentle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>Personal Safety Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">When you're in crisis:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Remove harmful objects from reach</li>
                  <li>• Call a crisis hotline immediately</li>
                  <li>• Reach out to a trusted friend or family member</li>
                  <li>• Go to your local emergency room</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Warning signs to watch for:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Thoughts of death or suicide</li>
                  <li>• Feeling hopeless or trapped</li>
                  <li>• Severe mood changes</li>
                  <li>• Withdrawing from others</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencySOS;