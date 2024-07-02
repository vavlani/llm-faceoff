import { colorThemes, applyTheme } from './colorThemes';

export const initialSettings = {
  darkMode: false,
  theme: 'earthyBrown',
};

export const applySettings = (settings) => {
  document.body.classList.toggle('dark-mode', settings.darkMode);
  applyTheme(colorThemes[settings.theme]);
};
