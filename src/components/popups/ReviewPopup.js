import React from 'react';
import PropTypes from 'prop-types';
import {Message, Form, Button, Popup, TextArea, Rating} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';


class ReviewPopup extends React.Component {

    state = {
        data:{
          from_user_id:this.props.fromUserId,
          to_user_id:this.props.toUserId,
          rstars:0,
          rtitle:'',
          rdesc:'',
          rdate:new Date()
        },
        booking_id:this.props.bookingId,
        errors:{}
      }
      


    onSubmit = () => {
        const  errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
          this.props
            .submit(this.state.data, this.state.booking_id)
            .catch(err =>
              this.setState({ errors: err.response.data.message})
            );
            
        }
      };
    
    validate = (data) =>{
        const errors = {};
        if(!data.rtitle) errors.title="Title label can't be blank";
        if(!data.rdesc) errors.desc="Please write a short description";
        return errors;
      }
    
    onChange = e =>
        this.setState({
          data:{...this.state.data, [e.target.name]: e.target.value}
      });  

    onRate = (e,{name,rating}) =>{
      this.setState({
        data:{...this.state.data, [name]:rating}
      });
    }

    render() {
        const {data,errors} = this.state;
        return (
            <div>
                <Popup trigger={<Button fluid basic color='teal'>Add a review</Button>} flowing hoverable>
                    <Form size='large' onSubmit={this.onSubmit}>
                        {errors.global && (
                            <Message negative>
                            <Message.Header>Something went wrong!</Message.Header>
                            <p>{errors.global}</p>
                            </Message>
                        )}
                        <Form.Field>
                            <label htmlFor="stars">Stars </label>
                            <Rating 
                            id='stars'
                            name='rstars'
                            icon='star' 
                            defaultRating={data.rstars} 
                            maxRating={5} 
                            onRate = {this.onRate}
                            />
                        </Form.Field>
                        <Form.Field error={!!errors.title}>
                            <label htmlFor="title">Title</label>
                            <Form.Input
                            type="text"
                            id="title"
                            name="rtitle"
                            value={data.rtitle}
                            onChange={this.onChange}
                            />
                            {errors.title && <InlineError text={errors.title}/>}
                        </Form.Field>
                        <Form.Field error={!!errors.desc}>
                            <label htmlFor="desc">Description</label>
                            <TextArea
                            id="desc"
                            name="rdesc"
                            value={data.rdesc}
                            onChange={this.onChange}
                            />
                            {errors.title && <InlineError text={errors.desc}/>}
                        </Form.Field>
                        <Button primary>Submit review</Button>
                        
                    </Form>
                </Popup>
            </div>
        )
    }
    
}

ReviewPopup.propTypes ={
  submit: PropTypes.func.isRequired
}

  export default ReviewPopup