import React from 'react';
import {Form,Button, Message, Grid, Header,Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import {Link} from 'react-router-dom'

class SignUpForm extends React.Component{
  state = {
    data:{
      email:'',
      password:''
    },
    cpassword:'',
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
          this.setState({ errors: {global: err.response.data.message},loading:false })
        );
        
    }
  };

  validate = (data) =>{
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Email is invalid";
    if(!data.password) errors.password="Password label can't be blank";
    if(data.password !== this.state.cpassword) errors.cpassword = "The passwords do not match";
    return errors;
  }

  onChange = e =>
    this.setState({
      data:{...this.state.data, [e.target.name]: e.target.value},
      [e.target.name]: e.target.value
  });

  render(){
    const {data, cpassword, errors, loading} = this.state;
    return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 400 }}>
        
        <Form size='large' onSubmit={this.onSubmit} loading={loading}>
        <Header as='h1' color='teal' textAlign='center'>
           Sign up for free
        </Header>
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
            <Form.Field error={!!errors.username}>
              <label htmlFor="username">Name</label>
              <Form.Input icon='user' iconPosition='left'
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={this.onChange}
              />
              {errors.username && <InlineError text={errors.username}/>}
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
            <Form.Field error={!!errors.cpassword}>
              <label htmlFor="cpassword">Confirm password</label>
              <Form.Input
              icon='lock'
              iconPosition='left'
              type="password"
              id="cpassword"
              name="cpassword"
              value={cpassword}
              onChange={this.onChange}
              />
              {errors.cpassword && <InlineError text={errors.cpassword}/>}
            </Form.Field>

            <Button color='teal'>SignUp</Button>
          </Segment>
          <Link to='/login'>Back to login page</Link>
        </Form>
      </Grid.Column>
    </Grid>

  )

  }

}

SignUpForm.propTypes ={
  submit: PropTypes.func.isRequired
}


export default SignUpForm;
