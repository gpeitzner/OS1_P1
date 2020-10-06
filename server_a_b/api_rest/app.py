import os
from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('db', 27017)
db = client.tododb


@app.route('/usage')
def usage():
    f = open("/procs/so_info", "r")
    response = str(f.read()).split(";")
    f.close()
    return jsonify({
        "ram": response[0],
        "cpu": response[1]
    })
