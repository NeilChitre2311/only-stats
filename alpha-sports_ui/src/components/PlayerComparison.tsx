import { Modal, Table, Grid, Segment } from "semantic-ui-react"
import { Radar } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
import { RadialLinearScale } from "chart.js"

Chart.register(RadialLinearScale);

Object.keys(registerables).forEach((name: any) => {
  Chart.register(registerables[name]);
});

function PlayerComparison(props: { data: any, open: boolean, handleClose: () => void }) {
  const [player1, player2] = props.data;

  const data = {
    labels: [
      "Press",
      "Pass Completion",
      "Shots on Target",
      "Pass Completion",
      "Aerial Duels Won",
      "Ball Carries",
      "Ball Recovery",
    ],
    datasets: [
      {
        label: player1.name,
        data: [
          player1.press,
          player1.pass_completion,
          player1.shots_on_target,
          player1.pass_completion_final_third,
          player1.aerial_duels_won,
          player1.ball_carries_final_third,
          player1.ball_recovery,
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: player2.name,
        data: [
          player2.press,
          player2.pass_completion,
          player2.shots_on_target,
          player2.pass_completion_final_third,
          player2.aerial_duels_won,
          player2.ball_carries_final_third,
          player2.ball_recovery,
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };
  
  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://kamarfifa.pl/wp-content/uploads/2020/12/no-face.jpg'
    // 'https://assets.laliga.com/assets/useful/default-player/2048x2225/male_2_001.png';
  };


return (
  <Modal onClose={props.handleClose} open={props.open}>
    <Modal.Header>Player Comparison</Modal.Header>
    <Modal.Content>
      <Grid columns={16} divided>
        <Grid.Row>
          <Grid.Column width={3}>
          <Segment>
                <h2>{player1.name}</h2>
                <p>League name: {player1.league}</p>
                <p>Club: {player1.club}</p>
                <p>Position: {player1.position}</p>
                <img
                  src={`https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/${player1.id}.png`}
                  alt="Player 1 portrait"
                  onError={handleImageError}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
          <Segment>
                <Radar data={data} options={options} />
                <Table celled style={{ marginTop: "1em" }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>{player1.name}</Table.HeaderCell>
                      <Table.HeaderCell>{player2.name}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Pass Completion</Table.Cell>
                      <Table.Cell>{player1.pass_completion}%</Table.Cell>
                      <Table.Cell>{player2.pass_completion}%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Shots on target</Table.Cell>
                      <Table.Cell>{player1.shots_on_target}</Table.Cell>
                      <Table.Cell>{player2.shots_on_target}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Ball Recovery</Table.Cell>
                      <Table.Cell>{player1.ball_recovery}</Table.Cell>
                      <Table.Cell>{player2.ball_recovery}</Table.Cell>
                    </Table.Row>
                    {/* Add more rows for additional stats */}
                  </Table.Body>
                </Table>
              </Segment>
          </Grid.Column>
          <Grid.Column width={3}>
          <Segment>
                <h2>{player2.name}</h2>
                <p>League name: {player2.league}</p>
                <p>Club: {player2.club}</p>
                <p>Position: {player1.position}</p>
                <img
                  src={`https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/${player2.id}.png`}
                  alt="Player 2 portrait"
                  onError={handleImageError}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Modal.Content>
  </Modal>
);
}

export default PlayerComparison;