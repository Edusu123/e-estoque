import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fetchCategories, fetchProducts, fetchUsers } from '@/lib/data';
import Form from 'app/ui/sales/create-form';
import { Box, PersonStanding } from 'lucide-react';

export default async function Page() {
  const users = await fetchUsers();
  const products = await fetchProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Produto</CardTitle>
        <CardDescription>
          Insira novos produtos no controle do e-estoque.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form products={products} users={users}></Form>
      </CardContent>
    </Card>
  );
}
