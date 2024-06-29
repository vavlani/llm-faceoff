export const removeWindow = (modelToRemove, selectedModels, updateModels) => {
  const updatedModels = selectedModels.filter(model => model.value !== modelToRemove.value);
  updateModels(updatedModels);
};

export const toggleWebAccess = (modelToToggle, selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => 
    model.value === modelToToggle.value ? {...model, webAccess: !model.webAccess} : model
  );
  updateModels(updatedModels);
};

export const sendMessage = (modelToUpdate, message, selectedModels, updateModels) => {
  const newMessage = { text: message, sender: 'user' };
  const aiResponse = { text: `You said: ${message}`, sender: 'ai' };
  const updatedModels = selectedModels.map(model => 
    model.value === modelToUpdate.value ? {...model, messages: [...model.messages, newMessage, aiResponse]} : model
  );
  updateModels(updatedModels);
};

export const updateSelectedModels = (updatedModels, updateModels) => {
  updateModels(updatedModels);
};

export const changeModel = (modelToChange, newModelValue, selectedModels, availableModels, updateModels) => {
  const newModel = availableModels.find(model => model.value === newModelValue);
  const updatedModels = selectedModels.map(model => 
    model.value === modelToChange.value ? {...newModel, messages: model.messages, webAccess: model.webAccess} : model
  );
  updateModels(updatedModels);
};
