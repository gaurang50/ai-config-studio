
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
  Circle
} from 'lucide-react';
import TemplateSelector from './TemplateSelector';
import AgentConfigForm from './AgentConfigForm';

const AgentConfigPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeNav, setActiveNav] = useState('create');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const navItems = [
    { id: 'create', label: 'Create Agent', icon: Plus },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const steps = [
    { id: 1, title: 'Choose Template', completed: currentStep > 1 },
    { id: 2, title: 'Basic Info', completed: currentStep > 2 },
    { id: 3, title: 'Configuration', completed: currentStep > 3 },
    { id: 4, title: 'Review & Deploy', completed: currentStep > 4 }
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Create Your AI Agent</h2>
                <p className="text-gray-600 mt-1">Step {currentStep} of {totalSteps}</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                In Progress
              </Badge>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              
              {/* Step Indicators */}
              <div className="flex justify-between">
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
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Choose Your Starting Point
                  </h3>
                  <p className="text-gray-600">
                    Select a pre-built template or start from scratch to create your AI agent
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button
                    onClick={() => setShowTemplateSelector(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Use Template</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Start from Scratch</span>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <AgentConfigForm 
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
