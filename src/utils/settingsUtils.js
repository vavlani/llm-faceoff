export const initialSettings = {
  darkMode: false,
};

export const applySettings = (settings) => {
  document.body.classList.toggle('dark-mode', settings.darkMode);
};
