
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  ShoppingCart, 
  Users, 
  FileText, 
  Headphones,
  Calendar,
  Plus
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  features: string[];
  popular?: boolean;
}

const templates: Template[] = [
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Handle customer inquiries, resolve issues, and provide 24/7 support',
    icon: Headphones,
    category: 'Support',
    features: ['Auto-responses', 'Ticket routing', 'Knowledge base integration'],
    popular: true
  },
  {
    id: 'sales-assistant',
    name: 'Sales Assistant',
    description: 'Qualify leads, schedule meetings, and guide prospects through sales funnel',
    icon: ShoppingCart,
    category: 'Sales',
    features: ['Lead qualification', 'Meeting booking', 'Product recommendations'],
    popular: true
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    description: 'Generate blog posts, social media content, and marketing materials',
    icon: FileText,
    category: 'Marketing',
    features: ['Blog writing', 'Social posts', 'SEO optimization']
  },
  {
    id: 'appointment-booking',
    name: 'Appointment Booking',
    description: 'Schedule appointments, manage calendars, and send reminders',
    icon: Calendar,
    category: 'Scheduling',
    features: ['Calendar integration', 'Auto-reminders', 'Rescheduling']
  },
  {
    id: 'hr-assistant',
    name: 'HR Assistant',
    description: 'Handle employee questions, onboarding, and HR processes',
    icon: Users,
    category: 'HR',
    features: ['Employee onboarding', 'Policy queries', 'Leave management']
  },
  {
    id: 'general-chatbot',
    name: 'General Chatbot',
    description: 'Multi-purpose conversational AI for various customer interactions',
    icon: MessageSquare,
    category: 'General',
    features: ['Natural conversation', 'Multi-topic', 'Customizable responses']
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  fullView?: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onSelectTemplate, 
  fullView = false 
}) => {
  return (
    <div className="space-y-6">
      {fullView && (
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Choose a Template</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started quickly with our pre-built agent templates, designed for common business use cases
          </p>
        </div>
      )}

      {/* Start from Scratch Option */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Start from Scratch</h3>
                <p className="text-gray-600">Build your agent from the ground up with full customization</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => onSelectTemplate(null)}
            >
              Choose This
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group border hover:border-blue-200"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <template.icon className="w-6 h-6 text-blue-600" />
                </div>
                {template.popular && (
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    Popular
                  </Badge>
                )}
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {template.name}
                </CardTitle>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {template.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                <ul className="space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => onSelectTemplate(template)}
              >
                Use This Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
