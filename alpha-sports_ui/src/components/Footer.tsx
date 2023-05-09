import React from 'react';
import {
  Container,
  Grid,
  List,
  Segment,
  Divider,
  Image,
} from 'semantic-ui-react';
import logo from '../images/logo-black.png';
import 'semantic-ui-css/semantic.min.css';

const Footer: React.FC = () => (
  <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
    <Container textAlign="center">
      <Grid divided inverted stackable>
        {/* Add more Grid.Column components here as needed */}
      </Grid>

      <Divider inverted section />
      <Image centered size="mini" src={logo} />
      <List horizontal inverted divided link size="small">
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;