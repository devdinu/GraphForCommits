import json

def extract_data():
	w_data = [['data1',1,2,3,4],['data2',50,20,10,40,15,25]]
	print(json.dumps(w_data))

extract_data()
