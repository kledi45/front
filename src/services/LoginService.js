const axios = require('axios');
import jwt_decode from 'jwt-decode';

export async function loginUser(email, password) {

  axios.post('https://localhost:7186/api/Login/Login?email=' + email + '&password=' + password)
    .then(response => {
      localStorage.setItem('userData', JSON.stringify(response.data));
      const item = localStorage.getItem('userData');
      // Decode the token
      const decodedToken = jwt_decode(item);

      // Access the userId from the decoded token
      const userId = decodedToken.UserId;
      localStorage.setItem('userId', userId);
      // Redirect the user to the home page
      window.location.href = '/';
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
}

export async function signOutUser(token) {
  try {
    const cleanedToken = token.replace(/"/g, '').replace(/\\/g, '');
    const response = await axios.post('https://localhost:7186/api/Login/SignOut', null, {
      headers: {
        'Authorization': `Bearer ${cleanedToken}`
      }
    });

    if (response.status == 200) {
      localStorage.clear('userData');
      window.location.href = '/login';
    }
  } catch (error) {
    console.error(error);
  }
}


