import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { fetchCategories } from '@/lib/data';
import { fetchProductById } from '@/lib/db';
import Form from 'app/ui/products/edit-form';
import { Box, PersonStanding } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [product, categories] = await Promise.all([
    fetchProductById(id),
    fetchCategories()
  ]);

  if (!product) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar </CardTitle>
        <CardDescription>
          Insira novos produtos no controle do e-estoque.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form product={product} categories={categories}></Form>
      </CardContent>
    </Card>
  );
}
