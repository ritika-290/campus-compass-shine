import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Heart, MessageCircle, Users, Shield, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for stress timeline
const sampleStressData = [
  { date: 'Mon', stress: 3, mood: 'Calm' },
  { date: 'Tue', stress: 5, mood: 'Mild Stress' },
  { date: 'Wed', stress: 7, mood: 'Stressed' },
  { date: 'Thu', stress: 4, mood: 'Better' },
  { date: 'Fri', stress: 6, mood: 'Moderate' },
  { date: 'Sat', stress: 2, mood: 'Peaceful' },
  { date: 'Sun', stress: 3, mood: 'Relaxed' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {greeting()}, Student
            </h1>
            <p className="text-lg text-muted-foreground">
              Your mental wellness journey starts here
            </p>
            <div className="mt-4 animate-breathe">
              <Heart className="w-8 h-8 text-primary mx-auto" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-gentle">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Stress Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3/10</div>
              <p className="text-xs text-muted-foreground">Calm state - Well done!</p>
            </CardContent>
          </Card>

          <Card className="shadow-gentle">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-ins This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">5</div>
              <p className="text-xs text-muted-foreground">2 days streak!</p>
            </CardContent>
          </Card>

          <Card className="shadow-gentle">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">12</div>
              <p className="text-xs text-muted-foreground">Active healing community</p>
            </CardContent>
          </Card>
        </div>

        {/* Stress Timeline Chart */}
        <Card className="mb-8 shadow-comfort">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Your Stress Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleStressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Daily Mood Check-in"
            description="Track your emotional well-being with our gentle daily assessment"
            icon={<Brain className="w-6 h-6" />}
            gradient="healing"
            action={{
              label: "Start Check-in",
              onClick: () => navigate('/mood')
            }}
          />

          <FeatureCard
            title="AI Wellness Companion"
            description="Chat with our multilingual AI trained in trauma-informed care"
            icon={<MessageCircle className="w-6 h-6" />}
            gradient="healing"
            action={{
              label: "Start Conversation",
              onClick: () => navigate('/chatbot')
            }}
          />

          <FeatureCard
            title="Healing Community"
            description="Connect anonymously with peers sharing similar experiences"
            icon={<Users className="w-6 h-6" />}
            gradient="calm"
            action={{
              label: "Join Community",
              onClick: () => navigate('/community')
            }}
          />

          <FeatureCard
            title="Privacy Ledger"
            description="Transparent record of your data consent and counselor interactions"
            icon={<Shield className="w-6 h-6" />}
            gradient="calm"
            action={{
              label: "View Ledger",
              onClick: () => navigate('/ledger')
            }}
          />

          <FeatureCard
            title="Emergency Support"
            description="Immediate access to verified crisis helplines and emergency contacts"
            icon={<AlertTriangle className="w-6 h-6" />}
            gradient="emergency"
            action={{
              label: "Get Help Now",
              onClick: () => navigate('/sos')
            }}
          />

          <div className="md:col-span-2 lg:col-span-1">
            <Card className="h-full shadow-comfort border-0 relative overflow-hidden">
              <div className="absolute inset-0 gradient-healing opacity-5" />
              <CardContent className="relative p-6 h-full flex flex-col justify-center items-center text-center">
                <Heart className="w-12 h-12 text-primary mb-4 animate-breathe" />
                <h3 className="text-lg font-semibold mb-2">You're Not Alone</h3>
                <p className="text-muted-foreground text-sm">
                  Every step you take towards healing matters. We're here to support your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;