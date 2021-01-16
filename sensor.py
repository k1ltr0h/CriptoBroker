import requests
import random
import time
import codecs
import json
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes


print("\n \
       ###################################CriptoBroker-Proyect############################################\n \
       ###                                                                                             ###\n \
       ###              Sensor emulation and data encription with AES and eliptic curves.              ###\n \
       ###                                 Post data to API                                            ###\n \
       ###                                                                                             ###\n \
       ###################################CriptoBroker-Proyect############################################\n \
       \n")

while True:

    print("\n What type of sensor you want?\n \
        [0] Temperature\n \
        [1] Humidity\n \
        [2] PH\n \
        [3] Pressure\n \
        [4] UV\n")
    
    try:
        tp = int(input("Select your type of sensor [0-4]: "))
        if tp < 0 or tp > 4:
            continue
        else:
            break
    except:
        continue

key = get_random_bytes(16)

while True:
    if tp == 0:
        celsius = random.randrange(15,40)
        id_sensor = "0"
        data = "Temperature Sensor[Celsius]: "+str(celsius)

    elif tp == 1:
        rh = random.randrange(0,100)
        id_sensor = "1"
        data = "Humidity Sensor[%RH]: "+str(rh)

    elif tp == 2:
        ph = random.randrange(0,14)
        id_sensor = "2"
        data = "PH Sensor: "+str(ph)

    elif tp == 3:
        kpa = random.randrange(0, 1200)
        id_sensor = "3"
        data = "Pressure Sensor[KPa]: "+str(kpa)
    elif tp == 4:
        uv = random.randrange(0, 11)
        id_sensor = "4"
        data = "UV Sensor: "+str(uv)


    iv = get_random_bytes(16)
    data = data.encode("utf-8")
    id_sensor = id_sensor.encode("utf-8")

    ciphertext = AES.new(key, AES.MODE_OFB, iv).decrypt(data)
    cipherid = AES.new(key, AES.MODE_OFB, iv).decrypt(id_sensor)
    #ciphertext, tag = cipher.encrypt_and_digest(data)
    
    #codecs.encode(ciphertext, 'rot_13')

    print("Cifrado: ",ciphertext, " IV: ", iv)#, "- Nonce: ",cipher.nonce, "\n") # data cifrado, numero de autenticacion

    # let's assume that the key is somehow available again
    data = AES.new(key, AES.MODE_OFB, iv).decrypt(ciphertext)# cipher.nonce) #nonce)
    id = AES.new(key, AES.MODE_OFB, iv).decrypt(cipherid)
    #data = cipher.decrypt_and_verify(ciphertext, tag)

    print(data, id)

    url = 'http://localhost:5238/add/data'
    headers = {'content-type': 'application/json'}
    myobj = {
        "id_sensor": str(cipherid),
        'lectura': str(ciphertext),
        "token": str(iv)}
    
    try:

        x = requests.post(url, data = json.dumps(myobj), headers = headers)

        print(x.text, myobj)

    except:
        print("No se ha podido enviar la información")

    time.sleep(5)