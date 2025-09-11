import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Heart, Save, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const MoodCheckin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stressLevel, setStressLevel] = useState([5]);
  const [journalEntry, setJournalEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStressLabel = (level: number) => {
    if (level <= 2) return { text: 'Very Calm', color: 'text-success' };
    if (level <= 4) return { text: 'Calm', color: 'text-primary' };
    if (level <= 6) return { text: 'Moderate', color: 'text-warning' };
    if (level <= 8) return { text: 'Stressed', color: 'text-destructive' };
    return { text: 'Very Stressed', color: 'text-destructive' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Check-in Complete",
      description: "Your mood and stress levels have been recorded. Thank you for taking care of yourself.",
    });

    setIsSubmitting(false);
    navigate('/');
  };

  const stressInfo = getStressLabel(stressLevel[0]);

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="animate-breathe mb-4">
            <Brain className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Daily Mood Check-in
          </h1>
          <p className="text-muted-foreground">
            Take a moment to reflect on how you're feeling today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Check-in Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-comfort">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>How are you feeling?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Stress Level Slider */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Current Stress Level
                    </Label>
                    <div className="px-4">
                      <Slider
                        value={stressLevel}
                        onValueChange={setStressLevel}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Very Calm (1)</span>
                        <span>Moderate (5)</span>
                        <span>Very Stressed (10)</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold">{stressLevel[0]}/10</span>
                      <span className={`ml-2 font-medium ${stressInfo.color}`}>
                        {stressInfo.text}
                      </span>
                    </div>
                  </div>

                  {/* Journal Entry */}
                  <div className="space-y-2">
                    <Label htmlFor="journal" className="text-base font-medium">
                      Journal Entry (Optional)
                    </Label>
                    <Textarea
                      id="journal"
                      placeholder="What's on your mind today? Share your thoughts, feelings, or experiences..."
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      className="min-h-32 resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                      This is a safe space for your thoughts. Your entries are private and secure.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full transition-gentle shadow-gentle hover:shadow-comfort"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Complete Check-in
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Tips and Progress */}
          <div className="space-y-6">
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <p className="text-sm text-muted-foreground">Day streak</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">23</div>
                    <p className="text-sm text-muted-foreground">Total check-ins</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle>Wellness Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-primary-soft rounded-lg">
                    <p className="text-sm">
                      🌱 <strong>Mindful Breathing:</strong> Take 3 deep breaths before starting your day.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-secondary-soft rounded-lg">
                    <p className="text-sm">
                      💤 <strong>Sleep Hygiene:</strong> Aim for 7-9 hours of quality sleep each night.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      🤝 <strong>Connection:</strong> Reach out to a friend or family member today.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodCheckin;