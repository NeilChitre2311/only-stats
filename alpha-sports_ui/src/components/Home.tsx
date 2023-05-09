import { Container, Header, Grid } from 'semantic-ui-react'
import Cards from './Cards'
import './PlayerRecommendation.css'
import clipart1 from "../images/clipart1.png";
import clipart2 from "../images/clipart2.png";
import clipart3 from "../images/clipart3.png";


const fantasyText = "Looking for an edge in your fantasy league? Look no further than our fantasy player recommender!"
const analyticsText = "Try out our analytics feature and gain a winning advantage with our state-of-the art AI techniques!"

const Home = () => (
    <Container style={{ width: "100%" }}>
      <video autoPlay loop muted playsInline className="background-video">
        <source src="https://drive.google.com/uc?id=1302DRHZzeBXOy2xkxSytqHZvTkzd6PEi" type="video/mp4" />
        </video>
      <Container style={{ width: "1000px" }}>
        <div className="service-description">
          <Grid columns={3} stackable>
            <Grid.Row>
              <Grid.Column>
                <div className="feature">
                  <img src={clipart1} alt="Clipart 1" className="clipart" />
                  <p className="feature-text">
                    Our advanced data-driven approach to player analysis ensures
                    that you find the most promising talent for your team.
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="feature">
                  <img src={clipart2} alt="Clipart 2" className="clipart" />
                  <p className="feature-text">
                    Using state-of-the-art algorithms, we provide in-depth
                    insights, analytics and recommendations tailored to your team's specific
                    needs.
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="feature">
                  <img src={clipart3} alt="Clipart 3" className="clipart" />
                  <p className="feature-text">
                    Our comprehensive scouting reports give you a competitive edge
                    in acquiring the best talent and building a stronger team.
                  </p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
  
      <Container text>
        <Header
          as="h1"
          content=""
          inverted
          style={{
            fontSize: "2em",
            fontWeight: "bold",
            marginTop: "1em",
            marginBottom: "1.5em",
          }}
        />
        {/* <Segment> */}
        <Grid divided="vertically" style={{ marginLeft: "0.6em" }}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Cards
                title="Analytics"
                image="analyticsIcon"
                route="/analytics"
                disabled={false}
                text={analyticsText}
              />
            </Grid.Column>
            <Grid.Column>
              <Cards
                title="Fantasy League"
                image="serviceIcon"
                route="/services"
                disabled={false}
                text={fantasyText}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* </Segment> */}
      </Container>
    </Container>
  );
  
  export default Home;