import "../src/index.css";

export const metadata = {
  title: "Madhan Portfolio",
  description: "Frontend developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
