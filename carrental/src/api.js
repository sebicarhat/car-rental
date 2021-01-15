import axios from 'axios';

export default {
  user:{
    login:(credentials) => axios.post('/authenticate?email='+credentials.email+'&password='+credentials.password).then(res => res.data),
    signup: user => axios.post('/user',user).then(res => res.data),
    editProfile:(id,user) => axios.put('/user/'+id,user).then(res=>res.data),
    getUser:(id) => axios.get('/user/'+id).then(res => res.data)
  },
  car:{
    addNew: data => axios.post('/car',data).then(res => res.data),
    getMyCars: userId => axios.get('/mycars?id='+userId).then(res => res.data),
    getById:carId => axios.get("/car/"+carId).then(res => res.data),
    editCar:(id,car) => axios.put('/car/'+id,car).then(res=>res.data),
    activate: carId => axios.post('/activateCar?id='+carId).then(res => res.data),
    disable: carId => axios.post('/disableCar?id='+carId).then(res => res.data),
    getAvailable: (data) =>
    axios.get('/availablecars?start='+data.startDate+'&end='+data.endDate+'&location='+data.location).then(res => res.data),
    getByPreferences: (data) =>
    axios.post('/filteredcars',data).then(res => res.data)
    },
  booking:{
    getBookings: userId => axios.get('/ownbookings?id='+userId).then(res => res.data),
    getMyBookings: userId => axios.get('/mybookings?id='+userId).then(res => res.data),
    updateBookingStatus:(booking_id, status) => axios.get('/updatebookingstatus?id='+booking_id+'&status='+status),
    delete: bookingId => axios.delete('/booking/'+bookingId).then(res => res.data),
    makeBooking: booking => axios.post('/booking',booking).then(res => res.data)
  },
  review:{
    addReview: (review,bookingId) => axios.post('/adduserreview/'+bookingId,review).then(res => res.data),
    getByUser: userID => axios.get('/reviews?userid='+userID).then(res => res.data)
  },
  file:{
    upload: (formdata,config) => axios.post('/uploadFile',formdata, config).then(res => res.data)
  }
}
