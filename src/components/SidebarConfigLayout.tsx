
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Play, Eye, Rocket, Settings, Building, Users, Sparkles, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SidebarConfigLayout = () => {
  const [activeTab, setActiveTab] = useState('standard');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    website: '',
    industry: 'general',
    agentType: 'receptionist',
    agentName: 'Alex',
    greetingMessage: '',
    voice: 'sarah',
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

  const handleTest = () => {
    toast({
      title: "Testing Agent",
      description: "Your AI agent is being tested...",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Preview Mode",
      description: "See how your agent will appear to users.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Publishing Agent",
      description: "Your AI agent is being deployed!",
    });
  };

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
                <p className="text-sm text-gray-500">Sidebar Layout</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleTest}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Play className="w-4 h-4 mr-2" />
                Test
              </Button>
              
              <Button
                variant="outline"
                onClick={handlePreview}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              <Button
                onClick={handlePublish}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-blue-100 shadow-sm min-h-screen">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard" className="text-sm">
                  Standard
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-sm">
                  Advanced
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-6 space-y-6">
                {/* Navigation Menu */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Business Info</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Agent Type</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Sparkles className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Voice & Personality</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Communication</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Settings</span>
                  </div>
                </div>

                <Separator />

                {/* Quick Settings */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Quick Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Voice Calls</Label>
                      <Switch
                        checked={formData.enableVoice}
                        onCheckedChange={(checked) => updateFormData('enableVoice', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Email Support</Label>
                      <Switch
                        checked={formData.enableEmail}
                        onCheckedChange={(checked) => updateFormData('enableEmail', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">SMS Messages</Label>
                      <Switch
                        checked={formData.enableSMS}
                        onCheckedChange={(checked) => updateFormData('enableSMS', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Status Indicator */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Configuration Valid</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Ready to test and deploy
                  </p>
                </div>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl space-y-8">
            {/* Business Information */}
            <Card className="border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-blue-100">
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>Business Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
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
                    <Label htmlFor="website">Website</Label>
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
                    placeholder="Describe what your business does..."
                    value={formData.businessDescription}
                    onChange={(e) => updateFormData('businessDescription', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Business</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                        <SelectItem value="hospitality">Hotels & Hospitality</SelectItem>
                        <SelectItem value="finance">Financial Services</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Agent Type</Label>
                    <Select value={formData.agentType} onValueChange={(value) => updateFormData('agentType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receptionist">Virtual Receptionist</SelectItem>
                        <SelectItem value="sales">Sales Assistant</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="booking">Appointment Scheduler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Personality */}
            <Card className="border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-blue-100">
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Agent Personality & Voice</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input
                      id="agent-name"
                      placeholder="Enter AI assistant's name"
                      value={formData.agentName}
                      onChange={(e) => updateFormData('agentName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Personality</Label>
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
                    {['sarah', 'john', 'emma', 'mike'].map((voice) => (
                      <Card
                        key={voice}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          formData.voice === voice
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => updateFormData('voice', voice)}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 capitalize">{voice}</h3>
                            <Badge variant="outline" className="mt-1">
                              {voice === 'sarah' || voice === 'emma' ? 'Female' : 'Male'}
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
              </CardContent>
            </Card>

            {/* Settings Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Standard Settings */}
              <Card className="border-blue-100">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg">Standard Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Voice Calls</Label>
                        <p className="text-sm text-gray-600">Handle phone conversations</p>
                      </div>
                      <Switch
                        checked={formData.enableVoice}
                        onCheckedChange={(checked) => updateFormData('enableVoice', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Email Support</Label>
                        <p className="text-sm text-gray-600">Respond to emails</p>
                      </div>
                      <Switch
                        checked={formData.enableEmail}
                        onCheckedChange={(checked) => updateFormData('enableEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">SMS Messages</Label>
                        <p className="text-sm text-gray-600">Text conversations</p>
                      </div>
                      <Switch
                        checked={formData.enableSMS}
                        onCheckedChange={(checked) => updateFormData('enableSMS', checked)}
                      />
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
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card className="border-orange-100">
                <CardHeader className="bg-orange-50 border-b border-orange-100">
                  <CardTitle className="text-lg">Advanced Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
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
                      <Label>Max Response Length</Label>
                      <Input
                        type="number"
                        value={formData.maxTokens}
                        onChange={(e) => updateFormData('maxTokens', parseInt(e.target.value))}
                        placeholder="150"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EST">Eastern Time</SelectItem>
                          <SelectItem value="CST">Central Time</SelectItem>
                          <SelectItem value="MST">Mountain Time</SelectItem>
                          <SelectItem value="PST">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarConfigLayout;
