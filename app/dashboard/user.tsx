import { Button } from '@/components/ui/button';

import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { auth, signOut } from 'auth';
import a from 'public/placeholder-user.jpg';

export async function User() {
  let session = await auth();
  let user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={a}
            width={32}
            height={32}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
