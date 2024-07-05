import { Plus_Jakarta_Sans } from "next/font/google";
// import { Inter } from "next/font/google"; 
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: "Sunset Snack",
  description: "Surplus web application",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}
