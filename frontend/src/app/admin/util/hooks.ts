import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useFirebase } from "../firebase/firebaseContext";

/**
 * Hook that returns the state of login for the user
 * @returns true if user is logged in, false otherwise
 */
export function useLoginState() {
  const auth = useFirebase();

  if (!auth) {
    return false;
  }
  return true;
}

export function usePrivatePage() {
  const router = useRouter();
  const loggedIn = useLoginState();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/admin");
    }
  }, []);
}
