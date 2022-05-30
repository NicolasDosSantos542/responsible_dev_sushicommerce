import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MainRouter from "./routes/MainRouter";
import './App.css';
import Bus from "./Utils/Bus";

window.flash = (title, message, type = "success") => Bus.emit('flash', ({title, message, type}));

function App({state}) {
    return (
        <Router>
            <MainRouter state={state}/>
        </Router>
    );
}

export default App;
