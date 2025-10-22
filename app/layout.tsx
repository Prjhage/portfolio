import "./globals.css";
import GlowingCursor from "./components/GlowingCursor";

export const metadata = {
  title: "Prajwal Portfolio",
  description: "KPRverse-style interactive portfolio",
  icons: {
    icon: "/globe.svg", // path from /public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlowingCursor />
        {children}
      </body>
    </html>
  );
}
