import express from 'express';
import data from './data/data.json';

const app = express();
const PORT = 3000;


//loading static files in your server. 
//express.static is a method within express allowing you to serve static files in your server. 'Use' is a method in express that allows you to add specific middleware to a path. 
app.use(express.static('./'));

app.get('/public', (req, res) => {
    res.sendFile('/index.html');
})



//method to use JSON
//app.use(express.json());
//app.use(express.urlencoded({extended: true}));

//loading static files in your server for images. 
app.use('/images', express.static('images'));

//route for folder
const file = '/';

/*get method. use the app middleware with the get method to send a request and retrieve data from your
server, then the res.json(data) code snippet will display the data in the front end.*/
app.get(file, (req, res) => {
    res.json(
        `User Id: ${data[0].id}, First Name: ${data[0].first_name}, Last Name: ${data[0].last_name}, E-mail: ${data[0].email}, Gender: ${data[0].gender}.`
    )        
});

// JSON data

app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

/*creating a new path with a parameter the parameter comes after the path specified using a colon and whichever parameter you would like to use for instance 'id'
*/
app.get('/item/:id', (req, res, next) => {
    //here is the middleware that requests the data. 
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    //middleware that uses the request object.
    console.log(`request from: ${req.originalUrl}`);
    console.log(`request type: ${req.method}`);
    //Middleware is simply functions that have access to the request and response object. The code snippet above could be considered middleware. Middleware are functions that happen before the send response is sent.   
    res.send(data[user]);
    next();
}, (req, res) => {
    console.log('did you get the right data?')
}
);


/*route handlers are the block on code that occurs inside of your route*/
//post method. next allows to run multiple callbacks.
app.post('/newItem', (req, res) => {
    res.send(`here is your post newbie on port ${PORT}.`);
});

//put method.
app.put('/item', (req, res) => {
    res.send(`a put request with /item route on port ${PORT}.`);
});

//delete method. 
app.delete('/item', (req, res) => {
    res.send(`a delete request with /item route on port ${PORT} `);
});


//error handling middleware in express, the throw new Error wil purposefully throw an error in our application. The error handling function must be the last function.
app.route('/images')
    .get((req, res) => {
        //throw new Error();
        //res.download('images/code-img.png')
        //res.redirect('http://www.linkedin.com')
        //res.end()
    }

    )

//customize error handling function
/*app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Red alert: ${error.stack}`);
})
*/


app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
    console.log(data);
});


//Debug your express. app $ set  DEBUG=express:* &  node index.js
//Security Suggestions
/*Some security suggestion for your application are:
- Always keep up-to-date and secured dependencies. 
- Use Transport Layer Security (TLS) for sensitive date. 
- Use Helmet's collection of security middleware
- use cookies securely.
*/