import React from 'react';
import {Form,Button, Message, Grid, Header, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import{Link} from "react-router-dom";
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component{
  state = {
    data:{
      email:'',
      password:''
    },
    loading: false,
    errors:{}
  }



  onSubmit = () => {
    const  errors = this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0){
      this.setState({loading:true});
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors:{global: err.response.data.message}, loading: false })
        );
        
    }
  };

  validate = (data) =>{
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Email is invalid";
    if(!data.password) errors.password="Password label can't be blank";
    return errors;
  }

  onChange = e =>
    this.setState({
      data:{...this.state.data, [e.target.name]: e.target.value}
  });
  render(){
    const {data, errors, loading} = this.state;
    return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as='h1' color='teal' textAlign='center'>
           Log in to your account
        </Header>
        <Form size='large' onSubmit={this.onSubmit} loading={loading}>
          {errors.global && (
            <Message negative>
            <Message.Header>Something went wrong!</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}

          <Segment>
            <Form.Field error={!!errors.email}>
              <label htmlFor="email">Email</label>
              <Form.Input icon='user' iconPosition='left'
              type="email"
              id="email"
              name="email"
              placeholder="example@domain.com"
              value={data.email}
              onChange={this.onChange}
              />
              {errors.email && <InlineError text={errors.email}/>}
            </Form.Field>

            <Form.Field error={!!errors.password}>
              <label htmlFor="password">Password</label>
              <Form.Input
              icon='lock'
              iconPosition='left'
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password}/>}
            </Form.Field>

            <Button color='teal' fluid size='large' >Login</Button>
          </Segment>
        </Form>
        <Message>
        You don't have an account? <Link to = "/signup"> Sign up</Link>
        </Message>
      </Grid.Column>
    </Grid>

  )

  }

}

LoginForm.propTypes ={
  submit: PropTypes.func.isRequired
}


export default LoginForm;
