from flask import Blueprint, jsonify, request
from services import chat_service
from config.model_config import get_available_models

bp = Blueprint('api', __name__)

@bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    model_name = data.get('model', 'gpt-3.5-turbo')
    
    # Ensure there's at least one message
    if not messages:
        messages = [{"role": "system", "content": "You are a helpful assistant."}]
    
    result = chat_service.process_message(messages, model_name)
    return jsonify(result)

@bp.route('/api/models', methods=['GET'])
def get_models():
    models = get_available_models()
    return jsonify(models)

@bp.route('/api/test', methods=['GET'])
def test_api():
    model_name = request.args.get('model', 'gpt-3.5-turbo')
    result = chat_service.test_api_call(model_name)
    return jsonify(result)

# Add other routes as needed
