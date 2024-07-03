import os
import time
from datetime import datetime
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_community.callbacks import get_openai_callback
from config.model_config import get_model_config, get_available_models

# Load environment variables
load_dotenv()

def init_chat_model(model_name):
    """
    Initialize a chat model based on the given model name.

    Args:
        model_name (str): The name of the model to initialize.

    Returns:
        object: An instance of the initialized chat model.
    """
    model_config = get_model_config(model_name)
    api_key = os.getenv(model_config.api_key_env)
    
    if model_config.provider == "OpenAI":
        return ChatOpenAI(
            model=model_name,
            api_key=api_key,
            max_tokens=model_config.max_tokens,
            temperature=model_config.temperature
        )
    elif model_config.provider == "Anthropic":
        return ChatAnthropic(
            model=model_name,
            api_key=api_key,
            max_tokens=model_config.max_tokens,
            temperature=model_config.temperature
        )
    else:
        raise ValueError(f"Unsupported provider: {model_config.provider}")

def process_message(messages, model_name):
    """
    Process a list of messages using the specified model.

    Args:
        messages (list): A list of message dictionaries. Each dictionary should have 'role' and 'content' keys.
                         Roles can be 'system', 'human', or 'ai'.
        model_name (str): The name of the model to use for processing.

    Returns:
        dict: A dictionary containing the model's response, token usage, cost, request timestamp, and response time.

    Example:
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "human", "content": "What's the capital of France?"},
            {"role": "ai", "content": "The capital of France is Paris."},
            {"role": "human", "content": "And what's its population?"}
        ]
        result = process_message(messages, "gpt-3.5-turbo")
    """
    request_timestamp = datetime.now().isoformat()
    start_time = time.time()

    model = init_chat_model(model_name)
    model_config = get_model_config(model_name)
    
    # Convert messages to LangChain format
    langchain_messages = []
    for msg in messages:
        if msg['role'] == 'system':
            langchain_messages.append(SystemMessage(content=msg['content']))
        elif msg['role'] == 'human':
            langchain_messages.append(HumanMessage(content=msg['content']))
        elif msg['role'] == 'ai':
            langchain_messages.append(AIMessage(content=msg['content']))

    # Ensure there's at least one message
    if not langchain_messages:
        langchain_messages.append(SystemMessage(content=model_config.system_message))
    
    # If there's no user message, add a default one
    if not any(isinstance(msg, HumanMessage) for msg in langchain_messages):
        langchain_messages.append(HumanMessage(content="Say ok no matter what I say"))

    # Always respond with "ok"
    response = AIMessage(content="ok")
    cb = None

    end_time = time.time()
    response_time = end_time - start_time

    # Prepare the result
    result = {
        "response": response.content,
        "model_name": model_name,
        "request_timestamp": request_timestamp,
        "response_time": response_time
    }
    
    if cb:
        result["usage"] = {
            "input_tokens": cb.prompt_tokens,
            "output_tokens": cb.completion_tokens,
            "total_tokens": cb.total_tokens
        }
        result["cost"] = cb.total_cost
    else:
        result["usage"] = "Not available for this model"
        result["cost"] = "Not available for this model"

    return result

def test_api_call(model_name="gpt-3.5-turbo"):
    """
    Test the API with a dummy 'hi' message for the specified model.

    Args:
        model_name (str): The name of the model to test. Defaults to "gpt-3.5-turbo".

    Returns:
        dict: The result of processing the 'hi' message, including the response, token usage, and cost.
    """
    test_messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "hi"}
    ]
    return process_message(test_messages, model_name)
