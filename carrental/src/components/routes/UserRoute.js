import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const UserRoute = ({isLoggedIn, component: Component, ...rest}) => (
    <Route {...rest} render={props => isLoggedIn ? <Component {...props}/> : <Redirect to='/'/>}/>
)

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

function mapStateToProps(state){
    return{
    isLoggedIn: !!state.user.email
    }
}

export default connect(mapStateToProps)(UserRoute)

