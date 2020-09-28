import React from 'react';
import {Card,Button,Image, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import api from '../../api'

class MyCars extends React.Component {
  
    state = {
      cars: []
    }
  
  componentDidMount(){
    api.car.getMyCars(localStorage.userId).then(res => this.setState({cars: res}))
  }

  clickActivate(car_id){
    api.car.activate(car_id);
    window.location.reload();
  }

  clickDisable(car_id){
    api.car.disable(car_id);
    window.location.reload();
  }

  render() {
    var centeredStyle = {position:'absolute',top: '35%',transform: 'translate(0%,-25%)' }
    var mainStyle = {backgroundColor: '#F2F2F2', marginTop:-15, padding:10, minHeight:1000}
    return (
      <div style = {mainStyle}>
        <h1 >Your cars</h1>
        <Link to = '/newcar'>
          <Button primary style= {{float: 'right' }} size='large'> <Icon name='add circle' /> New car </Button>
        </Link>
        
        <Card.Group style={centeredStyle}>
          {this.state.cars.map( (car) =>
          <Card key = {car.car_id}>
            <Card.Content>
              <Image
                floated='right'
                size='small'
                src={car.image_url}
              />
              <Card.Header>{car.make}</Card.Header>
              <Card.Header>{car.model}</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Meta>{car.production_year}</Card.Meta>
              <Card.Meta>{car.fuel_type}</Card.Meta>
              <Card.Meta>{car.gear_type}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                {car.active ?   
                <Button basic color='red' onClick={() => this.clickDisable(car.car_id)}>
                <Icon name='ban'/>Disable
                </Button>
                :
                <Button basic color='green' onClick={() => this.clickActivate(car.car_id)}>
                 <Icon name='arrow alternate circle up outline'/> Activate
                </Button>
                  }
                <Link to={{
                    pathname: '/editcar',
                    state: {
                      id: car.car_id
                    }
                  }}><Button basic color='teal'><Icon name='edit'/>Edit</Button></Link>
              </div>
            </Card.Content>
          </Card>
          )}
          </Card.Group>
        </div>
    )
  }
}

export default MyCars;
