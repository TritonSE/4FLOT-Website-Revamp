import NavigationBar from "@/components/NavigationBar";
import "./globals.css";
import HeaderBarSpace from "@/components/HeaderBarSpace";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NavigationBar />
      <HeaderBarSpace />
      {children}
    </section>
  );
}
