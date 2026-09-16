import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './Pages/Book';
import ForYou from './Pages/ForYou';
import Home from './Pages/Home';
import Player from './Pages/Player';
import ChoosePlan from './Pages/ChoosePlan';
import Settings from './Pages/Settings';
import './index.css';

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/for-you" element={<ForYou />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="/player" element={<Player />} />
      <Route path="/choose-plan" element={<ChoosePlan />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
