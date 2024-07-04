import os
from typing import List, Dict, Optional

class ModelConfig:
    def __init__(self, name: str, provider: str, api_key_env: str, initial_message: str, 
    max_tokens: int = 1000, temperature: float = 0.7, system_message: str = ""):
        self.name = name
        self.provider = provider
        self.api_key_env = api_key_env
        self.initial_message = initial_message
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.system_message = system_message

    @property
    def api_key(self) -> Optional[str]:
        key = os.getenv(self.api_key_env)
        if not key and self.provider.lower() == 'google':
            key = os.getenv('GOOGLE_API_KEY')  # Fallback to GOOGLE_API_KEY
        return key

AVAILABLE_MODELS: List[ModelConfig] = [
    ModelConfig(
        name="gpt-4o",
        provider="OpenAI",
        api_key_env="OPENAI_API_KEY",
        initial_message="Hello! I'm GPT-4, a large language model. How can I assist you today?",
        max_tokens=1000,
        temperature=0.7,
        system_message="You are GPT-4, a large language model trained by OpenAI. Always strive to be helpful, harmless, and honest."
    ),
    ModelConfig(
        name="gpt-3.5-turbo",
        provider="OpenAI",
        api_key_env="OPENAI_API_KEY",
        initial_message="Hi there! I'm GPT-3.5 Turbo. What can I help you with?",
        max_tokens=1000,
        temperature=0.7,
        system_message="You are GPT-3.5 Turbo, a helpful AI assistant created by OpenAI. Provide concise and accurate responses."
    ),
    ModelConfig(
        name="claude-3-5-sonnet-20240620",
        provider="Anthropic",
        api_key_env="ANTHROPIC_API_KEY",
        initial_message="Greetings! I'm Claude 3.5 Sonnet. How may I be of service?",
        max_tokens=1000,
        temperature=0.7,
        system_message="You are Claude 3.5 Sonnet, an AI assistant created by Anthropic to be helpful, harmless, and honest."
    ),
    ModelConfig(
        name="claude-3-haiku-20240307",
        provider="Anthropic",
        api_key_env="ANTHROPIC_API_KEY",
        initial_message="Hello! I'm Claude 3 Haiku. How can I assist you today?",
        max_tokens=1000,
        temperature=0.7,
        system_message="You are Claude 3 Haiku, a concise and efficient AI assistant created by Anthropic. Provide brief but informative responses."
    ),
    ModelConfig(
        name="gemini-1.5-pro",
        provider="Google",
        api_key_env="GOOGLE_API_KEY",
        initial_message="Hello! I'm Gemini 1.5 Pro. How can I assist you today?",
        max_tokens=1000,
        temperature=0.7,
        system_message="You are an LLM from Google. Provide brief but informative responses."
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
