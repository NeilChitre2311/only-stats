import { useEffect, useState } from "react";
import { Button, Container, Dropdown, Grid, Header } from "semantic-ui-react";
import { getPlayersApi, getRecommendationsApi } from "../api/PlayerRecApi";
import plyrRec_banner from "../images/plyrRec_banner.jpeg";
import clipart1 from "../images/clipart1.png";
import clipart2 from "../images/clipart2.png";
import clipart3 from "../images/clipart3.png";
import "./PlayerRecommendation.css";
import RecommendationsTable from "./RecommendationsTable";

const PlayerRecommendation = () => {
  const [players, setPlayers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [recButtonEnabled, setRecButtonEnabled] = useState(false);
  const [playerFilters, setPlayerFilters] = useState({
    id: -1,
    team: "",
    league: "",
  });

  const getRecommendations = async () => {
    const response: any = await getRecommendationsApi(playerFilters);
    setRecommendations(response.data);
    setShowTable(true);
  };

  const enableButton = (event: any, data: any) => {
    // console.log('enable button called', data.value)
    console.log("enable button called", data);
    if (data.value) {
      setPlayerFilters({ id: data.value, team: "", league: "" });
      setRecButtonEnabled(true);
    } else {
      setShowTable(false);
      setRecButtonEnabled(false);
    }
  };
  const scrollToServiceSection = () => {
    const serviceDescription = document.querySelector(".service-description");
    if (serviceDescription) {
      serviceDescription.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchData = async () => {
    const response = await getPlayersApi();
    console.log("Response is", response);
    setPlayers(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Enable auto-changing slides
    autoplaySpeed: 3000,
  };

  return (
    <Container style={{ width: "100%" }}>
      <div className="banner">
      <img src={plyrRec_banner} alt="Player Recommendation Banner" />
  <button className="down-arrow" onClick={scrollToServiceSection}>
    <i className="fas fa-chevron-down"></i>
  </button>
        </div>
        <Container style={{ width: "1000px" }}>
        <div className="service-description">
        <Grid columns={3} stackable>
    <Grid.Row>
      <Grid.Column>
        <div className="feature">
          <img src={clipart1} alt="Clipart 1" className="clipart" />
          <p className="feature-text">
            Our advanced data-driven approach to player analysis ensures that you find the most promising talent for your team.
          </p>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="feature">
          <img src={clipart2} alt="Clipart 2" className="clipart" />
          <p className="feature-text">
            Using state-of-the-art algorithms, we provide in-depth insights, analytics and recommendations tailored to your team's specific needs.
          </p>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="feature">
          <img src={clipart3} alt="Clipart 3" className="clipart" />
          <p className="feature-text">
            Our comprehensive scouting reports give you a competitive edge in acquiring the best talent and building a stronger team.
          </p>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
        </div>
        </Container>
        <Container style={{ width: "800px" }}>
        <div className="player-recommendation-content">
        <Header
          as="h2"
          content="Player Recommendation"
          inverted
          style={{
            fontSize: "3.7em",
            fontWeight: "bold",
            marginTop: "0.5em",
            marginBottom: "0.5em",
          }}
        />
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={5}>
              <Dropdown
                search
                clearable
                placeholder="Select player"
                fluid
                selection
                onChange={enableButton}
                options={players}
                scrolling
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Dropdown
                disabled
                clearable
                search
                placeholder="Max age"
                fluid
                selection
                options={[
                  { text: "18", value: 18 },
                  { text: "19", value: 19 },
                  { text: "20", value: 20 },
                  { text: "21", value: 21 },
                  { text: "22", value: 22 },
                  { text: "23", value: 23 },
                  { text: "24", value: 24 },
                  { text: "25", value: 25 },
                ]}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Dropdown
                disabled
                clearable
                search
                placeholder="League"
                fluid
                selection
                options={[
                  { text: "Premier League", value: "EPL" },
                  { text: "Ligue 1", value: "Ligue1" },
                  { text: "La Liga", value: "LaLiga" },
                  { text: "Bundesliga", value: "Bundesliga" },
                  { text: "Serie A", value: "SerieA" },
                ]}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                disabled={!recButtonEnabled}
                onClick={getRecommendations}
                size="small"
                style={{
                  height: "3em",
                  width: "13.7em",
                  backgroundColor: "#000000", // Theme color
                  color: "#ffffff", // Theme text color
                }}
              >
                Get Recommendations
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {showTable && recommendations && (
          <RecommendationsTable
            queryPlayerId={playerFilters.id}
            recPlayers={recommendations}
          />
        )}
      </div>
      </Container>
    </Container>
  );
};

export default PlayerRecommendation;