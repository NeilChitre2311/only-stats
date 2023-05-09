import pymongo
import pandas as pd
import json

def mongoimport(csv_path, db_name, collection_name, db_url='localhost', db_port=27017):
    """ Imports a csv file at path csv_name to a mongo colection
    returns: count of the documants in the new collection
    """
    client = pymongo.MongoClient(db_url)
    db = client[db_name]
    collist = db.list_collection_names()
    if collection_name in collist:
        coll = db[collection_name]
        coll.drop()
        print('collection dropped')
    coll = db[collection_name]
    data = pd.read_csv(csv_path)
    payload = json.loads(data.to_json(orient='records'))
    coll.insert_many(payload)
    print(f'{len(data)} rows inserted')
    
if __name__ == "__main__":
    csv_path = 'data/football_rec/player_stats_processed.csv'
    bball_salary_path = 'data/basketball_rec/nba_salary_pred_data_v1.csv'
    db_name = 'alpha_sport'
    collection_name = 'football_players'
    collection_name_bballSalary = 'nba_players'
    mongo_atlas_uri = "mongodb+srv://admin:ddsgrp10@grp10-c1.h89by.mongodb.net/?retryWrites=true&w=majority"
    mongoimport(csv_path, db_name, collection_name, db_url=mongo_atlas_uri, db_port=27017)
    mongoimport(bball_salary_path,db_name,collection_name_bballSalary,db_url=mongo_atlas_uri,db_port=27017)