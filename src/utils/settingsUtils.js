import { colorThemes, applyTheme } from './colorThemes';

export const initialSettings = {
  theme: 'earthyBrown',
};

export const applySettings = (settings) => {
  applyTheme(colorThemes[settings.theme]);
};
