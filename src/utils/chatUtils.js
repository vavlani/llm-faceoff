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
  const updatedModels = selectedModels.map(model => 
    model.value === modelToUpdate.value ? {
      ...model, 
      messages: [
        ...model.messages, 
        { text: message, sender: 'user' },
        { text: `You said: ${message}`, sender: 'ai' }
      ]
    } : model
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

export const copyToAllInputs = (input, selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => ({
    ...model,
    currentInput: input
  }));
  updateModels(updatedModels);
};

export const sendFromIndividualInputs = (selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => {
    if (model.currentInput && model.currentInput.trim()) {
      return {
        ...model,
        messages: [
          ...model.messages,
          { text: model.currentInput, sender: 'user' },
          { text: `You said: ${model.currentInput}`, sender: 'ai' }
        ],
        currentInput: ''
      };
    }
    return model;
  });
  updateModels(updatedModels);
};

export const updateIndividualInput = (modelToUpdate, input, selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => 
    model.value === modelToUpdate.value ? { ...model, currentInput: input } : model
  );
  updateModels(updatedModels);
};
