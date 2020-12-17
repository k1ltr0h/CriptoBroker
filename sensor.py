import requests
import random
import time
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

while True:
    if tp == 0:
        celsius = random.randrange(15,40)
        data = "Temperature Sensor[°C]: "+str(celsius)

    elif tp == 1:
        rh = random.randrange(0,100)
        data = "Humidity Sensor[%RH]: "+str(rh)

    elif tp == 2:
        ph = random.randrange(0,14)
        data = "PH Sensor: "+str(ph)

    elif tp == 3:
        kpa = random.randrange(0, 1200)
        data = "Pressure Sensor[KPa]: "+str(kpa)
    elif tp == 4:
        uv = random.randrange(0, 11)
        data = "UV Sensor: "+str(uv)

    data = data.encode("utf-8")

    key = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(data)

    print("Cifrado: ",ciphertext, "- Nonce: ",cipher.nonce, "\n") # data cifrado, numero de autenticacion

    # let's assume that the key is somehow available again
    cipher = AES.new(key, AES.MODE_EAX, cipher.nonce) #nonce)
    data = cipher.decrypt_and_verify(ciphertext, tag)

    url = 'https://www.w3schools.com/python/demopage.php'
    myobj = {'data': data.decode("utf-8") }

    x = requests.post(url, json = myobj)

    print(x.text, myobj)

    time.sleep(5)