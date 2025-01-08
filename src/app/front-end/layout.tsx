import type { Metadata } from "next";
import styles from "./index.module.css";
import { getDirectoryTree } from "@/utiles";
import path from "path"

import DirMunu from "@/components/DirectoryMenu"
const CONTENT_DIR = "/public/front-end"
const CONTENT_PATH = path.join(process.cwd(), CONTENT_DIR);

export const metadata: Metadata = {
    title: "前端",
    description: "前端知识整理集合",
    keywords: "前端知识, web,react,前端知识图谱,ECMAScript,DOM,BOM,HTML5,计算机网络 "
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const tree = getDirectoryTree(CONTENT_PATH);
    return (
        <main className={styles.main}>
            <DirMunu tree={tree} />
            {children}
        </main>
    );
}
