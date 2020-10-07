import requests
import random

data = []
load_balancer_address = None
users = ["User1", "User2", "User3", "User4", "User5"]


def send_data():
    print("")
    print(load_balancer_address)
    if data:
        if load_balancer_address:
            for sentence in data:
                try:
                    r = requests.post(load_balancer_address, json=sentence)
                    print("RESULT: ", r.json())
                except:
                    print("ERROR: sending sentence ", sentence)
        else:
            print("ERROR: load balancer not defined")
    else:
        print("ERROR: data not loaded")


def show_data():
    print("")
    if data:
        for sentence in data:
            print(sentence)
    else:
        print("ERROR: data not loaded")


def insert_load_balancer_address():
    print("")
    print("ENTER LOAD BALANCER ADDRESS:")
    global load_balancer_address
    load_balancer_address = input()


def insert_file_path():
    print("")
    print("ENTER FILE PATH:")
    file_path = input()
    try:
        f = open(str(file_path), "r")
        file_data = f.read()
        file_data = file_data.split(". ")
        data.clear()
        for sentence in file_data:
            data.append(
                {"author": users[random.randint(0, 4)], "sentence": sentence})
    except:
        data.clear()
        print("ERROR: invalid file path")


def header():
    print("██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗     ██╗")
    print("██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝    ███║")
    print("██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║       ╚██║")
    print("██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║        ██║")
    print("██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║        ██║")
    print("╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝        ╚═╝")
    print("Guillermo Alfredo Peitzner Estrada - 201504468.")


def menu():
    header()
    while(True):
        print("")
        print("1. Insert file path")
        print("2. Insert load balancer address")
        print("3. Show data")
        print("4. Send data")
        print("5. Exit")
        print("ENTER OPTION:")
        option = input()
        if option == "1":
            insert_file_path()
        elif option == "2":
            insert_load_balancer_address()
        elif option == "3":
            show_data()
        elif option == "4":
            send_data()
        elif option == "5":
            break
        else:
            print("ERROR: invalid option")


if __name__ == "__main__":
    menu()
