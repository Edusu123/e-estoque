import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fetchCategories } from '@/lib/data';
import Form from 'app/ui/products/create-form';
import { Box, PersonStanding } from 'lucide-react';

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Produto</CardTitle>
        <CardDescription>
          Insira novos produtos no controle do e-estoque.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form categories={categories}></Form>
      </CardContent>
    </Card>
  );
}
