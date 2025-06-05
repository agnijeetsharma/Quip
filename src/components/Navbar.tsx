'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
// import logo from '@/constant/logo.png';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-md px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          
          <span className=" font-bold text-white text-xl hover:text-yellow-500">Quip</span>
        </Link>
        <div>
          {session ? (
            // <div className="flex items-center space-x-4">
              <span className="text-gray-300 hidden md:inline hover:text-yellow-500 cursor-pointer">
                Welcome, {user.username || user.email}
              </span>
            //   <Button
            //     onClick={() => signOut()}
            //     className="bg-pink-500 hover:bg-pink-600 text-white"
            //   >
            //     {/* Logout */}
            //   </Button>
            // </div>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-white hover:bg-yellow-500 text-black font-semibold">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
