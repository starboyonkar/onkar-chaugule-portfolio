
import { useState } from 'react';
import { AIAvatar } from './AIAvatar';
import { AIAvatarConfig } from './AIAvatarConfig';

export const AIAvatarWrapper = () => {
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>('');

  return (
    <div className="relative">
      {/* Configuration button in top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        <AIAvatarConfig onApiKeySet={setElevenLabsApiKey} />
      </div>
      
      {/* Main avatar component */}
      <AIAvatar elevenLabsApiKey={elevenLabsApiKey} />
    </div>
  );
};
