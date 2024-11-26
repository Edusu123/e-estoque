'use client';

import { Input } from '@/components/ui/input';
import { CategoryField, ProductForm, State } from '@/lib/definitions';
import { Box, DollarSign, DollarSignIcon, HashIcon } from 'lucide-react';
import {
  SelectLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { updateProduct } from '@/lib/actions';
import { useActionState } from 'react';

export default function Form({
  product,
  categories
}: {
  product: ProductForm;
  categories: CategoryField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, formAction] = useActionState(updateProductWithId, initialState);

  console.log('product');
  console.log(product);
  //   console.log('categories.filter((c) => c.id == product.category_id)[0]?.name');
  //   console.log(categories.filter((c) => c.id == product.category_id)[0]?.name);

  return (
    <form action={formAction} className="">
      <div className="relative mt-5">
        <Box className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="nome"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          required
          defaultValue={product.name}
        />
      </div>
      <div className="relative mt-5">
        <div className="">
          <Select defaultValue={product.category_id} name="category_id">
            <SelectTrigger className="md:w-[200px] lg:w-[336px]">
              <div className="gap-4">
                <SelectValue
                  className="absolute ml-3"
                  //   placeholder={
                  //     categories.filter((c) => c.id == product.category_id)[0]
                  //       .name
                  //   }
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                {categories.map((category) => (
                  <SelectItem value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative mt-5">
        <DollarSign className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          id="price"
          name="price"
          step="0.01"
          type="number"
          placeholder="preço do produto"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          defaultValue={product.price}
          required
        />
      </div>
      <div className="relative mt-5">
        <DollarSignIcon className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          id="original_price"
          name="original_price"
          step="0.01"
          type="number"
          placeholder="preço de compra"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          defaultValue={product.original_price}
          required
        />
      </div>
      <div className="relative mt-5">
        <HashIcon className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          id="amount_in_stock"
          name="amount_in_stock"
          defaultValue={product.amount_in_stock}
          type="number"
          placeholder="quantidade em estoque"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          required
        />
      </div>
      <div className="relative mt-5">
        <div className="">
          <Select name="status" defaultValue={product.status}>
            <SelectTrigger className="md:w-[200px] lg:w-[336px]">
              <div className="gap-4">
                <SelectValue
                  className="absolute ml-3"
                  placeholder={product.status == 'active' ? 'Ativo' : 'Inativo'}
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key={'active'} value="active">
                  Ativo
                </SelectItem>
                <SelectItem key={'inactive'} value="inactive">
                  Inativo
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex mt-5 gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar Produto</Button>
      </div>
    </form>
  );
}
