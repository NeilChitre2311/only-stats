import React from 'react'
import { useState } from 'react'
import { Card, Container, Grid, Segment, Table } from "semantic-ui-react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { RadialLinearScale } from "chart.js";


Chart.register(RadialLinearScale);

Object.keys(registerables).forEach((name: any) => {
    Chart.register(registerables[name]);
  });

  function PlayerStatsData(props: { data: any, open: boolean, handleClose: () => void }) {
    const player = props.data;
  
    const data = {
      labels: [
        "Three Pointers",
        "Two Pointers",
        "Blocks",
        "Effective Field Goal",
        "Field Goals",
        "Points"
      ],
      datasets: [
        {
            label:player.name,
            data: [
            player.norm_three_pointers,
            player.norm_two_pointers,
            player.norm_blocks,
            player.norm_effect_goal,
            player.norm_field_goals,
            player.norm_points
          ],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        }
    ]
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
  
    // const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //   event.currentTarget.src = 'https://kamarfifa.pl/wp-content/uploads/2020/12/no-face.jpg'
    //   // 'https://assets.laliga.com/assets/useful/default-player/2048x2225/male_2_001.png';
    // };
  const cardHeader = (
    <p>{player.name}, {player.age}</p>
  )

  const cardDescription = (
    <p>Predicted salary is ${player.predicted_salary.toLocaleString('en-US')}</p>
  )
  
  const cardMeta = (
    <p>{player.games_played} games played</p>
  )

  const effectedGoals = (
    player.effected_field_goal*100
  )
  
  return (
    <Grid celled='internally' style={{width:'90%',marginLeft:'5%',marginRight:'5%',marginTop:'5%'}} onClose={props.handleClose} open={props.open}>
    <Grid.Row>
      <Grid.Column width={2}>
      <Card 
      image={player.player_img_link}
      header= {cardHeader}
      meta= {cardMeta}
      description= {cardDescription}
      />
      </Grid.Column>
      <Grid.Column width={3}>
        <Segment>
          <Card style={{width:'100%',backgroundColor:'black'}}>
            <Card.Content>
              <Card.Header style={{color:'white',backgroundColor:'black'}}>
                Player Stats
              </Card.Header>
            </Card.Content>
          </Card>
        <Table celled inverted style={{backgroundColor:'black'}}>
            <Table.Body>
            <Table.Row>
              <Table.Cell>Points</Table.Cell>
              <Table.Cell>{player.points}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Three Pointers</Table.Cell>
              <Table.Cell>{player.three_pointers}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Two Pointers</Table.Cell>
              <Table.Cell>{player.two_pointers}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Blocks</Table.Cell>
              <Table.Cell>{player.blocks}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Field Goals</Table.Cell>
              <Table.Cell>{player.field_goals}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Effective Field Goal</Table.Cell>
              <Table.Cell>{effectedGoals.toPrecision(4)}%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </Segment>
      </Grid.Column>
      <Grid.Column width={5}>
        <Segment>
        <Radar data={data} options={options} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  );
  }

  export default PlayerStatsData;