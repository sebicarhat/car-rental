import React from 'react';
import {Form,Button, Message, Grid, Header, Segment,Checkbox} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import api from '../../api'

class EditProfileForm extends React.Component{
  state = {
    data:{
        user_id:0,
        username:'',
        password:'',
        role:'',
        email:'',
        telephone:'',
        reviews:[]
    },
    password:'',
    oldpassword:'',
    errors:{}
  }


  componentDidMount(){
    api.user.getUser(localStorage.userId).then(res => {
        this.setState({data: res})
        this.setState({oldpassword: res.password})
        this.setState({data:{...this.state.data, password: ''}})
    })
  }

  onSubmit = () => {
    const  errors = this.validate(this.state.data);
    this.setState({errors});
    let id=this.state.data.user_id;
      delete this.state.data.user_id;
    if(this.state.data.password==='')
    this.setState(currentState => ({data:{...this.state.data, password: this.state.oldpassword}}), () => {
        if(Object.keys(errors).length === 0){
            this.props
              .submit(id,this.state.data)
              .catch(err =>
                this.setState({ errors:{global: err.response.data.message} })
              );
          }
    });
     
    
  };

  onCheck = (e,{name, checked}) =>
  {
    if(checked)
    this.setState({
      data:{...this.state.data, role: 'admin'}});
      else 
      this.setState({
        data:{...this.state.data, role: null}});

  }

  validate = (data) =>{
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Email is invalid";
    if(this.state.password!==this.state.oldpassword)
        errors.oldPassword="The old password is incorrect";
    return errors;
}

  onChange = e =>
    this.setState({
      data:{...this.state.data, [e.target.name]: e.target.value}
  });

  onChangePassword = e =>
  this.setState({[e.target.name]: e.target.value});

  render(){
    const {data, errors, password} = this.state;
    return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as='h1' color='teal' textAlign='center'>
           Edit your profile
        </Header>
        <Form size='large' onSubmit={this.onSubmit} >
          {errors.global && (
            <Message negative>
            <Message.Header>Something went wrong!</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}

          <Segment>

          <Form.Field error={!!errors.userId}>
              <label htmlFor="userId">User id</label>
              <Form.Input icon='user' iconPosition='left'
              type="text"
              id="userId"
              name="userId"
              value={data.user_id}
              readOnly={true}
              />
              {errors.userId && <InlineError text={errors.userId}/>}
            </Form.Field>

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

            <Form.Field error={!!errors.oldPassword}>
              <label htmlFor="oldPassword">Old Password</label>
              <Form.Input
              icon='lock'
              iconPosition='left'
              type="password"
              id="oldassword"
              name="password"
              value={password}
              onChange={this.onChangePassword}
              />
              {errors.oldPassword && <InlineError text={errors.oldPassword}/>}
            </Form.Field>

            <Form.Field error={!!errors.password}>
              <label htmlFor="password">New Password</label>
              <Form.Input
              icon='lock'
              iconPosition='left'
              type="password"
              id="password"
              name="password"
              onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password}/>}
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

            <Form.Field error={!!errors.telephone}>
              <label htmlFor="telephone">Telephone</label>
              <Form.Input icon='phone' iconPosition='left'
              type="text"
              id="telephone"
              name="telephone"
              value={data.telephone}
              onChange={this.onChange}
              />
              {errors.telephone && <InlineError text={errors.telephone}/>}
            </Form.Field>
            <Form.Field>
              <label htmlFor="active">Activate the account to add your own car</label>
              <Checkbox
              id="active"
              name="active"
              checked={data.role==='admin'}
              onChange={this.onCheck}
              />
            </Form.Field>


            

            <Button color='teal' fluid size='large' onSubmit={this.onSubmit}>Edit your profile</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>

  )

  }

}

EditProfileForm.propTypes ={
  submit: PropTypes.func.isRequired
}


export default EditProfileForm;
