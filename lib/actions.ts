'use server';

import { signIn } from 'auth';
import { AuthError } from 'next-auth';
import { ProductForm, ProductQuery, State } from './definitions';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteProductById } from './db';

const ProductFormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'insira o nome do produto'
  }),
  category_id: z.string({
    invalid_type_error: 'selecione uma categoria'
  }),
  price: z.coerce.number().gt(0, { message: 'insira um valor maior que zero' }),
  original_price: z.coerce
    .number()
    .gt(0, { message: 'insira um valor maior que zero' }),
  amount_in_stock: z.coerce
    .number()
    .gt(0, { message: 'insira um valor maior que zero' }),
  image_url: z.string(),
  status: z.enum(['active', 'inactive'], {
    invalid_type_error: 'selecione o status atual do produto'
  }),
  created_at: z.string()
});

const SaleFormSchema = z.object({
  id: z.string(),
  amount: z.string(),
  user_id: z.string(),
  product_id: z.string()
});

const CreateSale = SaleFormSchema.omit({
  id: true
});

const CreateProduct = ProductFormSchema.omit({
  id: true,
  created_at: true,
  image_url: true
});
const UpdateProduct = ProductFormSchema.omit({
  id: true,
  created_at: true,
  image_url: true
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createProduct(prevState: State, formData: FormData) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    category_id: formData.get('category_id'),
    price: formData.get('price'),
    original_price: formData.get('original_price'),
    amount_in_stock: formData.get('amount_in_stock'),
    status: 'active'
  });

  if (!validatedFields.success) {
    console.log('validatedFields.error.flatten().fieldErrors');
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.'
    };
  }

  const { name, category_id, price, original_price, amount_in_stock } =
    validatedFields.data;

  try {
    await sql`insert into products (name, category_id, price, original_price, amount_in_stock, created_at, status)
              values(${name}, ${category_id}, ${price}, ${original_price}, ${amount_in_stock}, now(), 'active')`;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Invoice.'
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function createSale(prevState: State, formData: FormData) {
  const validatedSaleFields = CreateSale.safeParse({
    user_id: formData.get('user_id'),
    product_id: formData.get('product_id'),
    amount: formData.get('amount')
  });

  if (!validatedSaleFields.success) {
    console.log('validatedSaleFields.error.flatten().fieldErrors');
    console.log(validatedSaleFields.error.flatten().fieldErrors);
    return {
      errors: validatedSaleFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.'
    };
  }

  let user_id = formData.get('user_id');
  let product_id = formData.get('product_id');
  let amount = formData.get('amount');

  const data = await sql<ProductQuery>`
        SELECT
        id,
        name,
        price,
        amount_in_stock
        FROM products
        where id = ${Number(product_id)}
    `;

  const product = data.rows[0];
  const total_price = Number(amount) * Number(product.price);
  const newTotal = Number(product.amount_in_stock) - Number(amount);

  try {
    await sql`insert into sales (user_id, product_id, amount, total_price, created_at)
                values(${Number(user_id)}, ${Number(product_id)}, ${Number(amount)}, ${total_price}, now())`;

    await sql`update products set amount_in_stock = ${newTotal} where id = ${product.id}`;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Invoice.'
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteProduct(formData: FormData) {
  console.log('test');
  let id = Number(formData.get('id'));
  console.log('id');
  console.log(id);
  await deleteProductById(id);
  revalidatePath('/');
}

export async function updateProduct(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    category_id: formData.get('category_id'),
    price: formData.get('price'),
    original_price: formData.get('original_price'),
    amount_in_stock: formData.get('amount_in_stock'),
    status: formData.get('status')
  });

  console.log('validatedFields.data');
  console.log(validatedFields.error);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.'
    };
  }

  const { name, category_id, price, original_price, amount_in_stock, status } =
    validatedFields.data;

  var string = `update products set name = ${name}, category_id = ${category_id}, price = ${price}, original_price = ${original_price}, 
                amount_in_stock = ${amount_in_stock}, status = ${status}
              where id = ${id}`;

  console.log('validatedFields');
  console.log(validatedFields.data);

  try {
    await sql`update products set name = ${name}, category_id = ${category_id}, price = ${price}, original_price = ${original_price}, 
                amount_in_stock = ${amount_in_stock}, status = ${status}
              where id = ${id}`;
  } catch (e) {
    console.log(e);
    return {
      message: 'Database Error: Failed to Create Invoice.'
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
