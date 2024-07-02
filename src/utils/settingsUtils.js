import { colorThemes, applyTheme } from './colorThemes';

export const initialSettings = {
  theme: 'whisperSlate',
};

export const applySettings = (settings) => {
  applyTheme(colorThemes[settings.theme]);
};
