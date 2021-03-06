import { userLoggedIn } from "./auth";
import api from '../api';

export const signup = data => dispatch =>
api.user.signup(data).then(user=>{
    localStorage.userData = user.email;
    dispatch(userLoggedIn(user))
   })