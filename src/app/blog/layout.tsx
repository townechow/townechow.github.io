import type { Metadata } from "next";
import "./index.css";


export const metadata: Metadata = {
    title: "blog",
    description: "some  my blog",
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
