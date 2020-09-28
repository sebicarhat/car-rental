import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const AdminRoute = ({isAdmin, component: Component, ...rest}) => (
    <Route {...rest} render={props => 
        isAdmin ? <Component {...props}/> : <Redirect to='/'/>}/>
)

AdminRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired
}

function mapStateToProps(state){
    return{
    isAdmin: state.user.role==='admin'
    }
}

export default connect(mapStateToProps)(AdminRoute)

