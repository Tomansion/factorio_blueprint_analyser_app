import json, os
from factorio_blueprint_analyser import blueprint_analyser
#############################################################################
# Factorio Blueprint Analyser: Analysis manager
#############################################################################

def ping():
    # Send app version
    # Read version from ../frontend/package.json
    with open('../frontend/package.json') as f:
        version = json.load(f)['version']
    return version, 200

def start(data):
    print(data)
    print("Init analysis...")
    data["parameters"]["displayNetwork"] = False
    blueprint_analyser.init(data["parameters"])
    print("Starting analysis...")
    try:
        res = blueprint_analyser.analyse_blueprint(data["blueprint"])
        print("Analysis done.")
        return res, 200
    except Exception as e:
        print("Analysis failed.")
        print(e)
        return {"error": str(e)}, 400