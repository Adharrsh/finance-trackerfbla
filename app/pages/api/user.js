// pages/api/users.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const results = await query('SELECT * FROM users');
    res.status(200).json({ users: results });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
