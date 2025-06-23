import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Rocket,
  Moon,
  Sun
} from 'lucide-react';
import TemplateSelector from './TemplateSelector';
import EnhancedAgentConfigForm from './EnhancedAgentConfigForm';

const AgentConfigPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeNav, setActiveNav] = useState('create');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const totalSteps = 6;

  const navItems = [
    { id: 'create', label: 'Create Agent', icon: Plus },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (activeNav === 'templates') {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
          {/* Left Navigation */}
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Agent Builder</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeNav === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Dark Mode Toggle */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="w-full justify-start"
              >
                {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
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
      </div>
    );
  }

  if (activeNav === 'settings') {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
          {/* Left Navigation */}
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Agent Builder</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeNav === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Dark Mode Toggle */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="w-full justify-start"
              >
                {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Configure your account preferences and API settings here.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Left Navigation */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Agent Builder</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeNav === item.id 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
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

          {/* Dark Mode Toggle */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="w-full justify-start"
            >
              {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Simplified Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your AI Agent</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                    Set up your intelligent assistant in just a few simple steps
                  </p>
                </div>
                <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1">
                  In Progress
                </Badge>
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
                  <h3 className="text-xl font-semibold dark:text-white">Choose a Template</h3>
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
              <Card className="p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Let's Build Your AI Agent
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
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
                      className="flex items-center space-x-3 px-8 py-4 border-2 dark:border-gray-600 dark:text-gray-300"
                    >
                      <Plus className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">Start from Scratch</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Build your own custom agent</div>
                      </div>
                    </Button>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-2xl mx-auto">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">What you'll create:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Intelligent conversation handling</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Natural voice interactions</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>24/7 customer support</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfigPage;
