
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AgentConfigWizard from '@/components/AgentConfigWizard';
import SidebarConfigLayout from '@/components/SidebarConfigLayout';
import { Zap, Users, Settings, Layout } from 'lucide-react';

const Index = () => {
  const [activeLayout, setActiveLayout] = useState('wizard');
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return activeLayout === 'wizard' ? <AgentConfigWizard /> : <SidebarConfigLayout />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Agent Builder</h1>
                <p className="text-sm text-gray-500">No-code AI configuration</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
              Beta
            </Badge>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Configure Your AI Agent in
            <span className="text-blue-600"> Minutes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Build intelligent AI agents with our intuitive no-code interface. Perfect for managers and teams who want powerful AI without the complexity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => setShowDemo(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Building Your Agent
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg rounded-lg"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-blue-100 hover:border-blue-200 transition-colors duration-200">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">No-Code Friendly</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Designed for non-programmers. Simple toggles, dropdowns, and step-by-step guidance make AI accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 hover:border-orange-200 transition-colors duration-200">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Quick Deployment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Go from idea to live AI agent in minutes. Test, preview, and publish with just a few clicks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:border-blue-200 transition-colors duration-200">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Flexible Configuration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Choose from standard or advanced settings. Industry templates and customizable options for every use case.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Layout Variations Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Preferred Layout</h3>
            <p className="text-gray-600">Pick the configuration style that works best for you</p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={activeLayout === 'wizard' ? 'default' : 'outline'}
              onClick={() => setActiveLayout('wizard')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                activeLayout === 'wizard' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Layout className="w-4 h-4 mr-2" />
              Step-by-Step Wizard
            </Button>
            <Button
              variant={activeLayout === 'sidebar' ? 'default' : 'outline'}
              onClick={() => setActiveLayout('sidebar')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                activeLayout === 'sidebar' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Sidebar Layout
            </Button>
          </div>

          {/* Layout Preview */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Layout className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {activeLayout === 'wizard' ? 'Step-by-Step Wizard' : 'Sidebar Configuration'}
              </h4>
              <p className="text-gray-600 mb-6">
                {activeLayout === 'wizard' 
                  ? 'Guided step-by-step process perfect for first-time users'
                  : 'All options visible at once for experienced users'
                }
              </p>
              <Button 
                onClick={() => setShowDemo(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
              >
                Try This Layout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
