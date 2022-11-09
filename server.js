const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

let authHeader = { 'Authorization': 'Bearer EHiXgU4z71FBXtefe4z5K5nu3jBN4AMv7zSMgsLXl8iKZlxaVHLUL_fBmr5Ndt-4CAIn9-7WyijF3NUG1ZvAZx9SFFL5kopSrcZ6QPZ-HA6ck4zxKV7u1JmDtvovY3Yx' };

app.use(express.static(path.join(__dirname, 'react-front-end/build')));

app.get('/api/getNearbyBusinesses', (req, res) => {
    let url = "https://api.yelp.com/v3/businesses/search";

    axios.get(url, {
        params: req.query,
        headers: authHeader
    })
        .then(response => res.send(response.data))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});


app.get('/api/getBusinessDetail', (req, res) => {
    let url = `https://api.yelp.com/v3/businesses/${req.query.id}`;

    axios.get(url, {
        headers: authHeader
    })
        .then(response => res.send(response.data))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

app.get('/api/getReviews', (req, res) => {
    let url = `https://api.yelp.com/v3/businesses/${req.query.id}/reviews`;

    axios.get(url, {
        headers: authHeader
    })
        .then(response => res.send(response.data))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

app.get('/api/autocomplete', (req, res) => {
    let url = "https://api.yelp.com/v3/autocomplete";

    axios.get(url, {
        params: req.query,
        headers: authHeader
    })
        .then(response => res.send(response.data))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

app.get('/api/geocoding', (req, res) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=AIzaSyCjjsZZeqjH4xjyNhzu6RYND8kif389U7w`;

    console.log({
        params: {...req.query, 'key': 'AIzaSyCjjsZZeqjH4xjyNhzu6RYND8kif389U7w'}
    });

    axios.get(url, {
        params: {...req.query, 'key': 'AIzaSyCjjsZZeqjH4xjyNhzu6RYND8kif389U7w'}
    })
        .then(response => res.send(response.data))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/react-front-end/build/index.html'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});