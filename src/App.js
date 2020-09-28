import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from './components/pages/SignUpPage';
import ForgotPassPage from './components/pages/ForgotPassPage';
import NewCar from "./components/pages/NewCar";
import MyCars from './components/pages/MyCars';
import MyBookings from './components/pages/MyBookings';
import Bookings from './components/pages/Bookings';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import AdminRoute from './components/routes/AdminRoute';
import TopMenu from './components/menus/TopMenu';
import EditProfile from './components/pages/EditProfile';
import EditCar from './components/pages/EditCar';
import Reviews from './components/pages/Reviews';



const App = ({loc, isLoggedIn}) =>(
  <div>
    {isLoggedIn && window.location.pathname !== "/" && <TopMenu/>}
    <Route loc = {loc} path="/" exact component={HomePage} />
    <GuestRoute loc = {loc} path="/login" exact component={LoginPage} />
    <GuestRoute loc = {loc} path="/signup" exact component={SignUpPage} />
    <GuestRoute loc = {loc} path="/forgot_pass" exact component={ForgotPassPage} />
    <AdminRoute loc = {loc} path='/newcar' exact component={NewCar}/>
    <AdminRoute loc = {loc} path='/mycars' exact component={MyCars}/>
    <UserRoute loc = {loc} path='/mybookings' exact component={MyBookings}/>
    <UserRoute loc = {loc} path='/editprofile' exact component={EditProfile}/>
    <AdminRoute loc = {loc} path='/editcar' exact component={EditCar}/>
    <AdminRoute loc = {loc} path='/bookings' exact component={Bookings}/>
    <UserRoute loc = {loc} path='/userreviews' exact component={Reviews}/>
  </div>
);

App.propTypes={
  loc: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return{
    isLoggedIn: !!state.user.email
  }
}



export default connect(mapStateToProps)(App);
