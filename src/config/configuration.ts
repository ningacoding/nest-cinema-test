import * as process from 'node:process';

export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    port: parseInt(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    cert: process.env.DATABASE_CERT,
  },
});
