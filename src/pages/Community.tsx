import { useState } from 'react';
import { Users, Plus, Heart, MessageSquare, Flag, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  content: string;
  category: 'story' | 'reflection' | 'poetry' | 'support';
  author: string;
  timestamp: Date;
  hearts: number;
  hasHearted: boolean;
  comments: number;
  tags: string[];
}

const samplePosts: Post[] = [
  {
    id: '1',
    title: 'Finding Light in Dark Times',
    content: 'I wanted to share how journaling has helped me process my anxiety. Writing down my thoughts each morning has become my anchor...',
    category: 'reflection',
    author: 'Anonymous Student',
    timestamp: new Date('2024-01-15T10:30:00'),
    hearts: 23,
    hasHearted: false,
    comments: 8,
    tags: ['anxiety', 'journaling', 'self-care']
  },
  {
    id: '2',
    title: 'A Poem for Healing',
    content: 'Breathe in hope, breathe out fear,\nIn this moment, I am here.\nThrough the storm, I find my way,\nStronger with each passing day...',
    category: 'poetry',
    author: 'Anonymous Poet',
    timestamp: new Date('2024-01-14T16:45:00'),
    hearts: 41,
    hasHearted: true,
    comments: 12,
    tags: ['poetry', 'hope', 'healing']
  },
  {
    id: '3',
    title: 'My Journey with Social Anxiety',
    content: 'Starting university felt impossible with my social anxiety. But I took small steps - first just sitting in the common area, then joining one study group...',
    category: 'story',
    author: 'Anonymous Warrior',
    timestamp: new Date('2024-01-13T14:20:00'),
    hearts: 67,
    hasHearted: false,
    comments: 24,
    tags: ['social-anxiety', 'university', 'growth']
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('story');
  const [filter, setFilter] = useState<string>('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: 'story', label: 'Personal Story', color: 'bg-primary' },
    { value: 'reflection', label: 'Reflection', color: 'bg-secondary' },
    { value: 'poetry', label: 'Poetry', color: 'bg-accent' },
    { value: 'support', label: 'Support Request', color: 'bg-warning' }
  ];

  const handleHeartPost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              hearts: post.hasHearted ? post.hearts - 1 : post.hearts + 1,
              hasHearted: !post.hasHearted
            }
          : post
      )
    );
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.split('\n')[0].substring(0, 50) + '...',
      content: newPost,
      category: selectedCategory as Post['category'],
      author: 'Anonymous Student',
      timestamp: new Date(),
      hearts: 0,
      hasHearted: false,
      comments: 0,
      tags: ['new-post']
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setShowNewPost(false);
    
    toast({
      title: "Post Shared",
      description: "Your anonymous post has been shared with the healing community.",
    });
  };

  const filteredPosts = posts.filter(post => 
    filter === 'all' || post.category === filter
  );

  const getCategoryBadge = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? { label: cat.label, color: cat.color } : { label: category, color: 'bg-muted' };
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="animate-breathe mb-4">
            <Users className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Healing Community
          </h1>
          <p className="text-muted-foreground">
            A safe space for anonymous sharing and peer support
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center shadow-gentle">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">247</div>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-gentle">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-secondary">89</div>
              <p className="text-sm text-muted-foreground">Stories Shared</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-gentle">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">1.2k</div>
              <p className="text-sm text-muted-foreground">Hearts Given</p>
            </CardContent>
          </Card>
        </div>

        {/* New Post & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowNewPost(!showNewPost)}
              className="shadow-gentle hover:shadow-comfort transition-gentle"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="story">Stories</SelectItem>
                  <SelectItem value="reflection">Reflections</SelectItem>
                  <SelectItem value="poetry">Poetry</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="mb-6 shadow-comfort">
            <CardHeader>
              <CardTitle>Share Your Story Anonymously</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Category:</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts, experiences, poetry, or request support. Remember, this is a safe and anonymous space..."
                className="min-h-32"
              />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                  Share Anonymously
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const categoryBadge = getCategoryBadge(post.category);
            
            return (
              <Card key={post.id} className="shadow-comfort hover:shadow-comfort transition-comfort">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${categoryBadge.color} text-white`}>
                        {categoryBadge.label}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        by {post.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {post.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHeartPost(post.id)}
                        className={`transition-gentle ${post.hasHearted ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${post.hasHearted ? 'fill-current' : ''}`} />
                        {post.hearts}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {post.comments}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Community Guidelines */}
        <Card className="mt-8 shadow-gentle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>Community Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">✨ Be Kind & Supportive</h4>
                <p className="text-muted-foreground">Support others with empathy and understanding.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔒 Respect Privacy</h4>
                <p className="text-muted-foreground">Keep shared stories within our community.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚫 No Harmful Content</h4>
                <p className="text-muted-foreground">AI filters help maintain a safe space for all.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🌱 Encourage Growth</h4>
                <p className="text-muted-foreground">Share experiences that help others heal and grow.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;