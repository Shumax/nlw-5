
const base = process.env.NODE_ENV !== 'production';

export const URL = base ? 'http://localhost:3333'
  : 'https://mocki.io/v1/6785294c-bdd8-4903-b7a7-d221fdf9e258';
