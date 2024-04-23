import 'dotenv/config';
import { defineConfig } from 'cypress';
import postgres from 'postgres';
import initalizeTestData from './testData';

const sql = postgres(process.env.PG_URL_TEST!, {
  ssl: true
});

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      username: 'testUser',
      password: ''
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        'db:initialize': (credentials: { username: string, password: string }) => {
          try {
            return initalizeTestData(sql, credentials.username, credentials.password);
          } catch  (error) {
            return error;
          }
        },
      })
    },
  },
});
