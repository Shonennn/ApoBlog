
import './App.css';
import{Routes,Route} from 'react-router-dom'
import Homepage from './pages/homepage';
import Navbar from './components/navbar';
import Register from './pages/register';
import Login from './pages/login';
import Character from './pages/Character';
import CharactersList from './pages/CharactersList';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route strict exact path="/image" component={CharactersList} />
        <Route strict exact path="/:id" component={Character} />
      </Routes>
    </div>
  );
}

export default App;
