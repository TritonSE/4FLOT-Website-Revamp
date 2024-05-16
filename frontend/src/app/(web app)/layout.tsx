import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import HeaderBarSpace from "@/components/HeaderBarSpace";
import "../globals.css";
import "react-material-symbols/rounded";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body>
      <HeaderBar />
      <HeaderBarSpace />
      {children}
      <Footer />
    </body>
  );
}
