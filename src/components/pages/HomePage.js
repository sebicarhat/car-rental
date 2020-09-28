import React from 'react';
import{Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import{Menu,Button,Container,Icon} from 'semantic-ui-react'
import RentalCars from './RentalCars';



const HomePage = ({isLoggedIn, logout}) =>(
    <div style={{textAlign:'center', backgroundColor:'#F2F2F2',height:"120%"}}>
          <Menu inverted style = {{backgroundColor:'#2a2f3a'}} size='large'>
             <Container>
               <Menu.Item as={Link} to='/' active>Home</Menu.Item>
               {isLoggedIn && <Menu.Item as={Link} to='/mybookings'>Dashboard</Menu.Item>}
               <Menu.Item  as={Link} to='/'>About</Menu.Item>
               <Menu.Item position='right'>
               {isLoggedIn ? <Button primary as='a' onClick={() => logout()}><Icon name="sign-out"/>Logout</Button> : 
                (<div>
               <Link to = "/login">
                 <Button primary as='a'>Log in</Button>
               </Link>
               <Link to = "/signup">
                 <Button color='teal' as='a' style={{ marginLeft: '0.5em' }}>Sign Up</Button>
               </Link>
               </div>)}
               </Menu.Item>
             </Container>
          </Menu>
          <div style={{maxWidth:'75%', margin:'0 auto'}}>
            <br/>
            <RentalCars/>
          </div>
    </div>
   

);

function mapStateToProps(state){
  return {
    isLoggedIn: !!state.user.email
  }
}

HomePage.propTypes={
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect (mapStateToProps,{logout})(HomePage);
