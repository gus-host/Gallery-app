import { signOut } from "next-auth/react";

export default function LogoutButton () {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
      };

    return(
        <button  className="cursor-pointer bg-primary text-white px-3 py-2 sm:px-5 rounded-md hover:bg-primary-dark transition text-sm sm:text-base" onClick={handleLogout}>
    Log out
       </button>
    );
}