import React from 'react'
import PropTypes from 'prop-types'
import {Message} from 'semantic-ui-react'
import ForgotPassForm from '../forms/ForgotPassForm'
import {connect} from 'react-redux'
import {resetPassword} from '../../actions/auth'

class ForgotPassPage extends React.Component{
    state={
        ok:false
    }

    submit = data => this.props.resetPassword(data).then(()=> this.setState({ok:true}))

    render(){
        return (
            <div>
                {this.state.ok ? <Message>Email has been sent!</Message> :
                <ForgotPassForm submit={this.submit}/>}
            </div>
        );

    }
}

ForgotPassPage.propTypes={
    resetPassword: PropTypes.func.isRequired
}

export default connect(null,{resetPassword})(ForgotPassPage);