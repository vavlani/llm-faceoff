import { colorThemes, applyTheme } from './colorThemes';

export const initialSettings = {
  theme: 'nytimesGray',
};

export const applySettings = (settings) => {
  applyTheme(colorThemes[settings.theme]);
};
