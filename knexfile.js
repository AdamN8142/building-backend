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
};
