// This file contains utility functions for managing chat-related operations
// such as removing chat windows, toggling web access, sending messages,
// and updating model selections.

import axios from 'axios';

const API_URL = 'http://localhost:5050/api';

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
export const sendMessage = async (modelToUpdate, message, selectedModels, updateModels) => {
  try {
    const updatedModels = selectedModels.map(model => 
      model.value === modelToUpdate.value ? {
        ...model, 
        messages: [
          ...model.messages, 
          { text: message, sender: 'human' }
        ]
      } : model
    );
    updateModels(updatedModels);

    const response = await axios.post(`${API_URL}/chat`, {
      messages: [{ role: 'user', content: message }],
      model: modelToUpdate.value
    });

    const aiResponse = response.data.choices[0].message.content;

    const finalUpdatedModels = selectedModels.map(model => 
      model.value === modelToUpdate.value ? {
        ...model, 
        messages: [
          ...model.messages, 
          { text: aiResponse, sender: 'ai' }
        ]
      } : model
    );
    updateModels(finalUpdatedModels);
  } catch (error) {
    console.error('Error sending message:', error);
    // Handle error (e.g., show an error message to the user)
  }
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
export const sendFromIndividualInputs = async (selectedModels, updateModels) => {
  const updatedModels = await Promise.all(selectedModels.map(async (model) => {
    if (model.currentInput && model.currentInput.trim()) {
      try {
        const response = await axios.post(`${API_URL}/chat`, {
          messages: [{ role: 'user', content: model.currentInput }],
          model: model.value
        });

        const aiResponse = response.data.choices[0].message.content;

        return {
          ...model,
          messages: [
            ...model.messages,
            { text: model.currentInput, sender: 'human' },
            { text: aiResponse, sender: 'ai' }
          ],
          currentInput: ''
        };
      } catch (error) {
        console.error(`Error sending message for model ${model.value}:`, error);
        // Handle error (e.g., add an error message to the chat)
        return {
          ...model,
          messages: [
            ...model.messages,
            { text: model.currentInput, sender: 'human' },
            { text: 'Error: Unable to get response from the server.', sender: 'ai' }
          ],
          currentInput: ''
        };
      }
    }
    return model;
  }));

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
