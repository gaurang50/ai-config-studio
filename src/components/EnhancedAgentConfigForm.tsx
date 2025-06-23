import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Play, 
  Eye, 
  Settings,
  Building,
  User,
  MessageSquare,
  Globe,
  Volume2
} from 'lucide-react';
import VoiceSelection from './VoiceSelection';

// Data constants from your code
const AGENT_TYPES = [
  { id: 'receptionist', name: 'Virtual Receptionist' },
  { id: 'sales', name: 'Sales/Marketing' },
  { id: 'service', name: 'Customer Service' },
  { id: 'scheduling', name: 'Meeting/Appointment Scheduler' }
];

const HOTEL_AI_AGENT_TYPES = [
  { id: 'a1e2c3d4-5678-4f90-abcd-111122223333', name: 'Front Desk' },
  { id: 'b2f3d4e5-6789-4abc-bcde-222233334444', name: 'Housekeeping' },
  { id: 'c4e5f6a7-7890-4def-bacd-333344445555', name: 'Reservations' },
  { id: 'd5f6a7b8-8901-4f01-bcde-444455556666', name: 'Concierge' }
];

const INDUSTRIES = [
  { id: '1', name: 'General Business' },
  { id: '2', name: 'Healthcare' },
  { id: '3', name: 'Real Estate' },
  { id: '4', name: 'Restaurant' },
  { id: '5', name: 'Hotel AI' },
  { id: '6', name: 'Legal Services' },
  { id: '7', name: 'Financial Services' }
];

interface EnhancedAgentConfigFormProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  selectedTemplate: any;
  darkMode?: boolean;
}

const EnhancedAgentConfigForm: React.FC<EnhancedAgentConfigFormProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  selectedTemplate,
  darkMode = false
}) => {
  // Form state - incorporating all fields from your code
  const [formData, setFormData] = useState({
    name: selectedTemplate?.name || '',
    description: selectedTemplate?.description || '',
    industry: '1', // General Business default
    agent_type: 'receptionist',
    agent_person_name: 'Chris',
    greeting_message: '',
    website: '',
    voice: 'Voice 1',
    ai_voice: 'female',
    phone_number: '',
    personality: 'professional',
    temperature: 70,
    // Advanced features
    features: {
      autoResponse: true,
      knowledgeBase: true,
      humanHandoff: false,
      analytics: true,
      voiceMail: false,
      escalation: false
    },
    tts_config: {
      stability: 0.75,
      similarity_boost: 0.75,
      style: 0.75,
      speed: 1
    }
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [relevantAgentTypes, setRelevantAgentTypes] = useState(AGENT_TYPES);

  // Update greeting message when name or business name changes
  useEffect(() => {
    if (formData.name && formData.agent_person_name) {
      setFormData(prev => ({
        ...prev,
        greeting_message: `Hi, this is ${prev.agent_person_name} from ${prev.name}. How can I help you?`
      }));
    }
  }, [formData.name, formData.agent_person_name]);

  // Update agent types based on industry
  useEffect(() => {
    const selectedIndustry = INDUSTRIES.find(ind => ind.id === formData.industry);
    if (selectedIndustry?.name === 'Hotel AI') {
      setRelevantAgentTypes(HOTEL_AI_AGENT_TYPES);
      setFormData(prev => ({ ...prev, agent_type: HOTEL_AI_AGENT_TYPES[0].id }));
    } else {
      setRelevantAgentTypes(AGENT_TYPES);
      setFormData(prev => ({ ...prev, agent_type: 'receptionist' }));
    }
  }, [formData.industry]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: { ...prev.features, [feature]: value }
    }));
  };

  const StepIndicator = ({ stepNumber, title, isActive, isCompleted }: any) => (
    <div className="flex items-center space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
        isCompleted ? 'bg-green-500 text-white' : 
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
      }`}>
        {isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNumber}
      </div>
      <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
        {title}
      </span>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="dark:text-white">Business Information</span>
                  {selectedTemplate && (
                    <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      Using {selectedTemplate.name} template
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-base font-medium dark:text-gray-200">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your business name"
                      className="text-base p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-base font-medium dark:text-gray-200">
                      Industry Type *
                    </Label>
                    <select 
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {INDUSTRIES.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-medium dark:text-gray-200">
                    Business Description, Products & Services *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what your business does, your products and services"
                    className="min-h-24 text-base p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base font-medium dark:text-gray-200">
                    Website (optional)
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="text-base p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="dark:text-white">AI Agent Setup</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="agentType" className="text-base font-medium dark:text-gray-200">
                      AI Agent Type *
                    </Label>
                    <select 
                      id="agentType"
                      value={formData.agent_type}
                      onChange={(e) => handleInputChange('agent_type', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {relevantAgentTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agentName" className="text-base font-medium dark:text-gray-200">
                      AI Agent's Name *
                    </Label>
                    <Input
                      id="agentName"
                      value={formData.agent_person_name}
                      onChange={(e) => handleInputChange('agent_person_name', e.target.value)}
                      placeholder="Enter a name for your AI assistant"
                      className="text-base p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="greetingMessage" className="text-base font-medium dark:text-gray-200">
                    Greeting Message
                  </Label>
                  <Textarea
                    id="greetingMessage"
                    value={formData.greeting_message}
                    onChange={(e) => handleInputChange('greeting_message', e.target.value)}
                    placeholder="Enter how your AI assistant should greet customers"
                    className="min-h-20 text-base p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This message will be the first thing customers hear when they interact with your AI agent.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personality" className="text-base font-medium dark:text-gray-200">
                    Personality Style
                  </Label>
                  <select 
                    id="personality"
                    value={formData.personality}
                    onChange={(e) => handleInputChange('personality', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="professional">Professional & Courteous</option>
                    <option value="friendly">Friendly & Helpful</option>
                    <option value="casual">Casual & Relaxed</option>
                    <option value="formal">Formal & Precise</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <VoiceSelection
              selectedVoice={formData.voice}
              onVoiceSelect={(voice) => handleInputChange('voice', voice)}
              agentGender={formData.ai_voice}
              onGenderChange={(gender) => handleInputChange('ai_voice', gender)}
              greetingMessage={formData.greeting_message}
              darkMode={darkMode}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="dark:text-white">Features & Settings</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="dark:border-gray-600 dark:text-gray-300"
                  >
                    {showAdvanced ? 'Simple View' : 'Advanced View'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Core Features</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium dark:text-white">Smart Responses</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">AI automatically responds to common questions</p>
                      </div>
                      <Switch
                        checked={formData.features.autoResponse}
                        onCheckedChange={(checked) => handleFeatureToggle('autoResponse', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium dark:text-white">Knowledge Base</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Connect to your company information</p>
                      </div>
                      <Switch
                        checked={formData.features.knowledgeBase}
                        onCheckedChange={(checked) => handleFeatureToggle('knowledgeBase', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium dark:text-white">Human Handoff</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Transfer complex queries to staff</p>
                      </div>
                      <Switch
                        checked={formData.features.humanHandoff}
                        onCheckedChange={(checked) => handleFeatureToggle('humanHandoff', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium dark:text-white">Analytics</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Track performance and conversations</p>
                      </div>
                      <Switch
                        checked={formData.features.analytics}
                        onCheckedChange={(checked) => handleFeatureToggle('analytics', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                {showAdvanced && (
                  <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Settings</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="temperature" className="text-base font-medium dark:text-gray-200">
                          Response Creativity ({formData.temperature}%)
                        </Label>
                        <input
                          type="range"
                          id="temperature"
                          min="0"
                          max="100"
                          value={formData.temperature}
                          onChange={(e) => handleInputChange('temperature', parseInt(e.target.value))}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Higher values make responses more creative</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium dark:text-white">Voice Mail</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Enable voice mail functionality</p>
                          </div>
                          <Switch
                            checked={formData.features.voiceMail}
                            onCheckedChange={(checked) => handleFeatureToggle('voiceMail', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium dark:text-white">Escalation Alerts</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of escalated calls</p>
                          </div>
                          <Switch
                            checked={formData.features.escalation}
                            onCheckedChange={(checked) => handleFeatureToggle('escalation', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="dark:text-white">Review & Launch</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4">Configuration Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Business Name:</span>
                      <span className="font-medium dark:text-gray-200">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Industry:</span>
                      <span className="font-medium dark:text-gray-200">
                        {INDUSTRIES.find(i => i.id === formData.industry)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Agent Type:</span>
                      <span className="font-medium dark:text-gray-200">
                        {relevantAgentTypes.find(t => t.id === formData.agent_type)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Agent Name:</span>
                      <span className="font-medium dark:text-gray-200">{formData.agent_person_name}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Voice:</span>
                      <span className="font-medium dark:text-gray-200">{formData.voice} ({formData.ai_voice})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Personality:</span>
                      <span className="font-medium capitalize dark:text-gray-200">{formData.personality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Features:</span>
                      <span className="font-medium dark:text-gray-200">
                        {Object.values(formData.features).filter(Boolean).length} enabled
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Template:</span>
                      <span className="font-medium dark:text-gray-200">{selectedTemplate?.name || 'Custom'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center space-x-2 px-8 dark:border-gray-600 dark:text-gray-300"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Agent</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center space-x-2 px-8 dark:border-gray-600 dark:text-gray-300"
                >
                  <Play className="w-4 h-4" />
                  <span>Test Agent</span>
                </Button>
                
                <Button 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2 px-8"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Launch Agent</span>
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Your AI agent is ready to go live! You can always modify these settings later from your dashboard.
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const steps = [
    { id: 1, title: 'Choose Template', completed: currentStep > 1 },
    { id: 2, title: 'Business Info', completed: currentStep > 2 },
    { id: 3, title: 'Agent Setup', completed: currentStep > 3 },
    { id: 4, title: 'Voice Selection', completed: currentStep > 4 },
    { id: 5, title: 'Features', completed: currentStep > 5 },
    { id: 6, title: 'Review & Launch', completed: currentStep > 6 }
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="space-y-8">
      {/* Single Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {steps.find(s => s.id === currentStep)?.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep} of {steps.length}
            </p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Template</span>
            <span>Business</span>
            <span>Agent</span>
            <span>Voice</span>
            <span>Features</span>
            <span>Launch</span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-96">
        {renderStep()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-6 dark:border-gray-600 dark:text-gray-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        {currentStep < 6 ? (
          <Button
            onClick={onNextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 px-6"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default EnhancedAgentConfigForm;
