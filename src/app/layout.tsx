import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Service Area Map",
  description:
    "Interactive, configurable service-area map with geofenced coverage circles, built on Leaflet and OpenStreetMap.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
