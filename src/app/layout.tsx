import type { Metadata } from "next";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Personalized Video",
  description: "Personaliz Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
