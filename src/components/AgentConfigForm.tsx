
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface AgentConfigFormProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  selectedTemplate: any;
}

const AgentConfigForm: React.FC<AgentConfigFormProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  selectedTemplate
}) => {
  const [agentName, setAgentName] = useState(selectedTemplate?.name || '');
  const [agentDescription, setAgentDescription] = useState(selectedTemplate?.description || '');
  const [personality, setPersonality] = useState('friendly');
  const [features, setFeatures] = useState({
    autoResponse: true,
    knowledgeBase: true,
    humanHandoff: false,
    analytics: true
  });

  const renderStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <span>Basic Information</span>
                {selectedTemplate && (
                  <Badge className="bg-blue-100 text-blue-700">
                    Using {selectedTemplate.name} template
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="agentName">Agent Name</Label>
                <Input
                  id="agentName"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Enter your agent's name"
                  className="text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="agentDescription">Description</Label>
                <Textarea
                  id="agentDescription"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  placeholder="Describe what your agent will do"
                  className="min-h-24 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personality">Personality</Label>
                <select 
                  id="personality"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-base"
                >
                  <option value="friendly">Friendly & Helpful</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual & Relaxed</option>
                  <option value="formal">Formal & Precise</option>
                </select>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Configuration Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Auto Response</h4>
                    <p className="text-sm text-gray-600">Automatically respond to common questions</p>
                  </div>
                  <Switch
                    checked={features.autoResponse}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, autoResponse: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Knowledge Base</h4>
                    <p className="text-sm text-gray-600">Connect to your company's knowledge base</p>
                  </div>
                  <Switch
                    checked={features.knowledgeBase}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, knowledgeBase: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Human Handoff</h4>
                    <p className="text-sm text-gray-600">Transfer to human agent when needed</p>
                  </div>
                  <Switch
                    checked={features.humanHandoff}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, humanHandoff: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Analytics</h4>
                    <p className="text-sm text-gray-600">Track conversations and performance metrics</p>
                  </div>
                  <Switch
                    checked={features.analytics}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, analytics: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Review & Deploy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Agent Configuration Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{agentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template:</span>
                    <span className="font-medium">{selectedTemplate?.name || 'Custom'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personality:</span>
                    <span className="font-medium capitalize">{personality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features:</span>
                    <span className="font-medium">
                      {Object.values(features).filter(Boolean).length} enabled
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Your agent is ready to deploy! You can always modify these settings later.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Deploy Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderStep()}
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={onNextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default AgentConfigForm;
