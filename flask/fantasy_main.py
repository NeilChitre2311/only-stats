import requests
import json
import time
from dateutil.parser import parse
from datetime import timedelta
import pandas as pd

def get_data():
    """ Retrieve the fpl player data from the hard-coded url
    """
    response = requests.get("https://fantasy.premierleague.com/api/bootstrap-static/")
    if response.status_code != 200:
        raise Exception("Response was code " + str(response.status_code))
    responseStr = response.text
    data = json.loads(responseStr)
    return data

def get_individual_player_data(player_id):
    """ Retrieve the player-specific detailed data
    Args:
        player_id (int): ID of the player whose data is to be retrieved
    """
    base_url = "https://fantasy.premierleague.com/api/element-summary/"
    full_url = base_url + str(player_id) + "/"
    response = ''
    while response == '':
        try:
            response = requests.get(full_url)
        except:
            time.sleep(5)
    if response.status_code != 200:
        raise Exception("Response was code " + str(response.status_code))
    data = json.loads(response.text)
    return data

def get_entry_data(entry_id):
    """ Retrieve the summary/history data for a specific entry/team
    Args:
        entry_id (int) : ID of the team whose data is to be retrieved
    """
    base_url = "https://fantasy.premierleague.com/api/entry/"
    full_url = base_url + str(entry_id) + "/history/"
    response = ''
    while response == '':
        try:
            response = requests.get(full_url)
        except:
            time.sleep(5)
    if response.status_code != 200:
        raise Exception("Response was code " + str(response.status_code))
    data = json.loads(response.text)
    return data

def get_entry_personal_data(entry_id):
    """ Retrieve the summary/history data for a specific entry/team
    Args:
        entry_id (int) : ID of the team whose data is to be retrieved
    """
    base_url = "https://fantasy.premierleague.com/api/entry/"
    full_url = base_url + str(entry_id) + "/"
    response = ''
    while response == '':
        try:
            response = requests.get(full_url)
        except:
            time.sleep(5)
    if response.status_code != 200:
        raise Exception("Response was code " + str(response.status_code))
    data = json.loads(response.text)
    return data

def get_entry_gws_data(entry_id,num_gws,start_gw=1):
    """ Retrieve the gw-by-gw data for a specific entry/team
    Args:
        entry_id (int) : ID of the team whose data is to be retrieved
    """
    base_url = "https://fantasy.premierleague.com/api/entry/"
    gw_data = []
    for i in range(start_gw, num_gws+1):
        full_url = base_url + str(entry_id) + "/event/" + str(i) + "/picks/"
        response = ''
        while response == '':
            try:
                response = requests.get(full_url)
            except:
                time.sleep(5)
        if response.status_code != 200:
            raise Exception("Response was code " + str(response.status_code))
        data = json.loads(response.text)
        gw_data += [data]
    return gw_data

def get_entry_transfers_data(entry_id):
    """ Retrieve the transfer data for a specific entry/team
    Args:
        entry_id (int) : ID of the team whose data is to be retrieved
    """
    base_url = "https://fantasy.premierleague.com/api/entry/"
    full_url = base_url + str(entry_id) + "/transfers/"
    response = ''
    while response == '':
        try:
            response = requests.get(full_url)
        except:
            time.sleep(5)
    if response.status_code != 200:
        raise Exception("Response was code " + str(response.status_code))
    data = json.loads(response.text)
    return data

def get_fixtures_data():
    """ Retrieve the fixtures data for the season
    """
    url = "https://fantasy.premierleague.com/api/fixtures/"
    response = ''
    while response == '':
        try:
            response = requests.get(url)
        except:
            time.sleep(5)
    if response.status_code != 200:
        raise Exception("Response was code " + str(response.status_code))
    data = json.loads(response.text)
    
    ### Added HP code
    fixtures_df = pd.DataFrame()
    
    for f in data:
        gw = f['event']
        if gw == None:
            # print(f)
            continue
        team_a = f['team_a']
        team_h = f['team_h']
        team_a_score = f['team_a_score']
        team_h_score = f['team_h_score']
        team_h_difficulty = f['team_h_difficulty']
        team_a_difficulty = f['team_a_difficulty']


        year = parse(f['kickoff_time']).year
        month = parse(f['kickoff_time']).month
        day = parse(f['kickoff_time']).day
        
        #append to fixtures_df
        fixtures_df = fixtures_df.append({'gw':gw, 'team_a':team_a, 'team_h':team_h, 'team_a_score':team_a_score, 'team_h_score':team_h_score, 'team_h_difficulty':team_h_difficulty, 'team_a_difficulty':team_a_difficulty, 'year':year, 'month':month, 'day':day}, ignore_index=True)    
        # break
    return fixtures_df
