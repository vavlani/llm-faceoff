import os
from typing import List, Dict, Optional

class ModelConfig:
    def __init__(self, name: str, provider: str, api_key_env: str, initial_message: str):
        self.name = name
        self.provider = provider
        self.api_key_env = api_key_env
        self.initial_message = initial_message

    @property
    def api_key(self) -> Optional[str]:
        return os.getenv(self.api_key_env)

AVAILABLE_MODELS: List[ModelConfig] = [
    ModelConfig(
        name="gpt-4",
        provider="OpenAI",
        api_key_env="OPENAI_API_KEY",
        initial_message="Hello! I'm GPT-4, a large language model. How can I assist you today?"
    ),
    ModelConfig(
        name="gpt-3.5-turbo",
        provider="OpenAI",
        api_key_env="OPENAI_API_KEY",
        initial_message="Hi there! I'm GPT-3.5 Turbo. What can I help you with?"
    ),
    ModelConfig(
        name="claude-2.1",
        provider="Anthropic",
        api_key_env="ANTHROPIC_API_KEY",
        initial_message="Greetings! I'm Claude 2.1, an AI assistant. How may I be of service?"
    ),
    ModelConfig(
        name="claude-instant-1.2",
        provider="Anthropic",
        api_key_env="ANTHROPIC_API_KEY",
        initial_message="Hello! I'm Claude Instant 1.2. How can I assist you today?"
    )
]

def get_model_config(model_name: str) -> ModelConfig:
    for model in AVAILABLE_MODELS:
        if model.name == model_name:
            return model
    raise ValueError(f"Model {model_name} not found in configuration")

def get_available_models() -> List[Dict[str, str]]:
    return [{"name": model.name, "provider": model.provider} for model in AVAILABLE_MODELS]

def validate_api_keys() -> List[str]:
    missing_keys = []
    for model in AVAILABLE_MODELS:
        if not model.api_key:
            missing_keys.append(f"{model.provider} API key ({model.api_key_env})")
    return missing_keys
