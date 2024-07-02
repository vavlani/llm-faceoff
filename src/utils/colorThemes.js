export const colorThemes = {
  earthyBrown: {
    primary: '#8B4513',
    secondary: '#D2B48C',
    background: '#FFF8DC',
    text: '#000000',
    userMessage: '#e6d8cc',
    aiMessage: '#f0f0f0',
  },
  oceanBlue: {
    primary: '#1E90FF',
    secondary: '#87CEFA',
    background: '#F0F8FF',
    text: '#000000',
    userMessage: '#E6F3FF',
    aiMessage: '#F0F8FF',
  },
  nytimesGray: {
    primary: '#121212',
    secondary: '#666666',
    background: '#FFFFFF',
    text: '#333333',
    userMessage: '#F3F3F3',
    aiMessage: '#FFFFFF',
  },
};

export const applyTheme = (theme) => {
  document.documentElement.style.setProperty('--primary-color', theme.primary);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--text-color', theme.text);
  document.documentElement.style.setProperty('--user-message-color', theme.userMessage);
  document.documentElement.style.setProperty('--ai-message-color', theme.aiMessage);
};
