import NavigationBar from "@/components/NavigationBar";
import "./globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NavigationBar />
      {children}
    </section>
  );
}
