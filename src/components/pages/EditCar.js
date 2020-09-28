import React from 'react';
import PropTypes from 'prop-types';
import EditCarForm from "../forms/EditCarForm";
import api from '../../api'

class EditCar extends React.Component{
  submit = (id,data) => api.car.editCar(id,data).then(()=> this.props.history.push('/mycars'));

  render(){
    return(
      <div style = {{backgroundColor:'#F2F2F2'}}>
        <EditCarForm id={this.props.location.state.id} submit={this.submit} />
      </div>
    );
  }
}

EditCar.propTypes={
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
};

export default EditCar;
