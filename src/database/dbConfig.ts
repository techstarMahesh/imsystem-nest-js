export const dbConfig = {
  name: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
};
