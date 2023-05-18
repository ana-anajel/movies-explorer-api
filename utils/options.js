module.exports = {
  origin: [
    'https://diploma.movies-explorer.nomoredomains.monster/',
    'http://diploma.movies-explorer.nomoredomains.monster/',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  maxAge: 3600,
};
