from flask import Blueprint, jsonify, request
from services import chat_service

bp = Blueprint('api', __name__)

@bp.route('/api/chat', methods=['POST'])
def chat():
    # Implement chat endpoint
    pass

@bp.route('/api/models', methods=['GET'])
def get_models():
    # Implement get models endpoint
    pass

@bp.route('/api/test', methods=['GET'])
def test_api():
    model_name = request.args.get('model', 'gpt-3.5-turbo')
    result = chat_service.test_api_call(model_name)
    return jsonify(result)

# Add other routes as needed
