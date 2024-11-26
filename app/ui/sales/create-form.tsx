'use client';

import { Input } from '@/components/ui/input';
import {
  CategoryField,
  ProductField,
  State,
  UserField
} from '@/lib/definitions';
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
import { createProduct, createSale } from '@/lib/actions';
import { useActionState } from 'react';

export default function Form({
  users,
  products
}: {
  users: UserField[];
  products: ProductField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSale, initialState);

  return (
    <form action={formAction} className="">
      <div className="relative mt-5">
        <div className="">
          <Select name="user_id">
            <SelectTrigger className="md:w-[200px] lg:w-[336px]">
              <div className="gap-4">
                <SelectValue
                  className="absolute ml-3"
                  placeholder="Selecione um usuário"
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Usuário</SelectLabel>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative mt-5">
        <div className="">
          <Select name="product_id">
            <SelectTrigger className="md:w-[200px] lg:w-[336px]">
              <div className="gap-4">
                <SelectValue
                  className="absolute ml-3"
                  placeholder="Selecione um produto"
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Produto</SelectLabel>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative mt-5">
        <HashIcon className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          id="amount"
          name="amount"
          //   step="0.01"
          type="number"
          placeholder="quantidade"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          required
        />
      </div>
      <div className="flex mt-5 gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Inserir Venda</Button>
      </div>
    </form>
  );
}
