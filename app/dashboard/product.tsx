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
// import { UploadButton, useUploadThing } from '@/components/ui/upload-thing';

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
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={() => {}}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {/* <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  alert('Upload Completed');
                }}
                onUploadError={(res) => {
                  alert('error');
                }}
              ></UploadButton> */}
              {/* <UploadButton  > teste </UploadButton> */}
              {/* <form action={() => {}}>
                <button type="submit">Incluir imagem</button>
              </form> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
