import time

from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    f = open("/procs/so_info", "r")
    response = f.read()
    f.close()
    return response
