from flask import Flask
from flask_cors import CORS
from config import Config
from routes import api

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(api.bp)

if __name__ == '__main__':
    app.run(debug=True)
