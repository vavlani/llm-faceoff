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
    primary: '#4A4A4A',
    secondary: '#8A8A8A',
    background: '#F5F5F5',
    text: '#5A5A5A',
    userMessage: '#E8E8E8',
    aiMessage: '#F0F0F0',
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
