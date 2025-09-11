import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children?: ReactNode;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  gradient?: 'healing' | 'calm' | 'emergency';
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  children, 
  className,
  action,
  gradient = 'calm'
}: FeatureCardProps) => {
  const gradientClasses = {
    healing: 'gradient-healing',
    calm: 'gradient-calm',
    emergency: 'gradient-emergency'
  };

  return (
    <Card className={cn(
      "relative overflow-hidden shadow-comfort hover:shadow-comfort transition-comfort border-0",
      className
    )}>
      <div className={cn(
        "absolute inset-0 opacity-5",
        gradientClasses[gradient]
      )} />
      
      <CardContent className="relative p-6">
        <div className="flex items-start space-x-4">
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-gentle",
            gradientClasses[gradient]
          )}>
            {icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {description}
            </p>
            
            {children && (
              <div className="mb-4">
                {children}
              </div>
            )}
            
            {action && (
              <Button
                onClick={action.onClick}
                className="transition-gentle shadow-gentle hover:shadow-comfort"
              >
                {action.label}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;