import React from 'react';
import Select from 'react-select';
import { allModels } from '../utils/modelData';

const ModelSelector = ({ selectedModels, setSelectedModels }) => {
  return (
    <Select
      isMulti
      name="models"
      options={allModels}
      className="basic-multi-select"
      classNamePrefix="select"
      value={selectedModels}
      onChange={(selected) => setSelectedModels(selected.map(option => ({
        ...option,
        messages: option.messages || [{ text: option.initialMessage, sender: 'ai' }],
        webAccess: false
      })))}
      placeholder="Select models..."
    />
  );
};

export default ModelSelector;
