import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from './pages/home/home';
import { Scores } from "./pages/scores/scores";
import { Standings } from "./pages/standings/standings";
import { About } from "./pages/about/about";
import Header from './components/Header';
import Nav from './components/Nav';


function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Scores />}/>
          <Route path="/standings" element={<Standings />}/>
          <Route path="/about" element={<About />}/>
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Chicago Elite Sports | All Rights Reserved</p>
      </footer>
    </Router>
  );
}

export default App;
