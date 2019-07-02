const axios = require('axios');


axios.get('http://localhost:3000/api/events.json')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log("error");
  })