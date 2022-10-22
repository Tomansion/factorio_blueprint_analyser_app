import connexion
import os
from flask_cors import CORS
from flask import send_from_directory, request
from flask.wrappers import Response
import requests

DEV_FRONTEND_URL = "http://localhost:8080/"
BACK_PORT = 3000

app = connexion.App(__name__)
app.add_api('swagger.yaml', strict_validation=True)
CORS(app.app)


def send_frontend(path):
    if path == '/':
        path = 'index.html'

    # If production, use the index.html from the dist folder
    if os.getenv('FLASK_ENV') == 'production':
        return send_from_directory('dist', path)

    # In development, redirect to the DEV_FRONTEND_URL
    else:
        if request.method == "GET":
            try:
                resp = requests.get(f"{DEV_FRONTEND_URL}{path}")
                excluded_headers = [
                    "content-encoding", "content-length", "transfer-encoding", "connection"]
                headers = [(name, value) for (name, value) in resp.raw.headers.items(
                ) if name.lower() not in excluded_headers]
                response = Response(resp.content, resp.status_code, headers)
                return response
            except (requests.exceptions.ConnectionError, requests.exceptions.Timeout):
                return "You are in a development environment and the frontend is not available at the url : " + DEV_FRONTEND_URL, 503


# For serving the dashboard
@app.route('/')
def send_index():
    return send_frontend('/')


@app.route('/analysispage')
def send_index_2():
    return send_frontend('/')


# For serving the dashboard assets
@app.route('/<path:path>')
def send_supporting_elmt(path):
    return send_frontend(path)


if __name__ == '__main__':
    # Run DebiAI init
    # debiaiUtils.init()

    print("App running : http://localhost:{}".format(BACK_PORT))
    app.run(port=BACK_PORT, debug=True)
