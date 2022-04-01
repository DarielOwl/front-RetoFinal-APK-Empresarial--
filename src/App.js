import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import {useState} from 'react';
import StateProvider from "./components/StateProvider";

import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Components
import NavBar from "./components/Navbar";
import Footer from "./components/footer";

function App() {
  
  return (  
    <Router>
      <StateProvider>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      </StateProvider>
    </Router>
  );
}

export default App;
