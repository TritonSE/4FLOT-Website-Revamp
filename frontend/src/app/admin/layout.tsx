import AdminHeaderBar from "@/components/AdminHeaderBar";
import NavigationBar from "@/components/NavigationBar";
import "./globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AdminHeaderBar />
      <NavigationBar />
      {children}
    </section>
  );
}
