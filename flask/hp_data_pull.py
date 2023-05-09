import requests
import json
import pandas as pd

def get_data_as_df(url):
    r = requests.get(url)
    json = r.json()
    elements_df = pd.DataFrame(json['elements'])
    elements_types_df = pd.DataFrame(json['element_types'])
    teams_df = pd.DataFrame(json['teams'])

    return elements_df, elements_types_df, teams_df

def get_fixtures_as_df(url):
    r = requests.get(url)
    json = r.json()
    fixtures_df = pd.DataFrame(json['fixtures'])
    return fixtures_df

def get_current_gw_fixtures(fixtures_data, teams_df):
    current_gw = 35
    previous_gw = 34
    current_gw_fixtures = fixtures_data[fixtures_data['gw']==current_gw].copy()
    current_gw_fixtures = current_gw_fixtures.merge(teams_df[['id','name','code']], left_on='team_a', right_on='id', how='left')
    previous_gw_fixtures = fixtures_data[fixtures_data['gw']==previous_gw].copy()
    previous_gw_fixtures = previous_gw_fixtures.merge(teams_df[['id','name','code']], left_on='team_a', right_on='id', how='left')

    team_id_mapping = teams_df[['id','name']].set_index('id').to_dict()['name']
    team_code_mapping = teams_df[['id','code']].set_index('id').to_dict()['code']

    #Based on team_id_mapping dict, create columns for team_a_name and team_h_name in current_gw_fixtures
    current_gw_fixtures['team_a_name'] = current_gw_fixtures['team_a'].map(team_id_mapping)
    current_gw_fixtures['team_h_name'] = current_gw_fixtures['team_h'].map(team_id_mapping)
    current_gw_fixtures['team_a_code'] = current_gw_fixtures['team_a'].map(team_code_mapping)
    current_gw_fixtures['team_h_code'] = current_gw_fixtures['team_h'].map(team_code_mapping)

    previous_gw_fixtures['team_a_name'] = previous_gw_fixtures['team_a'].map(team_id_mapping)
    previous_gw_fixtures['team_h_name'] = previous_gw_fixtures['team_h'].map(team_id_mapping)
    previous_gw_fixtures['team_a_code'] = previous_gw_fixtures['team_a'].map(team_code_mapping)
    previous_gw_fixtures['team_h_code'] = previous_gw_fixtures['team_h'].map(team_code_mapping)

    return current_gw_fixtures,previous_gw_fixtures
