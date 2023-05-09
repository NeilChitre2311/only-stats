import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Icon, Button, Accordion, Grid } from 'semantic-ui-react'

const Analytics = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);

  const loadRecommendations = () => {
    navigate('/recommendations');
  };
  const loadInjuryPrediction = () => {
    navigate('/injury');
  };
  const loadSalaryPrediction = () => {
    navigate('/salary');
  };

  const handleClick = (e: React.MouseEvent, index: number) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };


  return (
    <Grid columns={3} divided="vertically" style={{marginTop:'10%',marginLeft:'1%',marginRight:'1%',marginBottom:'7%'}}>
        <Grid.Row style={{marginTop:'5%'}}>
        <Grid.Column>
            <Card style={{width: '90%',justify:'center',align:'center'}}>
                <Card.Content>
                <Card.Header>Player Recommendations</Card.Header>
                <Card.Description>
                    Checkout similar players
                    <Accordion>
                    <Accordion.Title onClick={(e) => handleClick(e, 0)}>
                        <Icon name="dropdown" />
                        See more
                        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>
                        Get ahead of the competition by using our state of the art recommendation system. 
                        By analyzing data on player performance and other factors such as playing style, we can provide recommendations on which players to recruit.
                        </p>
                    </Accordion.Content>
                    </Accordion>
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button
                    primary
                    onClick={loadRecommendations}
                    style={{justify:'center',align:'center'}}
                >
                    Try it out
                    <Icon name="arrow right" />
                </Button>
                </Card.Content>
            </Card>
        </Grid.Column>

        <Grid.Column>
            <Card style={{width: '90%',justify:'center',align:'center'}}>
                <Card.Content>
                <Card.Header>Salary Prediction</Card.Header>
                <Card.Description>
                    Predict a player's salary
                    <Accordion>
                    <Accordion.Title onClick={(e) => handleClick(e, 1)}>
                        <Icon name="dropdown" />
                        See more
                        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                        Are you afraid of getting underpaid? Don't know how to negotiate your salary?
                        By analyzing player performance, 
                        we can give accurate estimates of salary so that you get what you deserve.
                        </p>
                    </Accordion.Content>
                    </Accordion>
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button
                    primary
                    onClick={loadSalaryPrediction}
                    style={{justify:'center',align:'center'}}
                >
                    Try it out
                    <Icon name="arrow right" />
                </Button>
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column>
            <Card style={{width: '90%',justify:'center',align:'center'}}>
                <Card.Content>
                <Card.Header>Injury Prediction</Card.Header>
                <Card.Description>
                    Predict a player's potential injury
                    <Accordion>
                    <Accordion.Title onClick={(e) => handleClick(e, 2)}>
                    <Icon name="dropdown" />
                    See more
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <p>
                        Protect your team's future by saving your players from getting injured and keeping them at top of their game. 
                        With advanced algorithms , 
                        our model accurately predicts injury risk factors for individual players and the team as a whole.
                        </p>
                    </Accordion.Content>
                    </Accordion>
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button
                    primary
                    onClick={loadInjuryPrediction}
                    style={{justify:'center',align:'center'}}
                >
                    Try it out
                    <Icon name="arrow right" />
                </Button>
                </Card.Content>
            </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Analytics;