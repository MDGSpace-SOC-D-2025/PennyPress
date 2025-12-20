import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { type ReactNode } from "react";
import { Providers } from "./providers";
import Header from "@/components/Header"



export const metadata: Metadata = {
  title: "PennyPress",
};

export default function RootLayout(props:  { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-white">
        <Providers>
          <Header/>
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
