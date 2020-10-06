import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)
client = MongoClient('db', 27017)
db = client.tododb


@app.route("/usage")
def get_usage():
    f = open("/procs/so_info", "r")
    response = str(f.read()).split(";")
    f.close()
    return jsonify({
        "ram": response[0],
        "cpu": response[1],
        "database": db.tododb.count()
    })


@app.route("/sentence", methods=["POST"])
def add_sentence():
    sentence = {
        "author": request.json["author"],
        "sentence": request.json["sentence"],
        "date": str(datetime.now())
    }
    sentence_id = db.tododb.insert_one(sentence)
    new_sentence = db.tododb.find_one({"_id": sentence_id.inserted_id})
    result = {
        "author": new_sentence["author"],
        "sentence": new_sentence["sentence"],
        "date": new_sentence["date"]
    }
    return jsonify(result)


@app.route("/sentence", methods=["GET"])
def get_sentences():
    sentences = []
    for sentence in db.tododb.find():
        sentences.append({
            "author": sentence["author"],
            "sentence": sentence["sentence"],
            "date": sentence["date"]
        })
    return jsonify(sentences)


@app.route("/restore", methods=["GET"])
def restore():
    eliminated = db.tododb.delete_many({})
    return jsonify({"deleted": eliminated.deleted_count})
