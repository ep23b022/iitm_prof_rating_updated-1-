from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

DATA_FILE = "prof_data.json"

def load_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

@app.route("/professors", methods=["GET"])
def get_professors():
    return jsonify(load_data())

@app.route("/vote", methods=["POST"])
def vote():
    data = request.get_json()
    name = data["name"]
    value = data["value"]
    profs = load_data()

    for prof in profs:
        if prof["name"] == name:
            prof["score"] += value
            break
    save_data(profs)
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)
