import { Suspense } from "react";
import "./globals.css";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export const metadata = {
  title: "home page",
  description: "pantomime game",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html dir="rtl">
      <body className="bg-[#031A30]">
        {props.children}
        {props.modal}
      </body>
    </html>
  );
}
