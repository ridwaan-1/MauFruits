import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Containers/Header';
import Footer from './Containers/Footer'; 

function App() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment> 
  );
}

export default App;
