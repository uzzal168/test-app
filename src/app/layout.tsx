import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Suspense } from "react";
import { TopProgressCom } from "@/utils/topProgress.service";
import { ToastContainer } from "react-toastify";
import NavBar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test App",
  description: "Test app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<TopProgressCom />}>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </Suspense>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
