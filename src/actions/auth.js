import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../types'
import api from '../api';
export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const login = (credentials) => (dispatch) =>
api.user.login(credentials).then(user => {
  localStorage.userData = user.email;
  localStorage.userRole = user.role;
  localStorage.userId = user.user_id;
  dispatch(userLoggedIn(user));
 });

 export const logout = () => dispatch =>{
  localStorage.removeItem('userData');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  dispatch(userLoggedOut());
 };

 export const resetPassword = ({email}) => () => api.user.resetPassword(email)

