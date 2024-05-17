import HeaderBarSpace from "@/components/HeaderBarSpace";
import NavigationBar from "@/components/NavigationBar";
import "./globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NavigationBar />
      <HeaderBarSpace />
      {children}
    </section>
  );
}
