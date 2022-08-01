
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import  AddAlumni  from './components/AddAlumni';
import  NavBar from './components/NavBar';
import {About}  from './components/About';
import { Projects } from './components/Projects';
import { Events } from './components/Events';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
    
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<AddAlumni/>}/>
        <Route path="/update/:id" element={<AddAlumni/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/update/:id" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/update/:id" element={<Projects/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/update/:id" element={<Events/>}/>

        <Route/>
      </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
//
