import './App.css';
import React,{Fragment} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Savedevents from './pages/Savedevents'

function App() {
  return (
    <Router>
      <Fragment>
        <Header/>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Landing/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/register" element={<Register/>}></Route>
            <Route exact path="/saved" element={<Savedevents/>}></Route>
          </Routes>
        </div>
        {/* <Footer/> */}
      </Fragment>
    </Router>
  );
}

export default App;
