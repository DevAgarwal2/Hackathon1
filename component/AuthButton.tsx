'use client';
import Image from 'next/image';

import { signIn,signOut, useSession } from '@/app/lib/auth-client';
import { redirect } from "next/navigation";

export default function AuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session) {
    return redirect('/dashboard');
      
  }

  return (
    <button
      onClick={() => signIn.social({ provider: 'google', callbackURL: '/dashboard' })}
      className="
        flex items-center justify-center gap-2
        px-3 py-3
        bg-white text-[13px] text-[#3c4043]
        border border-[#dadce0] rounded-[18px]
        shadow-sm hover:shadow-md active:shadow-sm
        transition-shadow duration-150
        focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-1
        text:medium font-bold
      "
    >
      <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={16}
        height={16}
        priority
        className="pointer-events-none"
      />
      <span className="select-none">Join with Google</span>
    </button>
  );
}