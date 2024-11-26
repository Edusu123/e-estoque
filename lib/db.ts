import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { sql } from '@vercel/postgres';
import { ProductForm, SaleForm } from './definitions';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url'),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  amount_in_stock: numeric('amount_in_stock').notNull(),
  original_price: numeric('original_price', {
    precision: 10,
    scale: 2
  }).notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export async function fetchProductById(id: string) {
  const data = await sql<ProductForm>`
      select 
        products.id,
        products.name,
        products.category_id,
        products.price,
        products.original_price,
        products.amount_in_stock,
        products.status
      from products
      where products.id = ${id}
    `;

  const product = data.rows.map((product) => ({
    ...product
  }));

  return product[0];
}

export async function getSales() {
  const data = await sql<SaleForm>`
    select 
      s.id,
      u.name as user_name,
      p.name as product_name,
      s.amount,
      s.total_price,
      s.created_at
    from Sales s 
    join products p on s.product_id = p.id
    join users u on s.user_id = u.id
  `;

  const sales = data.rows;

  return sales;
}
