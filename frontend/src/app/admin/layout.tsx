import "../globals.css";
import { FirebaseAppProvider } from "reactfire";

import { MyFirebaseProvider } from "./util/firebase-providers";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MyFirebaseProvider>
      <section>{children}</section>
    </MyFirebaseProvider>

  );
}