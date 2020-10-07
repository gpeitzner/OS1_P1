import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

serverA = "http://18.222.150.51:5000/"
serverB = "http://3.14.28.178:5000/"


@app.route("/sentence", methods=["POST"])
def add_sentence():
    sentence = {
        "author": request.json["author"],
        "sentence": request.json["sentence"]
    }
    try:
        r_server1 = requests.get(serverA+"usage")
    except:
        try:
            r = requests.post(serverB+"sentence", json=sentence)
            return jsonify({"server": "B", "filter": "down", "data": r.json()})
        except:
            return jsonify({"message": "down"})
    try:
        r_server2 = requests.get(serverB+"usage")
    except:
        try:
            r = requests.post(serverA+"sentence", json=sentence)
            return jsonify({"server": "A", "filter": "down", "data": r.json()})
        except:
            return jsonify({"message": "down"})
    r_dictionary_server1 = r_server1.json()
    r_dictionary_server2 = r_server2.json()
    if r_dictionary_server1["database"] > r_dictionary_server2["database"]:
        r = requests.post(serverB+"sentence", json=sentence)
        return jsonify({"server": "B", "filter": "database", "data": r.json()})
    elif r_dictionary_server1["database"] < r_dictionary_server2["database"]:
        r = requests.post(serverA+"sentence", json=sentence)
        return jsonify({"server": "A", "filter": "database", "data": r.json()})
    else:
        if r_dictionary_server1["ram"] > r_dictionary_server2["ram"]:
            r = requests.post(serverB+"sentence", json=sentence)
            return jsonify({"server": "B", "filter": "ram", "data": r.json()})
        elif r_dictionary_server1["ram"] < r_dictionary_server2["ram"]:
            r = requests.post(serverA+"sentence", json=sentence)
            return jsonify({"server": "A", "filter": "ram", "data": r.json()})
        else:
            if r_dictionary_server1["cpu"] > r_dictionary_server2["cpu"]:
                r = requests.post(serverB+"sentence", json=sentence)
                return jsonify({"server": "B", "filter": "cpu", "data": r.json()})
            elif r_dictionary_server1["cpu"] > r_dictionary_server2["cpu"]:
                r = requests.post(serverA+"sentence", json=sentence)
                return jsonify({"server": "A", "filter": "cpu", "data": r.json()})
            else:
                r = requests.post(serverA+"sentence", json=sentence)
                return jsonify({"server": "A", "filter": "A", "data": r.json()})
