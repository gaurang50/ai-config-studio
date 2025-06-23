
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Check, Play, Eye, Rocket, Sparkles, Users, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const STEPS = [
  { id: 1, title: 'Business Info', icon: Building },
  { id: 2, title: 'Agent Type', icon: Users },
  { id: 3, title: 'Voice & Personality', icon: Sparkles },
  { id: 4, title: 'Settings', icon: Users },
  { id: 5, title: 'Review & Launch', icon: Rocket }
];

const INDUSTRY_TEMPLATES = [
  { id: 'general', name: 'General Business', description: 'Perfect for most businesses' },
  { id: 'healthcare', name: 'Healthcare', description: 'HIPAA-compliant features' },
  { id: 'retail', name: 'Retail & E-commerce', description: 'Sales and support focused' },
  { id: 'hospitality', name: 'Hotels & Hospitality', description: 'Guest services optimized' },
  { id: 'finance', name: 'Financial Services', description: 'Security-first approach' },
  { id: 'education', name: 'Education', description: 'Student and parent support' }
];

const AGENT_TYPES = [
  { id: 'receptionist', name: 'Virtual Receptionist', description: 'Handle calls, appointments, and basic inquiries' },
  { id: 'sales', name: 'Sales Assistant', description: 'Lead qualification and sales support' },
  { id: 'support', name: 'Customer Support', description: 'Help desk and technical assistance' },
  { id: 'booking', name: 'Appointment Scheduler', description: 'Schedule and manage appointments' }
];

const VOICE_OPTIONS = [
  { id: 'sarah', name: 'Sarah', gender: 'female', description: 'Professional and warm' },
  { id: 'john', name: 'John', gender: 'male', description: 'Confident and friendly' },
  { id: 'emma', name: 'Emma', gender: 'female', description: 'Energetic and helpful' },
  { id: 'mike', name: 'Mike', gender: 'male', description: 'Calm and reassuring' }
];

const AgentConfigWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    website: '',
    industry: '',
    agentType: '',
    agentName: 'Alex',
    greetingMessage: '',
    voice: '',
    personality: 'professional',
    temperature: 0.7,
    maxTokens: 150,
    enableSMS: false,
    enableEmail: true,
    enableVoice: true,
    workingHours: '9-17',
    timezone: 'EST'
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (formData.businessName && formData.agentName) {
      const greeting = `Hi! This is ${formData.agentName} from ${formData.businessName}. How can I help you today?`;
      updateFormData('greetingMessage', greeting);
    }
  }, [formData.businessName, formData.agentName]);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTest = () => {
    toast({
      title: "Testing Agent",
      description: "Your AI agent is being tested with sample scenarios...",
    });
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
    toast({
      title: isPreviewMode ? "Editing Mode" : "Preview Mode",
      description: isPreviewMode ? "You can now edit your agent configuration." : "See how your agent will appear to users.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Publishing Agent",
      description: "Your AI agent is being deployed and will be live shortly!",
    });
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Agent Configuration</h1>
                <p className="text-sm text-gray-500">Step {currentStep} of {STEPS.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="advanced-mode" className="text-sm font-medium">
                Advanced Mode
              </Label>
              <Switch
                id="advanced-mode"
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isCurrent ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < STEPS.length - 1 && (
                    <div className="w-8 h-px bg-gray-300 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-blue-100">
            <CardTitle className="text-2xl text-gray-900">
              {STEPS[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Step 1: Business Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name *</Label>
                    <Input
                      id="business-name"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) => updateFormData('businessName', e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => updateFormData('website', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your business does, your products, and services..."
                    value={formData.businessDescription}
                    onChange={(e) => updateFormData('businessDescription', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Industry Template</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {INDUSTRY_TEMPLATES.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          formData.industry === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => updateFormData('industry', template.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Agent Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What should your AI agent help with?
                  </h3>
                  <p className="text-gray-600">Choose the primary role for your AI assistant</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {AGENT_TYPES.map((type) => (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        formData.agentType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => updateFormData('agentType', type.id)}
                    >
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        {formData.agentType === type.id && (
                          <Badge className="mt-3 bg-blue-100 text-blue-700">Selected</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Voice & Personality */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input
                      id="agent-name"
                      placeholder="Enter your AI assistant's name"
                      value={formData.agentName}
                      onChange={(e) => updateFormData('agentName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Personality Style</Label>
                    <Select value={formData.personality} onValueChange={(value) => updateFormData('personality', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="greeting">Greeting Message</Label>
                  <Textarea
                    id="greeting"
                    placeholder="How should your agent greet customers?"
                    value={formData.greetingMessage}
                    onChange={(e) => updateFormData('greetingMessage', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Voice Selection</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {VOICE_OPTIONS.map((voice) => (
                      <Card
                        key={voice.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          formData.voice === voice.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => updateFormData('voice', voice.id)}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{voice.name}</h3>
                            <p className="text-sm text-gray-600">{voice.description}</p>
                            <Badge variant="outline" className="mt-1">
                              {voice.gender}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Settings */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Standard Settings */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Communication Channels
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Voice Calls</Label>
                          <p className="text-sm text-gray-600">Handle phone conversations</p>
                        </div>
                        <Switch
                          checked={formData.enableVoice}
                          onCheckedChange={(checked) => updateFormData('enableVoice', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Email Support</Label>
                          <p className="text-sm text-gray-600">Respond to email inquiries</p>
                        </div>
                        <Switch
                          checked={formData.enableEmail}
                          onCheckedChange={(checked) => updateFormData('enableEmail', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">SMS Messages</Label>
                          <p className="text-sm text-gray-600">Text message conversations</p>
                        </div>
                        <Switch
                          checked={formData.enableSMS}
                          onCheckedChange={(checked) => updateFormData('enableSMS', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  {showAdvanced && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Advanced Configuration
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Response Creativity</Label>
                          <div className="px-3 py-2 bg-gray-50 rounded">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={formData.temperature}
                              onChange={(e) => updateFormData('temperature', parseFloat(e.target.value))}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Conservative</span>
                              <span>Creative</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Working Hours</Label>
                          <Select value={formData.workingHours} onValueChange={(value) => updateFormData('workingHours', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="24-7">24/7 Available</SelectItem>
                              <SelectItem value="9-17">9 AM - 5 PM</SelectItem>
                              <SelectItem value="8-18">8 AM - 6 PM</SelectItem>
                              <SelectItem value="custom">Custom Hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Review & Launch */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Launch Your AI Agent!
                  </h3>
                  <p className="text-gray-600">Review your configuration and deploy your assistant</p>
                </div>

                <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Agent Overview</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Business:</span> {formData.businessName}</div>
                          <div><span className="font-medium">Agent Name:</span> {formData.agentName}</div>
                          <div><span className="font-medium">Type:</span> {AGENT_TYPES.find(t => t.id === formData.agentType)?.name}</div>
                          <div><span className="font-medium">Voice:</span> {VOICE_OPTIONS.find(v => v.id === formData.voice)?.name}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Capabilities</h4>
                        <div className="space-y-2">
                          {formData.enableVoice && <Badge variant="secondary">Voice Calls</Badge>}
                          {formData.enableEmail && <Badge variant="secondary">Email</Badge>}
                          {formData.enableSMS && <Badge variant="secondary">SMS</Badge>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleTest}
                    className="px-6 py-3 border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Test Agent
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    className="px-6 py-3 border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  
                  <Button
                    onClick={handlePublish}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Publish Agent
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < STEPS.length ? (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!formData.businessName || !formData.businessDescription || !formData.industry)) ||
                (currentStep === 2 && !formData.agentType) ||
                (currentStep === 3 && (!formData.agentName || !formData.voice))
              }
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AgentConfigWizard;
