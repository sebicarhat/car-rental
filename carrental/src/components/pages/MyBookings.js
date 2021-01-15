import React from 'react';
import {Card,Button,Icon,Image,Message,Confirm} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import api from '../../api'
import ReviewPopup from '../popups/ReviewPopup';

class MyBookings extends React.Component {
  
    state = {
      bookings: [],
      showConfirmation:false
    }


    showConfirmation=()=>{
      this.setState({showConfirmation:true})
    }
  
    hideConfirmation=()=>{
      this.setState({showConfirmation:false});
    }

  submit = (data,bookingId) => api.review.addReview(data,bookingId).then(()=>{this.showConfirmation(); this.componentDidMount();})
  
  componentDidMount(){
    api.booking.getMyBookings(localStorage.userId).then(res => this.setState({bookings: res}))
  }


  getDate(date){
      var aux = date;
      var year = parseInt(aux.slice(0,4));
       aux = date;
      var month = parseInt(aux.slice(5,7))-1;
       aux = date;
      var day = parseInt(aux.slice(8,10));
    return new Date(year,month,day);
  }

  cancelBooking(booking_id){
    api.booking.updateBookingStatus(booking_id,"CANCELED").then(() => this.componentDidMount())
  }

  render() {
    var mainStyle = {backgroundColor: '#F2F2F2', marginTop:-15, padding:10, minHeight:1000}
    return (
      <div style = {mainStyle}>
          <h1>My bookings</h1>
          <Link to = '/'>
          <Button primary style= {{float: 'right' }} size='large'> <Icon name='add circle' /> New booking </Button>
        </Link>
        <Card.Group style={{margin:20}}>
            {this.state.bookings.map( (b) =>
            <Card key={b.booking_id}>
            <Card.Content>
                <Image
                    floated='right'
                    size='small'
                    src={b.image_url}
                  />
                <Card.Header>{b.make}</Card.Header>
                <Card.Header>{b.model}</Card.Header>
                <Card.Header>{b.production_year}</Card.Header>
                <Card.Meta>{b.start_date_time.split(' ')[0]}</Card.Meta>
                <Card.Meta>{b.end_date_time.split(' ')[0]}</Card.Meta>
                <Card.Description><Icon name='user'>{" "+b.username}</Icon></Card.Description>
            </Card.Content>
            <Card.Content >
              {b.status==='CANCELED' ?
                <Button fluid color='red' disabled>{b.status}</Button>
                :
                b.status==='NEW' ?
                <Button fluid color='green' disabled>{b.status}</Button>
                :
                <Button fluid color='teal' disabled>{b.status}</Button>
              }
              
            </Card.Content>
            <Card.Content extra>
                <div>
                {this.getDate(b.start_date_time ) > new Date() &&  b.status!=='CANCELED'&& 
                <Button fluid basic color='red' onClick={() => { if (window.confirm('Are you sure you want to cancel this booking?')) this.cancelBooking(b.booking_id)}}>
                  Cancel booking
                </Button>
                }
                {this.getDate(b.end_date_time ) < new Date() && b.has_review==='false'?
                <ReviewPopup submit={this.submit} bookingId={b.booking_id} fromUserId = {b.user_id} toUserId={b.car_user_id}/>
                : b.has_review==='true' &&
                <Button fluid color='teal' disabled>Reviewed</Button>
                }

                </div>
            </Card.Content>
            
            </Card>
            )}
            {
            this.state.bookings.length===0 && 
            <Message negative>
                      <Message.Header>Looks like you don't have a reservation yet</Message.Header>
                          <p> What are you waiting for? Look for an offer.</p>
                            
                  </Message> 
            }
            </Card.Group>
            
            <Confirm
                    open={this.state.showConfirmation}
                    content={"Thank you for your review!"}
                    onConfirm={this.hideConfirmation}
                />
        </div>
    )
  }
}

export default MyBookings;
