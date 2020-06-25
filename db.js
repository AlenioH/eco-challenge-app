require('dotenv').config();

// require('./extractHerokuDatabaseEnvVars')(); will need that later for deployment

const postgres = require('postgres');
const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

export async function getTips() {
  const dailyTips = await sql`
  SELECT * FROM daily_tips
  `;
  return dailyTips;
}

export async function getTipsById(id) {
  const dailyTip = await sql`
  SELECT * FROM daily_tips WHERE id = ${id}`;
  return dailyTip[0];
}
