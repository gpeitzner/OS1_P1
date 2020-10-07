import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

serverA = "http://18.188.146.17:5000/"
serverB = "http://52.15.159.171:5000/"


@app.route("/sentence", methods=["POST"])
def add_sentence():
    sentence = {
        "author": request.json["author"],
        "sentence": request.json["sentence"]
    }
    r_server1 = requests.get(serverA+"usage")
    r_server2 = requests.get(serverB+"usage")
    if r_server1.status_code == 404:
        r = requests.post(serverB+"sentence", json=sentence)
        return jsonify({"server": "B", "filter": "down", "data": r.json()})
    if r_server2.status_code == 404:
        r = requests.post(serverA+"sentence", json=sentence)
        return jsonify({"server": "A", "filter": "down", "data": r.json()})
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
