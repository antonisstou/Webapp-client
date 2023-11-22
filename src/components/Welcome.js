import '../App.css'
import React from "react";
import NavBar from './NavBar';

function Welcome() {



  return (
    <React.Fragment>
        <div><NavBar title={'Welcome to the new app for book management'} button = {'LOGIN'}/></div>
        <div id='welDiv'>
            <h3>Please login with your credentials in order to manage your book</h3>
            <div id="bgDiv"></div>
        </div>
    </React.Fragment>
  );
}

export default Welcome;
