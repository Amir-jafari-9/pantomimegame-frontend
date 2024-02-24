
export const metadata = {
    title: "game",
    description:
      "pantomime game",
  };
  
  export default function RootLayout(props: { children: React.ReactNode }) {
    return (
      <html dir="rtl">
        <body className="bg-[#031A30]">{props.children}</body>
      </html>
    );
  }
  