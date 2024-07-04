from flask import Flask, send_from_directory
from flask_cors import CORS
from config.config import Config
from routes import api
import os

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(api.bp)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)
