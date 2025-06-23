
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Zap, 
  Plus, 
  FileText, 
  ArrowLeft,
  CheckCircle,
  Circle,
  Eye,
  Play,
  Rocket
} from 'lucide-react';
import TemplateSelector from './TemplateSelector';
import EnhancedAgentConfigForm from './EnhancedAgentConfigForm';

const AgentConfigPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeNav, setActiveNav] = useState('create');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const navItems = [
    { id: 'create', label: 'Create Agent', icon: Plus },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const steps = [
    { id: 1, title: 'Choose Template', completed: currentStep > 1 },
    { id: 2, title: 'Business Info', completed: currentStep > 2 },
    { id: 3, title: 'Agent Setup', completed: currentStep > 3 },
    { id: 4, title: 'Voice Selection', completed: currentStep > 4 },
    { id: 5, title: 'Features', completed: currentStep > 5 },
    { id: 6, title: 'Review & Launch', completed: currentStep > 6 }
  ];

  if (activeNav === 'templates') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">AI Agent Builder</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeNav === item.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Templates Content */}
        <div className="flex-1 p-8">
          <TemplateSelector 
            onSelectTemplate={(template) => {
              setSelectedTemplate(template);
              setActiveNav('create');
              setCurrentStep(2);
            }}
            fullView={true}
          />
        </div>
      </div>
    );
  }

  if (activeNav === 'settings') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">AI Agent Builder</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeNav === item.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Configure your account preferences and API settings here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900">AI Agent Builder</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeNav === item.id 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-left"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Agent
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-left"
            >
              <Play className="w-4 h-4 mr-2" />
              Test Agent
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Create Your AI Agent</h2>
                <p className="text-gray-600 mt-2 text-lg">
                  Set up your intelligent assistant in just a few simple steps
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                  Step {currentStep} of {totalSteps}
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-3 py-1">
                  In Progress
                </Badge>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Progress value={progress} className="flex-1 h-3" />
                <span className="text-sm font-medium text-gray-600 min-w-12">
                  {Math.round(progress)}%
                </span>
              </div>
              
              {/* Step Indicators - Desktop */}
              <div className="hidden lg:flex justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-2">
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : currentStep === step.id ? (
                      <Circle className="w-5 h-5 text-blue-500 fill-current" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={`text-sm font-medium ${
                      step.completed ? 'text-green-600' : 
                      currentStep === step.id ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          {showTemplateSelector ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplateSelector(false)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <h3 className="text-xl font-semibold">Choose a Template</h3>
              </div>
              <TemplateSelector 
                onSelectTemplate={(template) => {
                  setSelectedTemplate(template);
                  setShowTemplateSelector(false);
                  setCurrentStep(2);
                }}
              />
            </div>
          ) : currentStep === 1 ? (
            <Card className="p-8">
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Let's Build Your AI Agent
                  </h3>
                  <p className="text-gray-600 text-lg max-w-md mx-auto">
                    Choose your starting point to create an intelligent assistant that works perfectly for your business
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                  <Button
                    onClick={() => setShowTemplateSelector(true)}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-3 px-8 py-4"
                  >
                    <FileText className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Use Template</div>
                      <div className="text-sm opacity-90">Start with a proven setup</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center space-x-3 px-8 py-4 border-2"
                  >
                    <Plus className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Start from Scratch</div>
                      <div className="text-sm text-gray-600">Build your own custom agent</div>
                    </div>
                  </Button>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
                  <h4 className="font-semibold text-blue-900 mb-3">What you'll create:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Intelligent conversation handling</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-800">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Natural voice interactions</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-800">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>24/7 customer support</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-800">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Easy integration & testing</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <EnhancedAgentConfigForm 
              currentStep={currentStep}
              onNextStep={() => setCurrentStep(currentStep + 1)}
              onPrevStep={() => setCurrentStep(currentStep - 1)}
              selectedTemplate={selectedTemplate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentConfigPage;
