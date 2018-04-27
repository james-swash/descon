#!/usr/bin/python
import sys
from time import sleep
import Adafruit_DHT
import Adafruit_BMP.BMP085 as BMP085

sensor = BMP085.BMP085()




while True:
	contents = "["
	humidity, temperature = Adafruit_DHT.read_retry(11, 4)
	contents += '{0:0.2f}*C, '.format(sensor.read_temperature()) #Temp
	contents += '{0:0.2f}Pa, '.format(sensor.read_pressure()) #Pressure
	contents += '{0:0.2f}m, '.format(sensor.read_altitude()) #Altitude
	contents += '{0:0.2f}Pa, '.format(sensor.read_sealevel_pressure()) #sealevel pressure
	contents += '{0:0.1f}%]'.format(humidity) # humidity
	temp_file = open('../temperature.txt', 'w')
	print(contents)
	temp_file.write(contents)
	temp_file.close()
	sleep(5)
