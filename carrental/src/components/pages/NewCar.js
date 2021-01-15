import React from 'react';
import PropTypes from 'prop-types';
import NewCarForm from "../forms/NewCarForm";
import api from '../../api'

class NewCar extends React.Component{
  submit = data => api.car.addNew(data).then(()=> this.props.history.push('/mycars'));

  render(){
    return(
      <div style = {{backgroundColor: '#F2F2F2'}}>
        <NewCarForm submit={this.submit} />
      </div>
    );
  }
}

NewCar.propTypes={
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
};

export default NewCar;
