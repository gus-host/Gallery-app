"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginButton from "@/components/LoginButton";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Logo from "../../components/icons/Logo";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ArrowPathIcon className="w-20 h-20 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-3/5 hidden md:block relative">
        <Image
          src="https://images.unsplash.com/photo-1534367522650-7759528bb911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MjUzMDB8MHwxfHNlYXJjaHwzN3x8cGVycm9zfGVufDB8fHx8MTc0MzcwNzgxOHww&ixlib=rb-4.0.3&q=80&w=1000"
          alt="Cute dog"
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center bg-gray-100 p-8 min-h-screen">
        <div className="bg-white rounded-md shadow-lg p-8 w-80 h-70 flex flex-col items-center gap-6">
          <Logo />
          <h2 className="text-xl font-bold text-gray-700">Welcome back</h2>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
