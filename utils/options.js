module.exports = {
  origin: [
<<<<<<< HEAD
    'https://diploma.movies-explorer.nomoredomains.monster/',
    'http://diploma.movies-explorer.nomoredomains.monster/',
=======
    'https://diploma.movies-explorer.nomoredomains.monster',
    'http://diploma.movies-explorer.nomoredomains.monster',
>>>>>>> a43c31e84eb008f09f2bb21efae64cfb4e029bf9
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  maxAge: 3600,
};
