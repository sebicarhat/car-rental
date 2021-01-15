import React from 'react'
import PropTypes from 'prop-types'
import {Menu, Image, Dropdown, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import gravatarUrl from 'gravatar-url'
import {logout} from '../../actions/auth'

const TopMenu = ({user, logout}) => (
    <Menu inverted style = {{backgroundColor:'#2a2f3a', fontFamily:'Minion Pro'}} size='huge' >
        <Menu.Item as={Link} to ="/">HomePage</Menu.Item>
        <Menu.Item as={Link} to ="/mybookings">My bookings</Menu.Item>
        {user.role==='admin' && <Menu.Item as={Link} to ="/mycars">My Cars</Menu.Item>}
        {user.role==='admin' && <Menu.Item as={Link} to ="/bookings">Rental requests</Menu.Item>}
        <Menu.Menu position="right">
            <Dropdown trigger ={<Image avatar src={gravatarUrl(user.email)}/>}>
                <Dropdown.Menu>
                <Dropdown.Item><Link style={{color:'black'}} to= '/editprofile'><Icon name='user circle'/>Edit profile</Link></Dropdown.Item>
                <Dropdown.Item onClick={() => logout()}><Icon name='sign-out'/>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

function mapStateToProps(state){
    return {
        user: state.user
    }
}

TopMenu.propTypes={
    user: PropTypes.shape({
          email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired
    
}

export default connect(mapStateToProps,{logout})(TopMenu)