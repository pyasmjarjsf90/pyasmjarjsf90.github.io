import json
CONFIG=json.loads(open("config.json","r"))
print(CONFIG["text"])