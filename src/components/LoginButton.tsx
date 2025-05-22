import { signIn } from "next-auth/react";
import GoogleIcon from "./icons/GoogleIcon";

export default function LoginButton() {
  return (
<button
   onClick={() => signIn("google")}
  className="flex items-center justify-center w-full max-w-xs px-4 py-3 border border-gray-300 rounded-md shadow-md hover:bg-gray-200 transition"
>
  <GoogleIcon className="w-6 h-6 mr-2"/>
  <span className="font-medium text-gray-700">Sign in with Google</span>
</button>
  );
}
