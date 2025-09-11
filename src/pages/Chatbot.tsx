import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Globe, Heart, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI wellness companion. I'm here to provide emotional support and guidance. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिंदी' },
  ];

  // Sample AI responses based on common student concerns
  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('stress') || message.includes('anxious') || message.includes('worried')) {
      return "I understand you're feeling stressed. That's completely normal, especially as a student. Here are some gentle techniques that might help: Try the 4-7-8 breathing technique (inhale for 4, hold for 7, exhale for 8), or consider doing a quick body scan to release tension. Would you like me to guide you through either of these?";
    }
    
    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      return "I hear that you're going through a difficult time. Your feelings are valid, and it takes courage to reach out. Remember that you're not alone in this journey. Sometimes talking to a counselor can provide additional support. Would you like me to help you connect with a professional counselor?";
    }
    
    if (message.includes('exam') || message.includes('test') || message.includes('study')) {
      return "Academic pressure can be overwhelming. Let's break this down together. What specific aspect of your studies is causing you the most concern? I can help you create a manageable study plan or suggest stress-reduction techniques for exam preparation.";
    }
    
    if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia')) {
      return "Sleep issues are very common among students. Good sleep hygiene can make a huge difference. Try creating a consistent bedtime routine, avoiding screens 1 hour before bed, and keeping your room cool and dark. Would you like more detailed sleep tips?";
    }
    
    if (message.includes('lonely') || message.includes('isolated') || message.includes('friends')) {
      return "Feeling lonely is one of the most common experiences for students, especially when starting at a new place. Building connections takes time, and that's okay. Consider joining study groups, campus clubs, or our community healing circles where you can connect with peers who understand what you're going through.";
    }
    
    return "Thank you for sharing that with me. I want you to know that your feelings are completely valid. As students, we face unique challenges, and it's important to acknowledge that. Can you tell me more about what's been on your mind lately? I'm here to listen and support you.";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
      language: selectedLanguage,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="animate-breathe mb-4">
            <MessageCircle className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Wellness Companion
          </h1>
          <p className="text-muted-foreground">
            A safe space to share your thoughts and feelings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col shadow-comfort">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-primary" />
                    <span>Chat with AI Companion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.isUser
                              ? 'bg-primary text-primary-foreground shadow-gentle'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-muted-foreground rounded-lg p-4 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            </div>
                            <span className="text-sm">AI is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="shadow-gentle hover:shadow-comfort transition-gentle"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>Support Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setInputMessage("I'm feeling stressed about my exams")}
                >
                  Academic Stress
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setInputMessage("I've been feeling lonely lately")}
                >
                  Loneliness
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setInputMessage("I'm having trouble sleeping")}
                >
                  Sleep Issues
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setInputMessage("I need help managing my anxiety")}
                >
                  Anxiety Support
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you need professional support, I can help connect you with a qualified counselor.
                </p>
                <Button variant="secondary" className="w-full">
                  Connect to Counselor
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle>Privacy Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Your conversations are encrypted and private. We only share information with counselors with your explicit consent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;