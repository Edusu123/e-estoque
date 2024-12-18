'use client';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authenticate } from '@/lib/actions';
// import { signIn } from '@/lib/auth';

import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  MessageCircleWarning,
  User
} from 'lucide-react';
import { useActionState, useState } from 'react';

export default function LoginPage() {
  const [isPassVisible, setPassVisible] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">e-estoque</CardTitle>
        </CardHeader>
        <CardFooter>
          <form
            action={formAction}
            className="relative ml-auto flex-1 md:grow-0"
          >
            <div className="relative">
              <Mail className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="e-mail"
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                required
              />
            </div>
            <div className="mt-3 relative">
              <Lock className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="senha"
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                required
              />
              {isPassVisible ? (
                <EyeOff
                  onClick={() => setPassVisible(false)}
                  className="absolute right-2.5 top-[.75rem] h-4 w-4 text-muted-foreground"
                />
              ) : (
                <Eye
                  onClick={() => setPassVisible(true)}
                  className="absolute right-2.5 top-[.75rem] h-4 w-4 text-muted-foreground"
                />
              )}
            </div>
            <div className="mt-3">
              <Button
                className="h-8 gap-1 right-2.5"
                disabled={isPending}
                size="sm"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  entrar
                </span>
              </Button>
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <MessageCircleWarning className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
