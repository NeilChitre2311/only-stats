from fantasy_main import *
from hp_data_pull import *
import pandas as pd
import numpy as np
# import matplotlib.pyplot as plt

#ignore warnings
import warnings
warnings.filterwarnings('ignore')

def get_fixtures():

    elements_df, elements_types_df, teams_df = get_data_as_df('https://fantasy.premierleague.com/api/bootstrap-static/')
    fixtures_data = get_fixtures_data()

    current_gw_fixtures = get_current_gw_fixtures(fixtures_data, teams_df)

    # print(current_gw_fixtures)
    return current_gw_fixtures