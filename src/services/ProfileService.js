const axios = require('axios');

export async function getProfile(){
    const token = localStorage.getItem('userData');
    const cleanedToken = token.replace(/"/g, '').replace(/\\/g, '');
    const userId = localStorage.getItem('userId');
    axios.get('https://localhost:7186/api/Users/GetUserProfileById?userId=' + userId,{
        headers: {
            'Authorization': `Bearer ${cleanedToken}`
          }
    })
    .then(response => {
       if(response.status == 200){
        localStorage.setItem('user-data',JSON.stringify(response.data));
         window.location.href = '/profile'  
       }
    })
}