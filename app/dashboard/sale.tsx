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
import { Box, Hash, MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectProduct } from '@/lib/db';
import { deleteProduct, deleteSale } from '@/lib/actions';
import Link from 'next/link';
import { SaleForm } from '@/lib/definitions';

export function Sale({ sale }: { sale: SaleForm }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Hash></Hash>
      </TableCell>
      <TableCell className="font-medium">{sale.user_name}</TableCell>
      <TableCell className="font-medium">{sale.product_name}</TableCell>
      {/* <TableCell>
        <Badge variant="outline" className="capitalize">
          {sale.product_name}
        </Badge>
      </TableCell> */}
      <TableCell className="hidden md:table-cell">{`${sale.amount}`}</TableCell>
      <TableCell className="hidden md:table-cell">{`R$${sale.total_price}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          {new Date(sale.created_at).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
          })}
        </Badge>
      </TableCell>
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
            {/* <DropdownMenuItem>
              <Link href={`/dashboard/products/${sale.id}/edit`}>Editar</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <form action={deleteSale}>
                <input type="hidden" id="id" name="id" value={sale.id} />
                <button type="submit">Excluir</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
