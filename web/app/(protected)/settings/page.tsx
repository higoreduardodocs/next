"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
}

// import { auth, signOut } from "@/auth";

// export default async function SettingsPage() {
//   const session = await auth();

//   return (
//     <div>
//       {JSON.stringify(session)}
//       <form
//         action={async () => {
//           "use server";

//           await signOut();
//         }}
//       >
//         <button type="submit">Sign Out</button>
//       </form>
//     </div>
//   );
// }
