import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#eee" }}>
        {children}
      </body>
    </html>
  );
}
