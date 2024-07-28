from flask import Flask
import yaml

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = r"app\static\uploads"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 megabytes for file upload
with open("app/config.yaml", 'r') as f:
    config = yaml.load(f, Loader=yaml.SafeLoader)
    app.config['SECRET_KEY'] = config['flask_secret_key']

from . import routes
