export const removeWindow = (modelToRemove, selectedModels, setSelectedModels) => {
  setSelectedModels(prevModels => prevModels.filter(model => model.value !== modelToRemove.value));
};

export const toggleWebAccess = (modelToToggle, selectedModels, setSelectedModels) => {
  setSelectedModels(prevModels => prevModels.map(model => 
    model.value === modelToToggle.value ? {...model, webAccess: !model.webAccess} : model
  ));
};

export const sendMessage = (modelToUpdate, message, selectedModels, setSelectedModels) => {
  const newMessage = { text: message, sender: 'user' };
  const aiResponse = { text: `You said: ${message}`, sender: 'ai' };
  setSelectedModels(prevModels => prevModels.map(model => 
    model.value === modelToUpdate.value ? {...model, messages: [...model.messages, newMessage, aiResponse]} : model
  ));
};
