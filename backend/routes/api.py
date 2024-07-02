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

# Add other routes as needed
