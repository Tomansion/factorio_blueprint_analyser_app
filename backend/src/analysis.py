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

def start():
    print(os.getcwd())
    blueprint_analyser.init()
    print("Starting analysis...")
    # print(data)
    # print(data["blueprint"])
    test = "0eNqdmNuO2jAQhl9l5WtnFZ/imDfofe+qVRXABUvBiZzQdrXi3etwEhQ7zHCFAuGb8T/H5Iss273tg/MjWXyRwTd9MXbFJrj1dP2XLJik5DN+sAMlbtX5gSx+xBvdxjftdMv42VuyIG60O0KJb3bTVTMMdrdsnd8Uu2a1dd4WnEwAv7YT80CfIsbQ+KHvwlgsbTve/JkfPiixfnSjsydnjhefP/1+t7Qh0ufcYNFC3w3xz52/nPBdnY74rqKVYFeuTzrwYIhfDbVdNLFtooPrwvnBhjH+/mBIng2VR0NrF02dfq0ScHGFD7umbQvbxruDWxV919pHtrhje+s222W3D5NAFWX8I2FBXi38aoZxxm9xJ9CN3zxBVbkIZuWYsAlQhRNA5QUQlOmUABoqgMoJkApcjUw/nU6/o0vPc9BAz3DJcvH/GWSCysordh+TOmxCFz+fxJEfyedi7vZjv096zBg4Q8ozWUISj3FcwlwEUemEoUKlcoYJsPcc5b0EcxmKi69HGLcCcwWKq3FRrPJRjAlRUc6pMMlA1uADKNQBDJhbYbi8BHNrFBdejhrFRZajmQmkplxRWabCyOH1yFDthMML0qC4CtmmeF6YY3JTKZLCwAuUoToK13AwqgXyen5/zDZCfT85Xeh8sbFNKP5srW2Tm5vB7j4atLO9Mjar27HpfGZqCobu4zq9VwmOlLl6WWYhkKbM66YkNnn467aQJXyxZJIzKj2eRIWOd52Jt0aTTIZUQ6umegIyOAH1jIDH2SBy40GWyG5b5k3NdVvJoNKYeWkkBy/0/AkJ+QTJxMzRs/pK/ONemfFXoRcnBnqSlhV60wOCNXolA4Jr9E4GBBv8tgQjqxK9LgHBDL/HAMkcv8ikyB/09OpqcfMujZK2iaj43fdvrW2WrX0Ldv12pv+2YTitQTWT2nAtjZJaicPhH98UY0Y="
    # res = blueprint_analyser.analyse_blueprint(data["blueprint"])
    res = blueprint_analyser.analyse_blueprint(test)
    print("Analysis complete.")
    return res, 200