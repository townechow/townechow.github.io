import path from "path";
import { getAllMdFile } from "@/utiles";
import Link from "next/link";

const CONTENT_DIR = "/public/blog"
const CONTENT_PATH = path.join(process.cwd(), CONTENT_DIR);

export default async function BlogListPage() {

  // 递归获取所有 Markdown 文件路径
  const allFiles = getAllMdFile(CONTENT_PATH);
  const allUris = allFiles.map(absPath => {
    const relativePath = path.relative(CONTENT_PATH, absPath).replace(/\.md$/, "")
    const uri = path.join(CONTENT_DIR, relativePath).replace(/^\/public/, "")
    const name = path.basename(relativePath);
    return { uri, name }
  })

  return (
    <div className="w-full h-full center">
      <ul>
        {
          allUris?.map(({ uri, name }) => {
            return <li key={uri}>
              <Link href={uri} title={name} >
                {name}
              </Link>
            </li>
          })
        }
      </ul>
    </div>
  );
}
