import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Box, MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectProduct } from '@/lib/db';
import { deleteProduct } from '@/lib/actions';
import Link from 'next/link';

export function Product({ product }: { product: SelectProduct }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {product.imageUrl != null ? (
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={product.imageUrl}
            width="64"
          />
        ) : (
          <Box></Box>
        )}
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status == 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`R$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{`R$${product.original_price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{`R$${((Number(product.price) - Number(product.original_price)) * 100) / 100}`}</TableCell>
      {/* <TableCell className="hidden md:table-cell">{product.stock}</TableCell> */}
      <TableCell className="hidden md:table-cell">
        {/* {product..toLocaleDateString("en-US")} */}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/dashboard/products/${product.id}/edit`}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <input type="hidden" id="id" name="id" value={product.id} />
                <button type="submit">Excluir</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
