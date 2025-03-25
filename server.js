const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
require('dotenv').config();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Login route - redirects to Google OAuth
app.get('/login', (req, res) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = encodeURIComponent(`${process.env.NEXTAUTH_URL || 'https://rolodexterlabs-production.up.railway.app'}/api/auth/callback/google`);
  const scope = encodeURIComponent('profile email');
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  
  res.redirect(googleAuthUrl);
});

// For any other request, send the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`rolodexterLABS website is running on port ${PORT}`);
});