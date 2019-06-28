// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/musicians',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/dev'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  }
};
