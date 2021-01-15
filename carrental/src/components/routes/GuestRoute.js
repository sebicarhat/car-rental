import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const GuestRoute = ({isLoggedIn, component: Component, ...rest}) => (
    <Route {...rest} render={props => !isLoggedIn ? <Component {...props}/> : <Redirect to='/dashboard'/>}/>
)

GuestRoute.propTypes = {
    component: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

function mapStateToProps(state){
    return{
    isLoggedIn: !!state.user.email
    }
}

export default connect(mapStateToProps)(GuestRoute)

