import { colorThemes, applyTheme } from './colorThemes';

export const initialSettings = {
  theme: 'whisperSlate',
  apiKeys: {
    claude: '',
    huggingface: '',
    gemini: '',
    perplexity: '',
    bing: ''
  }
};

export const applySettings = (settings) => {
  applyTheme(colorThemes[settings.theme]);
  // You might want to add logic here to securely store API keys
};
