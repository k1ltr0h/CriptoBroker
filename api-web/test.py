import mysql.connector  
  
#Create the connection object   
myconn = mysql.connector.connect(host = "192.168.64.2", user = "chris",passwd = "Wertaste11")  
  
#printing the connection object   
print(myconn)  