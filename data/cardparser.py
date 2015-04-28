#! /user/bin/python

# script to take MTG JSON files, strip out the cards array and right them to their own files.
import json
from pprint import pprint
import os
import sys

dir_name = "allsetsx";

print "Writing new cards files",

for filename in os.listdir(dir_name):
    print ".", # loading...
    
    # new file will be renamed with "-cards"
    new_card_filename = dir_name + "-cards/" + filename.replace("-x", "-cards");
    filepath = dir_name + "/" + filename;
    
    # open the json data in the and extract the "cards" array as a string
    json_data = open(filepath);
    data = json.load(json_data);
    json_data.close();
    
    set_name = filename.replace("-x.json", "");
    
    for card in data["cards"]:
        card["set"] = set_name;
        
    cards_string = json.dumps(data["cards"]);
    
    cards_string = "[" + cards_string + "]";
    
    # remove unneccessary array notation if required
    if cards_string.startswith('[') and cards_string.endswith(']'):
        cards_string = cards_string[1:-1];
    
    # write card data to the new file
    f =  open(new_card_filename, 'w');
    f.write(cards_string);
    f.close();
    
print "\n";