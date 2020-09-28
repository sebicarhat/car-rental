import React, { Component } from 'react'
import {Label,Item,Button, Icon, Segment, Form, Message, Confirm} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import api from '../../api';
import FindCarForm from '../forms/FindCarForm'

export default class RentalCars extends Component {

    constructor(props){
        super(props);
        this.state={
            data:{
            startDate: new Date(),
            endDate: new Date(),
            location:''
            },
            minDate: new Date(),
            car:[],
            searched:false,
            show:false,
            showConfirmation:false,
            newBookingId:0
            }
    }



    toStringDate = (date) =>{
        return `${date.getDate()}${date.getMonth()<10?` 0${date.getMonth()}`:` ${date.startDate.getMonth()}`}${` ${date.getFullYear()}` }` 
    }

    show = () => this.setState({ show: true })
    hide = () => this.setState({ show: false })
    showConfirmation = () => this.setState({ showConfirmation: true })
    hideConfirmation = () => this.setState({ showConfirmation: false })

    onChange = e =>
    this.setState({
      data:{...this.state.data, [e.target.name]: e.target.value}
    });

    onSelect = (e,{name, value}) =>{
        this.setState({
        data:{...this.state.data, [name]: value}
    })
    this.setState({minDate:value})
    };

    onSelectDate = (name,value) =>
    this.setState({
        data:{...this.state.data, [name]: value}
    })

    makeBooking = (carId) => {
        var booking = {
            user_id:localStorage.userId,
            car_id:carId,
            start_date_time:this.state.data.startDate,
            end_date_time:this.state.data.endDate,
            has_review:false,
            status:'NEW'
        }
        api.booking.makeBooking(booking).then(res =>{
            this.setState({newBookingId:res.booking_id});
            this.hide();
            this.showConfirmation();
            
        }
            
            
        )
    }



    onClick = () => {
        let data = this.state.data
        let start = `${data.startDate.getDate()<10?`0${data.startDate.getDate()}`:`${data.startDate.getDate()}`}${data.startDate.getMonth()+1<10?`0${data.startDate.getMonth()+1}`:`${data.startDate.getMonth()+1}`}${data.startDate.getFullYear()}`
        let end= `${data.endDate.getDate()<10?`0${data.endDate.getDate()}`:`${data.endDate.getDate()}`}${data.endDate.getMonth()+1<10?`0${data.endDate.getMonth()+1}`:`${data.endDate.getMonth()+1}`}${data.endDate.getFullYear()}`
        let date = {startDate: start, endDate: end, location: this.state.data.location}
        api.car.getAvailable(date).then(res => this.setState({car: res})).catch( err => { console.log(err); })
        this.setState({searched:true})
    }

    getTotalPrice =(price) =>{
        return (this.state.data.endDate.getTime()-this.state.data.startDate.getTime())/ (1000 * 3600 * 24)*price
    }

    submit = (data) => 
    api.car.getByPreferences(data).then(res => this.setState({car: res, searched:true})).catch( err => { console.log(err); })

    render() {
        var mainTextStyle = {color:'white',fontFamily:'Minion Pro',fontSize:'270%'}
        var mainDivStyle = {padding:'5% 20%',backgroundImage: "url(" + process.env.PUBLIC_URL + '/background.png' + ")",backgroundSize: '100%'}
        var searchFormStyle = { display:'flex',justifyContent: 'space-between'}
        var labelStyle = {fontFamily:'Minion Pro', fontSize:'150%', color:'white'}
        return (

            <div style={{height: '100%'}}>
                <div style={mainDivStyle}>
                <h1 style={mainTextStyle} > Find yourself a car by date and location</h1>
                <Form style={searchFormStyle}>
                <Form.Field>
                <label htmlFor='startDate' style={labelStyle}>Start date</label>
                <SemanticDatepicker 
                    autoComplete='off'
                    name='startDate'
                    minDate={new Date()}
                    selected={this.state.data.startDate}
                    onChange={this.onSelect}
                />
                <label htmlFor='endDate' style={labelStyle}>End date</label>
                <SemanticDatepicker 
                    autoComplete='off'
                    name='endDate'
                    minDate={this.state.minDate}
                    selected={this.state.data.endDate}
                    onChange={this.onSelect}
                />
                </Form.Field>
                <Form.Field>
                <label htmlFor="location" style={labelStyle}>Pickup location</label>
                <Form.Input icon='map marker alternate'
                type="text"
                id="location"
                name="location"
                value={this.state.data.location}
                onChange={this.onChange}
                />
                <Button onClick={this.onClick}><Icon name = 'search'/>Find available cars</Button>
                </Form.Field>
                </Form>
                <h1 style={mainTextStyle}>or</h1>
                
                </div>
                <div style={{zIndex:'-99999'}}>
                <Segment style={{textColor:'teal'}}>
                <h1>Let us find the right car for your needs, preferences and budget</h1>
                </Segment>
                <br/>
                <FindCarForm submit={this.submit} select={this.onSelectDate}/>
                </div>
                <Item.Group   style={{ margin:'auto', width:'75%'}} >
                { this.state.car.length===0 && this.state.searched===true ? 
                <Message negative>
                    <Message.Header>We're sorry!</Message.Header>
                        <p>We can't find any offer for you, plase recheck your preferences</p>
                </Message> 
                : 
                this.state.car.map( (car) =>
                <Item style={{margin:'10px', borderRadius:'20px', padding:'10px', backgroundColor:'white'}}>
                <Item.Image style={{ maxHeight:'100%', display:'block', marginTop:'auto',marginBottom:'auto'}} 
                floated='left'
                src={car.image_url} />
                <Item.Content style={{margin:'20px'}}>
                <Item.Header as='a'>{car.make}{"\n"}{car.model}</Item.Header>
                    <Item.Meta>{car.production_year}</Item.Meta>
                    <Item.Extra>
                        <Label icon='car' content={car.body_type}/>
                        <Label icon='tag' content={car.gear_type}/>
                        <Label icon='fire' content={car.fuel_type}/>
                    </Item.Extra>
                    <Item.Extra>
                        <Label icon='tag' content={car.nr_of_seats}/>
                        <Label icon='tag' content={car.nr_of_doors}/>
                        <Label icon='tint' content={car.color}/>
                        <Label icon='cogs' content={car.power}/>
                    </Item.Extra>   
                    <Item.Extra>
                        <label>Rented by </label>
                        <Label icon='user' content={car.username}/>
                        <Link to={{
                            pathname: '/userreviews',
                            state: {
                            id: car.user_id
                            }}}><Label icon='star' content={car.note.slice(0,4)}/></Link>
                    </Item.Extra>
                    <Item.Extra>
                        <Icon name='euro sign'/>
                        <label>{car.price}</label>
                        <Button primary floated='right' onClick={this.show}>
                            Rent this car for selected period
                            <Icon name='right chevron' />
                         </Button>
                         <Confirm style={{whiteSpace:'pre-line'}}
                            open={this.state.show}
                            content={ 'Make: '+car.make+'\nModel: '+car.model+'\nProduction year: '+car.production_year+'\nRental period: from '+this.toStringDate(this.state.data.startDate)+' to '+this.toStringDate(this.state.data.endDate)+'\nTotal price: '+this.getTotalPrice(car.price)+' €'}
                            onCancel={this.hide}
                            onConfirm={()=>this.makeBooking(car.car_id)}
                            />
                    </Item.Extra>
                </Item.Content>
                </Item>
                )}
                </Item.Group>
                <Confirm
                    open={this.state.showConfirmation}
                    content={"Thank you for your booking!\n Your booking id is: "+this.state.newBookingId}
                    onConfirm={this.hideConfirmation}
                />
            </div>
        )
    }
}


