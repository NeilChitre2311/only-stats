import { useEffect, useState } from "react";
import {  Card, Container, Grid, Header, Image, Table, Tab, TabProps } from "semantic-ui-react";
import { getCWFixturesAPI, getFantasyPlayersApi } from "../api/PlayerRecApi";
import fpl_img from "../images/fpl_img.png"

const FantasyLeagueHome = () => {
    const [resposeData, setResponseData] = useState({'current':[],'previous':[]});
    const [showPrevious, setShowPrevious] = useState(false);
    const [fixtures,setFixtures] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [fantasyPlayers, setFantasyPlayers] = useState([]);
    
    const getFixtures = async () => {
      const response: any = await getCWFixturesAPI();
      setResponseData(response.data);
      setFixtures(response.data['current']);
    };

    const getFantasyPlayers = async () => {
        const response: any = await getFantasyPlayersApi();
        setFantasyPlayers(response.data);
      };

    useEffect(() => {
      getFixtures();
      setShowPrevious(false);
      setActiveTab(1);
      setFixtures(resposeData['current']);
      getFantasyPlayers();
    }, []);
    
    const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
        if (data.activeIndex == 0) {
            setActiveTab(0)
            setShowPrevious(true)
            setFixtures(resposeData['previous'])
        } else {
            setActiveTab(1)
            setShowPrevious(false)
            setFixtures(resposeData['current'])
        }
        
    }

    const tableRows = fixtures.map((fixture: any) => (
        <Table.Row>
            <Table.Cell>
                <Header as='h4' image style={{marginLeft:'25%'}}>
                    <Image src={'https://resources.premierleague.com/premierleague/badges/t'+fixture.team_h_code+'.svg'} style={{width:'40px',height:'40px'}}/>
                    <Header.Content style={{color:'white'}}>
                        {fixture.team_h_name}
                    </Header.Content>
                </Header>    
            </Table.Cell>
            {showPrevious && 
                <Table.Cell>
                <Header as='h5' style={{marginLeft:'25%'}}>
                    <Header.Content style={{color:'white'}}>
                        {fixture.team_h_score} - {fixture.team_a_score}
                    </Header.Content>
                </Header> 
            </Table.Cell>}
            <Table.Cell>
                <Header as='h4' image style={{marginLeft:'25%'}}>
                    <Image src={'https://resources.premierleague.com/premierleague/badges/t'+fixture.team_a_code+'.svg'} style={{width:'40px',height:'40px'}}/>
                    <Header.Content style={{color:'white'}}>
                        {fixture.team_a_name}
                    </Header.Content>
                </Header>    
            </Table.Cell>
        </Table.Row>
    ))

    const playerRows = fantasyPlayers.map((player: any) => {
        const priceInMillions = (player.Cost / 1000000).toFixed(1); // Convert the price to millions and format it

        return (
          <Table.Row>
            <Table.Cell>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image src={'https://resources.premierleague.com/premierleague/badges/t'+player.code+'.svg'} style={{width:'20px',height:'20px', marginRight: '8px'}} />
                {player.Surname}
            </div>
            </Table.Cell>
            <Table.Cell>{player.PositionsList}</Table.Cell>
            <Table.Cell>{priceInMillions}M</Table.Cell>
            <Table.Cell>{player.SelectedByPercent}</Table.Cell>
            <Table.Cell>{player.TotalPoints}</Table.Cell>
            <Table.Cell>{player.GW35Forecast}</Table.Cell>
            <Table.Cell>{player.GW36Forecast}</Table.Cell>
            <Table.Cell>{player.GW37Forecast}</Table.Cell>
            <Table.Cell>{player.GW38Forecast}</Table.Cell>
          </Table.Row>
        );
      });


    const tableContent = (
        <div style={{height:'478px',overflow:'scroll'}}>
        <Table inverted>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <h4 style={{marginLeft:'30%'}}>
                                Home Team
                                </h4>
                            </Table.HeaderCell>
                            {showPrevious && 
                            <Table.HeaderCell>
                            
                        </Table.HeaderCell>}
                            <Table.HeaderCell>
                                <h4 style={{marginLeft:'30%'}}>
                                Away Team
                                </h4>
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {tableRows}
                        </Table.Body>
                    </Table>
                    </div>
    )

    const panes = [
        {
            
            menuItem:'Previous Week',
            render: () => <Tab.Pane>
                {tableContent}
            </Tab.Pane>
        },
        {
            menuItem:'Current Week',
            render: () => <Tab.Pane>
                {tableContent}
            </Tab.Pane>
        }
    ]
  
    return (
        <Container style={{ width: "100%", marginTop: "10%" }}>
          <Container style={{ width: "100%" }}>
            <Grid divided="vertically" style={{ width: "100%" }}>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Card
                    style={{ width: "90%", marginLeft: "10%" }}
                    image={fpl_img}
                    header="GW35 Buy, Sell, Keep"
                    description="In this article, we crunch the numbers, analyze the fixtures, take advice from the Algorithm, 
                    and decide which player to buy, which player to sell, and which player to keep for Gameweek 34.
                    We also look at the top five key players for Fantasy Premier League (FPL) in Gameweek 34. 
                    March's assist against Forest made it four over the last six gameweeks for the 28-year-old, 
                    only De Bruyne (five) has notched more amongst midfielders over that period."
                  />
                </Grid.Column>
                <Grid.Column>
                  <Tab
                    inverted
                    panes={panes}
                    activeIndex={activeTab}
                    onTabChange={handleTabChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <div style={{ height: "500px", overflow: "scroll" ,marginLeft: "15px"}}>
                    <Table celled inverted>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Player Name</Table.HeaderCell>
                          <Table.HeaderCell>Position</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                          <Table.HeaderCell>Selected %</Table.HeaderCell>
                          <Table.HeaderCell>Overall</Table.HeaderCell>
                          <Table.HeaderCell>GW 35</Table.HeaderCell>
                          <Table.HeaderCell>GW 36</Table.HeaderCell>
                          <Table.HeaderCell>GW 37</Table.HeaderCell>
                          <Table.HeaderCell>GW 38</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>{playerRows}</Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
      );
    }

    export default FantasyLeagueHome;