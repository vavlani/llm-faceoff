export const initialSettings = {
  darkMode: false,
  fontSize: 'medium',
};

export const applySettings = (settings) => {
  document.body.classList.toggle('dark-mode', settings.darkMode);
  document.body.style.fontSize = getFontSize(settings.fontSize);
};

const getFontSize = (size) => {
  switch (size) {
    case 'small':
      return '12px';
    case 'large':
      return '16px';
    default:
      return '14px';
  }
};
