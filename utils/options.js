module.exports = {
  origin: [
    'https://api.dip.movies-explorer.nomoredomains.monster',
    'http://api.dip.movies-explorer.nomoredomains.monster',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  maxAge: 3600,
};
