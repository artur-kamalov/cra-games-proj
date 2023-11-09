var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

app.use(express.json())
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Games endpoints
// Endpoint to Get a list of games
app.get('/api/games/getall', function(req, res){
    fs.readFile(__dirname + "/" + "games.json", 'utf8', function(err, data){
        res.end(data); // you can also use res.send()
    });
})
//The addgames endpoint
app.post('/api/games/createNewGame', function(req, res){
    // console.log(req.body)
    
    // Step 2: read existing gamess
    fs.readFile(__dirname + "/" + "games.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        //Step 3: append games variable to list
        data.push(req.body);
        console.log(data);
        fs.writeFile(__dirname + "/" + "games.json", JSON.stringify(data),'utf8', () => {})
        res.end(JSON.stringify(data));
    });
})

// JWT auth endpoints

const users = [
    {
        id:'1',
        username: 'artur',
        password: 'artur',
        isAdmin: true
    },
    {
        id:'2',
        username: 'test',
        password: 'test',
        isAdmin: false
    }
]

let refreshTokens = []

const verify = (req,res,next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, user) => {
            if(err) return res.status(403, 'Token is not valid')

            req.user = user
            next()
        })
    }
    else {
        res.status(401).json('Not authenticated')
    }
}



app.post('/api/refresh', (req, res) => {
    // take the refresh token from user
    const refreshToken = req.body.token

    //send error if there is no token or its invalid
    if (!refreshToken) return res.status(401).json('You are not authenticated')
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json('Refresh token is not valid')
    
    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, (err, user) => {
        err && console.log(err)
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
        
        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        refreshTokens.push(newRefreshToken)

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        })
    })
    //if all fine - craete new accesToken, refreshToken and send to User
})

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id, isAdmin: user.isAdmin}, 
        process.env.JWT_SECRET_ACCESS_TOKEN,
        {expiresIn: '5s'}
    )
}
const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id, isAdmin: user.isAdmin}, 
        process.env.JWT_SECRET_REFRESH_TOKEN,
    )
}


app.post('/api/login', (req,res) => {
    const {username, password} = req.body
    const user = users.find(u => u.username === username && u.password === password)

    if(user) {
        //generate access token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        
        res.json({
            username: user.username, 
            isAdmin: user.isAdmin,
            accessToken,
            refreshToken,
        })
    }
    else {res.status(400).json("Username or password incorrect")}
})

app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  });

app.delete('/api/users/:userId', verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin){
        // users = users.find(user => user.id === req.user.id)
        res.status(200).json('User has been deleted')
    }
    else {
        res.status(403).json('You are not allow to delte this user!')
    }
})
  
  // Create a server to listen at port 3001
  var server = app.listen(3001, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://localhost:",port)
})