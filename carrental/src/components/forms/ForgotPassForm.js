import React from 'react';
import {Form,Button, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class ForgotPassForm extends React.Component{
  state = {
    data:{
      email:''
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
          this.setState({ errors: {global: 'The email is not registered!'}, loading: false })
        );
        
    }
  };

  validate = (data) =>{
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Email is invalid";
    return errors;

  }

  onChange = e =>
    this.setState({
      data:{...this.state.data, [e.target.name]: e.target.value}
  });
  render(){
    const {data, errors, loading} = this.state;
    return(
    <Form onSubmit={this.onSubmit} loading={loading}>
      {errors.global && (
        <Message negative>
        <Message.Header>Something went wrong!</Message.Header>
          <p>{errors.global}</p>
        </Message>
      )}

      <Form.Field error={!!errors.email}>
        <label htmlFor="email">Email</label>
        <input
        type="email"
        id="email"
        name="email"
        placeholder="example@domain.com"
        value={data.email}
        onChange={this.onChange}
        />
        {errors.email && <InlineError text={errors.email}/>}
      </Form.Field>

      <Button primary>Send email</Button>
    </Form>

  )

  }

}

ForgotPassForm.propTypes ={
  submit: PropTypes.func.isRequired
}


export default ForgotPassForm;
