import type { Metadata } from "next";
import "./index.css";


export const metadata: Metadata = {
    title: "front-end",
    description: "front-end knowledge",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>{children}</main>
    );
}
