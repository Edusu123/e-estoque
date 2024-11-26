import { sql } from '@vercel/postgres';
import { CategoryField } from './definitions';

export async function fetchCategories() {
  try {
    const data = await sql<CategoryField>`
        SELECT
        id,
        name
        FROM categories
        ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
