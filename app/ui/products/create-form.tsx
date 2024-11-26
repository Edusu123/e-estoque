'use client';

import { Input } from '@/components/ui/input';
import { CategoryField, State } from '@/lib/definitions';
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
import { createProduct } from '@/lib/actions';
import { useActionState } from 'react';

export default function Form({ categories }: { categories: CategoryField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createProduct, initialState);

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
        />
      </div>
      <div className="relative mt-5">
        {/* <AlbumIcon className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" /> */}
        <div className="">
          <Select name="category_id">
            <SelectTrigger className="md:w-[200px] lg:w-[336px]">
              <div className="gap-4">
                <SelectValue
                  className="absolute ml-3"
                  placeholder="Selecione uma categoria"
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
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
          required
        />
      </div>
      <div className="relative mt-5">
        <HashIcon className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          id="amount_in_stock"
          name="amount_in_stock"
          //   step="0.01"
          type="number"
          placeholder="quantidade em estoque"
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
        <Button type="submit">Criar Produto</Button>
      </div>
    </form>
  );
}
