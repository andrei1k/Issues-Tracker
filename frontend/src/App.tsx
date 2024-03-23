import React from 'react';
// import ReactDOM from 'react-dom/client';
import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import NavBar from './components/NavBar.tsx';
import Register from './components/Register.tsx';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
    return (
    <Router>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/about" component={About} /> */}
            {/* <Route path="/contact" component={Contact} /> */}
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
    )
}

export default App;
