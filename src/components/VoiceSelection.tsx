
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2 } from 'lucide-react';

const VOICE_OPTIONS = {
  female: [
    { id: 'Voice 1', name: 'Voice 1', provider: 'ElevenLabs' },
    { id: 'Voice 3', name: 'Voice 3', provider: 'Cartesia' },
    { id: 'Voice 4', name: 'Voice 4', provider: 'Cartesia' }
  ],
  male: [
    { id: 'Voice 1', name: 'Voice 1', provider: 'ElevenLabs' },
    { id: 'Voice 2', name: 'Voice 2', provider: 'ElevenLabs' },
    { id: 'Voice 3', name: 'Voice 3', provider: 'Cartesia' },
    { id: 'Voice 4', name: 'Voice 4', provider: 'Cartesia' }
  ]
};

interface VoiceSelectionProps {
  selectedVoice: string;
  onVoiceSelect: (voice: string) => void;
  agentGender: string;
  onGenderChange: (gender: string) => void;
  greetingMessage?: string;
}

const VoiceSelection: React.FC<VoiceSelectionProps> = ({
  selectedVoice,
  onVoiceSelect,
  agentGender,
  onGenderChange,
  greetingMessage
}) => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const handlePlayVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate audio playback
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  const currentVoices = VOICE_OPTIONS[agentGender as keyof typeof VOICE_OPTIONS] || VOICE_OPTIONS.female;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-blue-600" />
          <span>Choose Your AI Voice</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gender Selection */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Voice Type</h4>
          <div className="flex space-x-3">
            <Button
              variant={agentGender === 'female' ? 'default' : 'outline'}
              onClick={() => onGenderChange('female')}
              className="flex-1"
            >
              Female Voice
            </Button>
            <Button
              variant={agentGender === 'male' ? 'default' : 'outline'}
              onClick={() => onGenderChange('male')}
              className="flex-1"
            >
              Male Voice
            </Button>
          </div>
        </div>

        {/* Voice Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Select Voice</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentVoices.map((voice) => (
              <div
                key={voice.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedVoice === voice.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onVoiceSelect(voice.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{voice.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {voice.provider}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayVoice(voice.id);
                    }}
                  >
                    {playingVoice === voice.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Message */}
        {greetingMessage && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Preview Message</h4>
            <p className="text-gray-700 text-sm italic">"{greetingMessage}"</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => handlePlayVoice('preview')}
            >
              <Play className="w-3 h-3 mr-1" />
              Listen to Preview
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceSelection;
