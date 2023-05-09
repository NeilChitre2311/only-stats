import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Analytics from './components/Analytics'
import RadarChart from './components/RadarChart'
import PlayerRecommendation from './components/PlayerRecommendation'
import Header from './components/Headers';
import Footer from './components/Footer';
import ComingSoon from './components/CoomingSoon'
import BBallPlayerStats from './components/BBallPlayerStats'
import FantasyLeagueHome from './components/FantasyLeagueHome'

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/analytics' element={<Analytics/>}/>
          <Route path='/services' element={<FantasyLeagueHome/>}/>
          <Route path='/RadarChart' element={<RadarChart/>}/>
          <Route path='/recommendations' element={<PlayerRecommendation/>}/>
          <Route path='/injury' element={<ComingSoon/>}/>
          <Route path='/salary' element={<BBallPlayerStats/>}/>
          </Routes>
          <Footer />
      </Router>
    </div>
  );
}

export default App
