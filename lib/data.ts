import { sql } from '@vercel/postgres';
import { CategoryField, ProductField, UserField } from './definitions';

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

export async function fetchUsers() {
  try {
    const data = await sql<UserField>`
        SELECT
        id,
        name
        FROM users
        ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchProducts() {
  try {
    const data = await sql<ProductField>`
        SELECT
        id,
        name
        FROM products
        ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
