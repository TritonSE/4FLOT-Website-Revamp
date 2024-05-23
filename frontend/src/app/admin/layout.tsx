"use client";

import { usePathname } from "next/navigation";

import { FirebaseProvider } from "./firebase/firebaseProvider";

import "../globals.css";
import HeaderBarSpace from "@/components/HeaderBarSpace";
import NavigationBar from "@/components/NavigationBar";
import PrivatePage from "@/components/admin/PrivatePage";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  return (
    <FirebaseProvider>
      <section>
        {!isLoginPage && <NavigationBar />}
        {!isLoginPage && <HeaderBarSpace />}
        {!isLoginPage ? <PrivatePage>{children}</PrivatePage> : children}
      </section>
    </FirebaseProvider>
  );
}
