import "./globals.css";

// app/layout.tsx

// Configure the Geist Sans font and expose it via a CSS variable.
// Next optimizes and serves only the needed font subsets.
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// Configure the Geist Mono font and expose it via a CSS variable.
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className="antialiased">
        {/* Render nested route content (page components) here. */}
        {children}
      </body>
    </html>
  );
}
