from flask import Flask
from flask_cors import CORS
from config.config import Config
from routes import api

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(api.bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)
