import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignIn, SignedOut, UserButton, SignedIn } from "@clerk/nextjs"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes with AI",
  description: "Write your notes faster with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}
        </body>
      </html>
    </ClerkProvider>
  );
}
