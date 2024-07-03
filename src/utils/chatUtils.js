// This file contains utility functions for managing chat-related operations
// such as removing chat windows, toggling web access, sending messages,
// and updating model selections.

/**
 * Removes a chat window for a specific model
 * @param {Object} modelToRemove - The model to remove
 * @param {Array} selectedModels - Current list of selected models
 * @param {Function} updateModels - Function to update the models state
 */
export const removeWindow = (modelToRemove, selectedModels, updateModels) => {
  const updatedModels = selectedModels.filter(model => model.value !== modelToRemove.value);
  updateModels(updatedModels);
};

/**
 * Toggles web access for a specific model
 * @param {Object} modelToToggle - The model to toggle web access for
 * @param {Array} selectedModels - Current list of selected models
 * @param {Function} updateModels - Function to update the models state
 */
export const toggleWebAccess = (modelToToggle, selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => 
    model.value === modelToToggle.value ? {...model, webAccess: !model.webAccess} : model
  );
  updateModels(updatedModels);
};

/**
 * Sends a message for a specific model and updates the chat history
 * @param {Object} modelToUpdate - The model to send the message for
 * @param {string} message - The message to send
 * @param {Array} selectedModels - Current list of selected models
 * @param {Function} updateModels - Function to update the models state
 */
export const sendMessage = (modelToUpdate, message, selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => 
    model.value === modelToUpdate.value ? {
      ...model, 
      messages: [
        ...model.messages, 
        { text: message, sender: 'human' },
        { text: `You said: ${message}`, sender: 'ai' }
      ]
    } : model
  );
  updateModels(updatedModels);
};

/**
 * Updates the list of selected models
 * @param {Array} updatedModels - The new list of selected models
 * @param {Function} updateModels - Function to update the models state
 */
export const updateSelectedModels = (updatedModels, updateModels) => {
  updateModels(updatedModels);
};

/**
 * Changes a selected model to a new model
 * @param {Object} modelToChange - The model to be changed
 * @param {string} newModelValue - The value of the new model
 * @param {Array} selectedModels - Current list of selected models
 * @param {Array} availableModels - List of all available models
 * @param {Function} updateModels - Function to update the models state
 */
export const changeModel = (modelToChange, newModelValue, selectedModels, availableModels, updateModels) => {
  const newModel = availableModels.find(model => model.value === newModelValue);
  const updatedModels = selectedModels.map(model => 
    model.value === modelToChange.value ? {...newModel, messages: model.messages, webAccess: model.webAccess} : model
  );
  updateModels(updatedModels);
};

/**
 * Copies the input to all selected models
 * @param {string} input - The input to copy
 * @param {Array} selectedModels - Current list of selected models
 * @param {Function} updateModels - Function to update the models state
 */
export const copyToAllInputs = (input, selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => ({
    ...model,
    currentInput: input
  }));
  updateModels(updatedModels);
};

/**
 * Sends messages from individual inputs for each selected model
 * @param {Array} selectedModels - Current list of selected models
 * @param {Function} updateModels - Function to update the models state
 */
export const sendFromIndividualInputs = (selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => {
    if (model.currentInput && model.currentInput.trim()) {
      return {
        ...model,
        messages: [
          ...model.messages,
          { text: model.currentInput, sender: 'human' },
          { text: `You said: ${model.currentInput}`, sender: 'ai' }
        ],
        currentInput: ''
      };
    }
    return model;
  });
  updateModels(updatedModels);
};

/**
 * Updates the input for a specific model
 * @param {Object} modelToUpdate - The model to update the input for
 * @param {string} input - The new input value
 * @param {Array} selectedModels - Current list of selected models
 * @param {Function} updateModels - Function to update the models state
 */
export const updateIndividualInput = (modelToUpdate, input, selectedModels, updateModels) => {
  const updatedModels = selectedModels.map(model => 
    model.value === modelToUpdate.value ? { ...model, currentInput: input } : model
  );
  updateModels(updatedModels);
};
