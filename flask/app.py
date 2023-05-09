import logging
import pandas as pd
import numpy as np # type: ignore
from flask import Flask, render_template, request, jsonify # type: ignore
from pymongo import MongoClient # type: ignore
from flask_cors import CORS, cross_origin
from sklearn.metrics.pairwise import cosine_similarity
from pymongo.errors import ConnectionFailure
from fantasy_run import *
import math


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# Configure logger to print logs to stdout
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


def get_mongo_connection():
    """
    Based on the environment variable, mongo_atlas_uri or mongo_local_uri,
    Returns a connection to the MongoDB database.
    """
    mongo_atlas_uri = "mongodb+srv://admin:ddsgrp10@grp10-c1.h89by.mongodb.net/?retryWrites=true&w=majority"
    mongo_local_uri = "mongodb://localhost:27017"

    client = None
    db = None

    # Try connecting to MongoDB Atlas first
    try:
        client = MongoClient(mongo_atlas_uri)
        client.admin.command("ismaster")
        db = client['alpha_sport']
    except ConnectionFailure:
        client = None
        db = None

    # Fallback to local MongoDB if Atlas connection failed
    if client is None or db is None:
        try:
            client = MongoClient(mongo_local_uri)
            client.admin.command("ismaster")
            db = client['alpha_sport']
        except ConnectionFailure as e:
            raise Exception("Failed to connect to both MongoDB Atlas and local MongoDB.") from e

    return db

# Configuration settings
RECOMMENDATION_LIMIT = 20
db = get_mongo_connection()
player_stats = list(db.football_players.find({}, {"_id": 0}))
fw_features = pd.DataFrame(player_stats)

# Normalize feature values
norms = np.linalg.norm(fw_features.iloc[:, 7:], axis=0)
norms[norms == 0] = 1e-10
stats_vectors = fw_features.iloc[:, 7:].apply(lambda x: x/norms, axis=1)

def get_similar_players(rank, stats_vectors, num_results=RECOMMENDATION_LIMIT):
    """
    Given a player id, returns a list of the most similar players based on their statistical performance.
    """
    input_vector = stats_vectors.iloc[fw_features.index[fw_features['Rk'] == rank].tolist()[0]].values #type: ignore
    similarity_scores = cosine_similarity([input_vector], stats_vectors)[0]
    closest_rows = fw_features.iloc[np.argsort(similarity_scores)[::-1][:num_results+1]]

    similar_players = []
    for _, row in closest_rows.iterrows(): #type: ignore
        player = {
            "id": int(row["Rk"]),
            "name": row["Player"],
            "position": row["Pos"],
            "age": int(row["Age"]),
            "team": row["Squad"],
            "league": row["Comp"],
            "similarity": str(round(similarity_scores[row.name]*100, 2)) + "%",
        }
        similar_players.append(player)
    return similar_players


def process_player_data(raw_data):
    return {
        "id": raw_data["ID"],
        "name": raw_data["Player"],
        "club": raw_data["Squad"],
        "league": raw_data["Comp"],
        "position": raw_data["Pos"],
        "press": raw_data["Press%"],
        "pass_completion": raw_data["PasTotCmp%"],
        "shots_on_target": raw_data["SoT%"],
        "pass_completion_final_third": raw_data["Pas3rd"],
        "aerial_duels_won": raw_data["AerWon%"],
        "ball_carries_final_third": raw_data["Car3rd"],
        "ball_recovery": raw_data["Rec%"]
    }


# Create a database connection
db = get_mongo_connection()

@app.route('/player-names', methods=['GET'])
def get_player_names():
    """
    Endpoint to retrieve a list of all player names and their corresponding ranks.
    """
    try:
        player_names = list(db.football_players.find({}, {"Player": 1, "Rk": 1, "_id": 0}))
        res = [{"key": player["Rk"], "text": player["Player"], "value": player["Rk"]} for player in player_names]
        return jsonify(res)
    except Exception as e:
        logger.exception(f"Error retrieving player names: {str(e)}")
        return jsonify([])

@app.route('/')
def index():
    """
    Endpoint to serve the main page of the application.
    """
    return render_template('index.html')

@app.route('/recommend')
@cross_origin(origin='*', headers=['Content-Type']) #type: ignore
def recommend():
    """
    Endpoint to retrieve a list of recommended players for a given player ID.
    """
    player_id = int(request.args.get('player_id', 0))
    try:
        recommendations = get_similar_players(player_id, stats_vectors, RECOMMENDATION_LIMIT)[1:]
        return jsonify(recommendations)

    except Exception as e:
        logger.exception(f"Error retrieving recommendations for player {player_id}: {str(e)}")
        return render_template('error.html')
    
@app.route('/compare', methods=['GET'])
def compare():
    """
    Endpoint to retrieve relevant data for two players given their player IDs.
    """
    player_id1 = int(request.args.get('player_id1', 0))
    player_id2 = int(request.args.get('player_id2', 0))
    
    try:
        player1_raw_data = db.football_players.find_one({"Rk": player_id1}, {"_id": 0,'ID':1 ,'Player': 1,'Comp': 1, 'Squad': 1 ,'Press%': 1,'PasTotCmp%': 1,'SoT%':1,'Pas3rd':1,'AerWon%':1,'Car3rd':1,'Rec%':1,'Pos': 1})
        player2_raw_data = db.football_players.find_one({"Rk": player_id2}, {"_id": 0,'ID':1 ,'Player': 1,'Comp': 1, 'Squad': 1 ,'Press%': 1,'PasTotCmp%': 1,'SoT%':1,'Pas3rd':1,'AerWon%':1,'Car3rd':1,'Rec%':1,'Pos': 1})

        if not player1_raw_data or not player2_raw_data:
            return jsonify({"error": "Invalid player IDs"}), 400
        
        player1_data = process_player_data(player1_raw_data)
        player2_data = process_player_data(player2_raw_data)

        return jsonify([player1_data, player2_data])
    
    except Exception as e:
        logger.exception(f"Error retrieving data for players {player_id1} and {player_id2}: {str(e)}")
        return jsonify({"error": "An error occurred while fetching the data"}), 500
    
@app.route('/bball-players', methods=['GET'])
def get_bball_players():
    """
    Endpoint to retrieve a list of all player names and their corresponding ranks.
    """
    try:
        bball_players = list(db.nba_players.find({}, {"name": 1, "_id": 1}))
        res_bball = [{"key": player["name"], "text": player["name"], "value": player["name"]} for player in bball_players]
        return jsonify(res_bball)
    except Exception as e:
        logger.exception(f"Error retrieving player names: {str(e)}")
        return jsonify([])
    
@app.route('/bball-player-stats', methods=['GET'])
def get_bball_player_stats():
    """
    Endpoint to retrieve basket ball player stats.
    """
    player_name = request.args.get('player_name', "")
    pipline = [
        {"$match":
         {"name":player_name}},
        {"$project":
         {"_id":0,"name":1,"games_played":1,"field_goals":1,"three_pointers":1,
          "two_pointers":1,"effected_field_goal":1,"points":1,
          "blocks":1,"age":1,"player_img_link":1,
          "predicted_salary":{"$toInt":"$predicted_salary"},
          "norm_field_goals":1,"norm_three_pointers":1,"norm_two_pointers":1,"norm_effect_goal":1,
          "norm_blocks":1,"norm_points":1
          }}
          ]

    try:
        bball_player_stats = list(db.nba_players.aggregate(pipline))
        
        return bball_player_stats[0]
    except Exception as e:
        logger.exception(f"Error retrieving player stats: {str(e)}")
        return jsonify([])
    
@app.route('/cw-fixtures',methods=['GET'])
def get_currentweek_fixtures():
    """Endpoint to fetch current week's fixture"""
    try:
        current_fixtures,previous_fixtures = get_fixtures()
        return_dict = dict()
        cw_fixtures = []
        pw_fixtures = []
        for _,row in current_fixtures.iterrows():
            fixture = {
                'team_h_name':row['team_h_name'],
                'team_a_name':row['team_a_name'],
                'team_h_code':row['team_h_code'],
                'team_a_code':row['team_a_code'],
                'team_h_score': None if math.isnan(row['team_h_score']) else row['team_h_score'],
                'team_a_score': None if math.isnan(row['team_a_score']) else row['team_a_score'],             

            }
            cw_fixtures.append(fixture)
        
        for _,row in previous_fixtures.iterrows():
            fixture = {
                'team_h_name':row['team_h_name'],
                'team_a_name':row['team_a_name'],
                'team_h_code':row['team_h_code'],
                'team_a_code':row['team_a_code'],
                'team_h_score': None if math.isnan(row['team_h_score']) else row['team_h_score'],
                'team_a_score': None if math.isnan(row['team_a_score']) else row['team_a_score'],             

            }
            pw_fixtures.append(fixture)
        
        return_dict['current'] = cw_fixtures
        return_dict['previous'] = pw_fixtures
        return return_dict
    except Exception as e:
        logger.exception("", e)
        return jsonify({'current': [], 'previous': []})

# Load the CSV file
_, _, teams_df = get_data_as_df('https://fantasy.premierleague.com/api/bootstrap-static/')
fantasy_players_df = pd.read_csv("data/Forecasts.csv")
merged_df = pd.merge(fantasy_players_df, teams_df[["code","short_name"]], left_on='Team', right_on='short_name', how='left')

@app.route('/fantasy-players', methods=['GET'])
def get_fantasy_players():
    """
    Endpoint to retrieve fantasy players data.
    """
    try:
        # Replace NaN values with None
        merged_df.fillna(value=0, inplace=True)
        merged_df.sort_values(by=['SelectedByPercent'], ascending=False, inplace=True)
        # Convert the DataFrame to a list of dictionaries
        fantasy_players = merged_df.to_dict(orient="records")
        return jsonify(fantasy_players)
    except Exception as e:
        logger.exception(f"Error fetching fantasy players data: {str(e)}")
        return jsonify([])


if __name__ == '__main__':
    try:
        # Load player stats from MongoDB into a Pandas dataframe

        # Start Flask application
        app.run(debug=True)
    except Exception as e:
        logger.exception(f"Error starting application: {str(e)}")
        raise e
