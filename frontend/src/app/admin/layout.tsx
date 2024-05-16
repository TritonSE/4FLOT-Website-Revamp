"use client";

import { usePathname } from "next/navigation";

import ReactFireProvider from "./firebase/reactfireProvider";

import HeaderBarSpace from "@/components/HeaderBarSpace";
import NavigationBar from "@/components/NavigationBar";

import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  return (
    <ReactFireProvider>
      <section>
        {!isLoginPage && <NavigationBar />}
        {!isLoginPage && <HeaderBarSpace />}
        {children}
      </section>
    </ReactFireProvider>
  );
}
