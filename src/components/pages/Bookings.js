import React from 'react';
import {Card,Button,Icon,Image,Message} from 'semantic-ui-react';
import api from '../../api'

class Bookings extends React.Component {
  
  state = {
      bookings: []
    }



  submit = data => api.review.addReview(data).then(res => res.data)
  
  componentDidMount(){
    api.booking.getBookings(localStorage.userId).then(res => this.setState({bookings: res}))
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

  setBookingStatus(booking_id,status){
    api.booking.updateBookingStatus(booking_id,status).then(() => this.componentDidMount())
  }

  render() {
    console.log(this.state)
    var mainStyle = {backgroundColor: '#F2F2F2', marginTop:-15, padding:20, minHeight:1000}
    return (
      <div style = {mainStyle}>
        <div>
          <h1>Rental requests</h1>
        </div>
        <div>
        <Card.Group style={{margin:20}}>
            {this.state.bookings.map( (b) =>
            <Card key = {b.booking_id}>
            <Card.Content>
              <Image
                    floated='right'
                    size='small'
                    src={b.image_url}
                  />
                <Card.Header>{b.make}</Card.Header>
                <Card.Header>{b.model}</Card.Header>
                <Card.Header>{b.production_year}</Card.Header>
                <br/>
                <Card.Meta>{b.start_date_time.split(' ')[0]}</Card.Meta>
                <Card.Meta>{b.end_date_time.split(' ')[0]}</Card.Meta>
                <Card.Meta><Icon name='user'>{" "+b.username}</Icon></Card.Meta>
                <Card.Meta><Icon name='mail'>{" "+b.email}</Icon></Card.Meta>
                <Card.Meta><Icon name='phone'>{" "+b.telephone}</Icon></Card.Meta>
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
              {
                b.status==="NEW" &&
                <div className='ui two buttons'>
                <Button color='green' onClick={()=>this.setBookingStatus(b.booking_id,"APPROVED")}>
                <Icon name="check"/>Approve booking</Button>  
                <Button color='red' onClick={() => { if (window.confirm('Are you sure you want to remove this booking?')) this.setBookingStatus(b.booking_id,"CANCELED")}}>
                <Icon name="ban"/>  Decline booking
                </Button>
                </div>
              }
              
            </Card.Content>
            </Card>
            )}
            </Card.Group>
            {
              this.state.bookings.length===0 && 
              <Message negative>
                        <Message.Header>You don't have any rental request</Message.Header>
                            <p> Please waiting, your requests will come soon.</p>
                              
                    </Message> 
              }
        </div>
      </div>
    )
  }
}

export default Bookings;
