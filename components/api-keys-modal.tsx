'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { getOpenAIApiKey, setOpenAIApiKey, getFinancialDatasetsApiKey, setFinancialDatasetsApiKey } from '@/lib/db/api-keys';

interface ApiKeysModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiKeysModal({ open, onOpenChange }: ApiKeysModalProps) {
  const [openAIKey, setOpenAIKey] = useState(getOpenAIApiKey() || '');
  const [financialKey, setFinancialKey] = useState(getFinancialDatasetsApiKey() || '');
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [showFinancialKey, setShowFinancialKey] = useState(false);

  const handleSave = async () => {
    await setOpenAIApiKey(openAIKey);
    await setFinancialDatasetsApiKey(financialKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure API keys</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="openai-key" className="text-sm font-medium">
              OpenAI API Key
            </label>
            <div className="relative">
              <Input
                id="openai-key"
                type={showOpenAIKey ? "text" : "password"}
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
                placeholder="sk-..."
              />
              <button
                type="button"
                onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showOpenAIKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://platform.openai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                platform.openai.com
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="financial-key" className="text-sm font-medium">
              Financial Datasets API Key
            </label>
            <div className="relative">
              <Input
                id="financial-key"
                type={showFinancialKey ? "text" : "password"}
                value={financialKey}
                onChange={(e) => setFinancialKey(e.target.value)}
                placeholder="Enter your Financial Datasets API key"
              />
              <button
                type="button"
                onClick={() => setShowFinancialKey(!showFinancialKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showFinancialKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://financialdatasets.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                financialdatasets.ai
              </a>
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 