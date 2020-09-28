import React from 'react';
import {Form,Button, Message, Checkbox, Grid, Header, Segment,Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from "../messages/InlineError";
import {BODY_TYPE, FUEL_TYPE, GEAR_TYPE, NO_OF_DOORS} from '../../types';
import api from '../../api'

class NewCarForm extends React.Component{
  state = {
    data:{
      user_id:localStorage.userId,
      make:'',
      model:'',
      body_type:'',
      gear_type:'',
      fuel_type:'',
      color:'',
      production_year:0,
      no_of_seats:0,
      no_of_doors:'',
      power:0,
      location:'',
      active:false,
      image_url:'',
      price:0
    },
    image:null,
    loading: false,
    errors:{}
  }

  onSubmit = () => {
    const  errors = this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0){
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: {global: 'There was an error when adding new car'}})
        );
    }
  };

  validate = (data) =>{
    const errors = {};
    if(!data.make) errors.make="Make label can't be blank";
    if(!data.model) errors.model="Model label can't be blank";
    if(!data.body_type) errors.body_type="Select body type";
    if(!data.fuel_type) errors.fuel_type="Select fuel type";
    if(!data.gear_type) errors.gear_type="Select gear type";
    if(!data.color) errors.color="Color label can't be blank";
    if(data.production_year===0) errors.production_year="Select production year";
    if(data.no_of_doors===0) errors.no_of_doors="Select nr of doors";
    if(!data.no_of_seats) errors.no_of_seats="Select nr of seats";
    if(data.power===0) errors.power="Power label can't be blank";
    else if(!Validator.isInt(data.power)) errors.power="Please insert an integer number"
    return errors;
  }

  getYears = () => {
    let options=[]
    const thisYear = (new Date()).getFullYear();
    for (let i = thisYear; i >= 1900; i--) {
      options.push({
        key: i,
        text: i,
        value: i
      });
    }
    return options;
  }

  getNrOfSeats = () =>{
    let options=[]
    for (let i = 1; i <= 9; i++) {
      options.push({
        key: i,
        text: i,
        value: i
      });
    }
    return options;
  }

  onChange = e =>{
    this.setState({
      data:{...this.state.data, [e.target.name]: e.target.value}
  })
  };

  onSelect = (e,{name, value}) =>
    this.setState({
      data:{...this.state.data, [name]: value}
  });

  onCheck = (e,{name, checked}) =>
    this.setState({
      data:{...this.state.data, [name]: checked}
  });

  onFileSelect = e =>{
    this.setState({image: e.target.files[0]})
  }

  upload = (image) => {
  const formData = new FormData();
  formData.append('file',image)
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }
  api.file.upload(formData,config).then(res => this.setState({data:{...this.state.data,  image_url:res}}))
  }


  render(){
    const {data, errors} = this.state;
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 850 }}>
        <Header as='h1' color='teal' textAlign='center'> Add new car</Header>
        <Form onSubmit={this.onSubmit}>
          {errors.global && (
            <Message negative>
            <Message.Header>Something went wrong!</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}
          <Segment style={{ display:'flex' }}>
            <Grid.Column style={{ minWidth: 350, margin:20 }}>
            <Form.Field error={!!errors.make}>
              <label htmlFor="make">Make</label>
              <Form.Input
              type="text"
              id="make"
              name="make"
              value={data.make}
              onChange={this.onChange}
              />
              {errors.make && <InlineError text={errors.make}/>}
            </Form.Field>
            <Form.Field error={!!errors.model}>
              <label htmlFor="model">Model</label>
              <Form.Input
              type="text"
              id="model"
              name="model"
              value={data.model}
              onChange={this.onChange}
              />
              {errors.model && <InlineError text={errors.model}/>}
            </Form.Field>
            
            <Form.Field error={!!errors.body_type}>
              <label htmlFor="body_type">Body type</label>
              <Dropdown
              placeholder='Select body type'
              fluid
              name='body_type'
              onChange={this.onSelect}
              selection
              options={BODY_TYPE}
              value={data.body_type}
              />
              {errors.body_type && <InlineError text={errors.body_type}/>}
            </Form.Field>
            <Form.Field error={!!errors.gear_type}>
              <label htmlFor="gear_type">Gear type</label>
              <Dropdown
              placeholder='Select gear type'
              fluid
              name='gear_type'
              onChange={this.onSelect}
              selection
              options={GEAR_TYPE}
              value={data.gear_type}
              />
              {errors.gear_type && <InlineError text={errors.gear_type}/>}
            </Form.Field>
            <Form.Field error={!!errors.fuel_type}>
              <label htmlFor="fuel_type">Fuel type</label>
              <Dropdown
              placeholder='Select fuel type'
              fluid
              name='fuel_type'
              onChange={this.onSelect}
              selection
              options={FUEL_TYPE}
              value={data.fuel_type}
              />
              {errors.fuel_type && <InlineError text={errors.fuel_type}/>}
            </Form.Field>
            <Form.Field error={!!errors.color}>
              <label htmlFor="fuel_type">Color</label>
              <Form.Input
              type="text"
              id="color"
              name="color"
              value={data.color}
              onChange={this.onChange}
              />
              {errors.color && <InlineError text={errors.color}/>}
            </Form.Field>
            <Form.Field error={!!errors.production_year}>
              <label htmlFor="production_year">Production year</label>
              <Dropdown
              placeholder='Select production year'
              fluid
              name='production_year'
              onChange={this.onSelect}
              selection
              options={this.getYears()}
              value={data.production_year}
              />
              {errors.production_year && <InlineError text={errors.production_year}/>}
            </Form.Field>
            </Grid.Column>
            <Grid.Column style={{ minWidth: 350 , margin:20}}>
            
            <Form.Field error={!!errors.no_of_doors}>
              <label htmlFor="no_of_doors">Nr of doors</label>
              <Dropdown
              placeholder='Select nr of doors'
              fluid
              name='no_of_doors'
              onChange={this.onSelect}
              selection
              options={NO_OF_DOORS}
              value={data.no_of_doors}
              />
              {errors.no_of_doors && <InlineError text={errors.no_of_doors}/>}
            </Form.Field>
            <Form.Field error={!!errors.no_of_seats}>
              <label htmlFor="no_of_seats">Nr of seats</label>
              <Dropdown
              placeholder='Select nr of seats'
              fluid
              name='no_of_seats'
              onChange={this.onSelect}
              selection
              options={this.getNrOfSeats()}
              value={data.no_of_seats}
              />
              {errors.no_of_seats && <InlineError text={errors.no_of_seats}/>}
            </Form.Field>
            <Form.Field error={!!errors.power}>
              <label htmlFor="power">Power (kw)</label>
              <Form.Input
              type="text"
              id="power"
              name="power"
              value={data.power}
              onChange={this.onChange}
              />
              {errors.power && <InlineError text={errors.power}/>}
            </Form.Field>
            <Form.Field error={!!errors.location}>
              <label htmlFor="fuel_type">Pick-up location</label>
              <Form.Input
              icon='map marker alternate'
              iconPosition='left'
              type="text"
              id="location"
              name="location"
              value={data.location}
              onChange={this.onChange}
              />
              {errors.color && <InlineError text={errors.color}/>}
            </Form.Field>
            <Form.Field error={!!errors.price}>
              <label htmlFor="power">Price</label>
              <Form.Input
              type="text"
              id="price"
              name="price"
              value={data.price}
              onChange={this.onChange}
              />
              {errors.price && <InlineError text={errors.price}/>}
            </Form.Field>
            <Form.Field>
              <label htmlFor="active">Active for rent</label>
              <Checkbox
              id="active"
              name="active"
              checked={data.active}
              onChange={this.onCheck}
              />
            </Form.Field>
            <Form.Field>
            <input 
            style={{display:'none'}}
            type="file" 
            name="image" 
            onChange= {this.onFileSelect} 
            ref={fileInput => this.fileInput = fileInput}
            />
            <Button color='teal' type='button' onClick={()=> this.fileInput.click()}>Select an image</Button>
            <Button color='teal' type='button' onClick={() => this.upload(this.state.image)}>Upload</Button>
            </Form.Field>
            </Grid.Column>
            <br/>
            <Grid.Column>
            <Button primary size='large' type='submit' onClick={() => this.upload(this.state.image)}>Add this car</Button>
            </Grid.Column>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    )
  }
}

NewCarForm.propTypes ={
  submit: PropTypes.func.isRequired
}


export default NewCarForm;
