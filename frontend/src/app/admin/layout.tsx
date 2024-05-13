import NavigationBar from "@/components/NavigationBar";
import HeaderBarSpace from "@/components/HeaderBarSpace";
import { FirebaseAppProvider } from "reactfire";
import { MyFirebaseProvider } from "./util/firebase-providers";

import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MyFirebaseProvider>
      <section>
        <NavigationBar />
        <HeaderBarSpace />
        {children}
      </section>
    </MyFirebaseProvider>
  );
}
