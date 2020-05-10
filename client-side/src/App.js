import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList.component";

function App() {
  return (
    <Router>
      <Route path="/" exact component={ProductsList} />
    </Router>
  );
}

export default App;
