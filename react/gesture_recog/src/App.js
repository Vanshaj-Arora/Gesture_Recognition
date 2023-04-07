import React from 'react';
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Start from "./pages/Start";
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {

  return (

    <div className="App">
    <Navbar />

        <Routes basename={process.env.PUBLIC_URL}>
        <Route exact path="/" element={<Home />} />
         <Route path="/Contact_us" element={<Contact />} />
         <Route path="/start" element={<Start />} />
         </Routes>
        <Footer />
    </div>


  );
}

export default App;
