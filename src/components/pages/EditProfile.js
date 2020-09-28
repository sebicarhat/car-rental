import React from 'react';
import PropTypes from 'prop-types';
import EditProfileForm from "../forms/EditProfileForm";
import api from '../../api'

class EditProfile extends React.Component{
  submit = (id,data) => api.user.editProfile(id,data).then(()=> this.props.history.push('/'));

  render(){
    return(
      <div style = {{backgroundColor:'#F2F2F2'}}>
        <EditProfileForm submit={this.submit} />
      </div>
    );
  }
}

EditProfile.propTypes={
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
};

export default EditProfile;
