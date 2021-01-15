import React from 'react';
import {Form,Button, Header, Segment,List,Dropdown, Label} from 'semantic-ui-react';
import { Slider } from "react-semantic-ui-range";
import PropTypes from 'prop-types';
import {PREFERENCES} from '../../types'
import Components from './formComponents/Components';
import SemanticDatepicker from 'react-semantic-ui-datepickers';


class FindCarForm extends React.Component{
  state = {
    data:{
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
      price:0,
      startDate:'',
      endDate:''
    },
    startDate: new Date(),
    endDate:new Date(),
    minDate: new Date(),
    body:[],
    prefs:PREFERENCES,
    nr:1,
    errors:{}
  }

  getNrOfPers = () =>{
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

  onSubmit = () => {
    this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: {global: err.response.data.errors}})
        );
  };

  onNext = () =>{
      const {nr} = this.state;
      this.setState({
          nr: nr+1
      })
  }

  onPrevious = () =>{
    const {nr} = this.state;
    this.setState({
        nr: nr-1
    })
}

    onChange = e =>{

    this.setState({
      data:{...this.state.data, [e.target.name]: e.target.value}
  })
  };

  onSelect = (e,{name, value}) =>{

    this.setState({
      data:{...this.state.data, [name]: value}
    });
    }

    onDateSelect = (e,{name, value}) =>{
    let date = `${value.getDate()<10?`0${value.getDate()}`:`${value.getDate()}`}${value.getMonth()<10+1?`0${value.getMonth()+1}`:`${value.getMonth()+1}`}${value.getFullYear()}`
    this.setState({ [name]: value});
    this.setState({data:{...this.state.data, [name]:date}})
    this.props.select(name, value);
    }

  onCheck = (e,{name, checked}) =>
    this.setState({
      data:{...this.state.data, [name]: checked}
  });

  onSlideChange  = value =>{
    this.setState({
      data:{...this.state.data, price: value}
  })
  };

  saveState = (aux,prefs) =>{
    this.setState({
        body: aux,
        prefs: prefs
    });
  }

  render(){
    const {nr} = this.state;
    const {make,model,body_type,gear_type,fuel_type,color,production_year,no_of_seats,no_of_doors,power,location,price} = this.state.data
    const elems = {make,model,body_type,gear_type,fuel_type,color,production_year,no_of_seats,no_of_doors,power,location,price}
    
    switch(nr){
        case 1:
            return(
                <NeedsForm
                onNext={this.onNext}
                onChange={this.onChange}
                onSelect={this.onSelect}
                onDateSelect={this.onDateSelect}
                getNrOfPers={this.getNrOfPers}
                elems={elems}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                minDate={this.state.minDate}
                />
            )
        case 2:
            return (
            <PreferencesForm
            onNext={this.onNext}
            onPrevious={this.onPrevious}
            onChange={this.onChange}
            onSelect={this.onSelect}
            elems={elems}
            prefs={this.state.prefs}
            body={this.state.body}
            saveState={this.saveState}
            />
            )
        case 3:
            return( 
            <BudgetForm
            onNext={this.onNext}
            onPrevious={this.onPrevious}
            onChange={this.onSlideChange}
            elems={elems}
            />
            )
        case 4:
            return(
            <Confirm
            onSubmit={this.onSubmit}
            onPrevious={this.onPrevious}
            elems={elems}
            />
            )
        case 5: 
            return (<h1>We are finding best solution for you!</h1>)
        default:
            return(
                <NeedsForm
                onNext={this.onNext}
                onChange={this.onChange}
                onSelect={this.onSelect}
                onDateSelect={this.onDateSelect}
                getNrOfPers={this.getNrOfPers}
                elems={elems}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                minDate={this.state.minDate}
                />
            )
    }

  }

}

class NeedsForm extends React.Component {
    next = e =>{
        e.preventDefault()
        this.props.onNext()
    }

    render() {
        const {elems, onChange, onSelect, getNrOfPers} = this.props;
        return (
            <div>
                    <Form>
                    <Segment >
                        <Header>Needs</Header>
                        <Form.Field style={{maxWidth:'30%',margin:'0 auto'}}>
                        <label htmlFor="location">From which locality do you need a car?</label>
                        <Form.Input 
                        icon='map marker alternate' 
                        iconPosition='left'
                         type="text"
                         id="location"
                         name="location"
                         value={elems.location}
                        onChange={onChange}
                        />
                        </Form.Field>
                        <br/>
                        <Form.Field style={{maxWidth:'30%',margin:'0 auto'}}>
                        <label htmlFor="no_of_seats">How many people are you?</label>
                        <Dropdown
                        placeholder='Select nr of people'
                        fluid
                        name='no_of_seats'
                        onChange={onSelect}
                        selection
                        options={getNrOfPers()}
                        value={elems.no_of_seats}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label htmlFor='startDate' >Start date</label>
                        <SemanticDatepicker 
                            autoComplete='off'
                            name='startDate'
                            minDate={new Date()}
                            selected={this.props.startDate}
                            onChange={this.props.onDateSelect}
                        />
                        <label htmlFor='endDate' >End date</label>
                        <SemanticDatepicker 
                            autoComplete='off'
                            name='endDate'
                            minDate={this.props.minDate}
                            selected={this.props.endDate}
                            onChange={this.props.onDateSelect}
                        />
                        </Form.Field>
                        <br/>
                        <Button
                        primary
                        label="Continue"
                        onClick={this.next}
                        />
                    </Segment>
                    </Form>
            </div>
        )
    }
}

class PreferencesForm extends React.Component {

    state={
        
    }


    next = e =>{
        e.preventDefault()
        this.props.onNext()
    }

    back = e =>{
        e.preventDefault()
        this.props.onPrevious()
    }

    addPreference = (e,{value}) =>{
        let aux = this.props.body;
        if(value==='make'||value==="model"||value==="color"||value==="power"||value==="location")
        aux.push({id: aux.length, component: 'text', label: value})
        else 
        if(value==='body_type'||value==="fuel_type"|| value==="gear_type"|| value==="production_year"|| value==="no_of_seats"|| value==="no_of_doors")
        aux.push({id: aux.length, component: 'select', label: value})
        this.props.saveState(aux,this.props.prefs.filter(res => res.value !== value))
      
    }


    render() {
        const {elems, onChange, onSelect} = this.props;
        return (
            <div>
                    <Form>
                    <Segment>
                        <Header>Stage two, select your preferences</Header>
                        <Form.Field style={{maxWidth:'50%', margin:'0 auto'}}>
                        <label htmlFor="purpose">Add your preferences</label>
                        <Dropdown
                        placeholder='Select your preference to add'
                        fluid
                        onChange={this.addPreference}
                        selection
                        options={this.props.prefs}
                        />
                        </Form.Field>
                        
                        <Form.Field>
                        {this.props.body.map(block => Components(block, onChange, onSelect,elems))}
                        </Form.Field>
                        <br/>
                        <Button
                        primary
                        label="Back"
                        onClick={this.back}
                        />
                        <Button
                        primary
                        label="Continue"
                        onClick={this.next}
                        />
                        
                    </Segment>
                    </Form>
            </div>
        )
    }
}

class BudgetForm extends React.Component {
    next = e =>{
        e.preventDefault()
        this.props.onNext()
    }

    back = e =>{
        e.preventDefault()
        this.props.onPrevious()
    }

    render() {
        const {elems, onChange} = this.props;
        const settings ={
            start: 5,
            min: 5,
            max: 100,
            step: 5,
            onChange: onChange
            }
        return (
            <div>
                    <Form>
                    <Segment>
                        <Header>Now, please tell us your aproximately budget per day</Header>
                        <Form.Field style={{maxWidth:'50%', margin:'0 auto'}}>
                        <label htmlFor="price">What is your budget?</label>
                        <Slider
                        name='price'
                         value={elems.price}
                         settings={settings}
                        />
                        <Label color="teal">{elems.price}€</Label>
                        </Form.Field>
                        <br/>
                        <Button
                        primary
                        label="Back"
                        onClick={this.back}
                        />
                        <Button
                        primary
                        label="Continue"
                        onClick={this.next}
                        />
                        
                    </Segment>
                    </Form>
            </div>
        )
    }
}

class Confirm extends React.Component {
    confirm = () =>{
        this.props.confirm()
    }

    back = e =>{
        e.preventDefault()
        this.props.onPrevious()
    }

    render() {
        const { elems: {make,model,body_type,gear_type,fuel_type,color,production_year,no_of_seats,no_of_doors,power,location,price},onSubmit}=this.props
        return (
            <div>
                <Segment>
                <Header>Confirm your choises</Header>
                    <List>
                        {make!=='' && <List.Item>Make: {make}</List.Item>}
                        {model!=='' && <List.Item>Model: {model}</List.Item>}
                        {body_type!=='' && <List.Item>Body type: {body_type}</List.Item>}
                        {gear_type!=='' && <List.Item>Gear type: {gear_type}</List.Item>}
                        {fuel_type!=='' && <List.Item>Fuel type: {fuel_type}</List.Item>}
                        {color!=='' && <List.Item>Color: {color}</List.Item>}
                        {production_year!==0 && <List.Item>Production year: {production_year}</List.Item>}
                        {no_of_seats!==0 && <List.Item>Nr of seats: {no_of_seats}</List.Item>}
                        {no_of_doors!=='' && <List.Item>Nr of doors: {no_of_doors}</List.Item>}
                        {power!==0 && <List.Item>Power: {power}</List.Item>}
                        {location!=='' && <List.Item>Location: {location}</List.Item>}
                        {price!==10 && <List.Item>price: {price}</List.Item>}

                    </List>
                    <Button
                        primary
                        label="Back"
                        onClick={this.back}
                    />
                    <Button
                        primary
                        label="Confirm and continue"
                        onClick={onSubmit}
                    />
                    </Segment>
            </div>
        )
    }
}


FindCarForm.propTypes ={
  submit: PropTypes.func.isRequired
}






export default FindCarForm;
