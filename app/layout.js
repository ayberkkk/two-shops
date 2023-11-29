import "./globals.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "twoShops",
  description: "twoShops for e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
        </CartProvider>
      </body>
    </html>
  );
}
