import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getProducts, getSales } from '@/lib/db';
import Link from 'next/link';
import { SalesTable } from './sales-table';
// import { useState } from 'react';

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  // const router = useRouter();
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset)
  );
  const sales = await getSales();
  // const [isProduct, setisProduct] = useState(true);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center mt-2">
        <TabsList>
          <TabsTrigger value="all">Produtos</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          {/* <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger> */}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <Link href="/dashboard/products/create">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo produto
              </span>
            </Button>
          </Link>
          <Link href="/dashboard/sales/create">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Nova venda
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
      <TabsContent value="sales">
        <SalesTable
          sales={sales}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}
