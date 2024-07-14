var http = require('http');

// Users database (for demo purposes, replace with your actual authentication mechanism)
var users = [
    { username: 'user1', password: 'password1', displayName: 'User One' },
    { username: 'user2', password: 'password2', displayName: 'User Two' }
];

// Create a server object:
http.createServer(function (req, res) {
    if (req.url === '/login' && req.method === 'POST') {
        // Handle login form submission
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            var postData = parsePostData(body);
            var username = postData.username;
            var password = postData.password;
            
            // Check if username and password match
            var authenticatedUser = users.find(function (user) {
                return user.username === username && user.password === password;
            });
            
            if (authenticatedUser) {
                // Display content for authenticated user
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`<h1>Welcome, ${authenticatedUser.displayName}!</h1>`);
                res.write('<p>This is version 3.0 :)</p>');
                res.end();
            } else {
                // Unauthorized access
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Unauthorized');
            }
        });
    } else {
        // Handle other requests (default response)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome!</h1>');
        res.write('<p>Please log in
