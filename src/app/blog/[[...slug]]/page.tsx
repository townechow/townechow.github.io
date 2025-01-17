import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { md2html, getMdFileContentByPath, getMdFileFullPathByUri,getAllMdFile } from "@/utiles";

const CONTENT_DIR = "/public/blog"
const CONTENT_PATH = path.join(process.cwd(), CONTENT_DIR);


export async function generateStaticParams() {
  const postsDir = path.join(CONTENT_PATH);

  // 递归获取所有 Markdown 文件路径
  const allFiles = getAllMdFile(postsDir);
  console.log("allFiles", allFiles);

  // 转换文件路径为路由参数
  const paths = allFiles.map((filePath) => {
    const relativePath = path.relative(postsDir, filePath);
    const slug = relativePath.replace(/\.md$/, "").split(path.sep); // 转换成数组

    return { slug };
  });

  return paths;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {

  // slug: [], [/], [/post1]
  const { slug } = await params;

  // filePath, foldPath 
  const uri = path.join(...(slug?.map(p => decodeURIComponent(p))) || ["/"]);
  const filePath = getMdFileFullPathByUri(uri, CONTENT_PATH)

  console.log("filePath", filePath)
  if (!filePath) {
    return notFound()
  }
  // 读取 Markdown 文件内容
  const fileContent = getMdFileContentByPath(filePath);
  const { content, data } = matter(fileContent); // 解析内容和元数据
  const contentHtml = md2html(content, filePath);

  return (
    <div className="markdown-body">
      <h1>{data.title}</h1>
      
      <article
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
