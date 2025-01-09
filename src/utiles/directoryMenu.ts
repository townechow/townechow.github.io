// utils/getDirectoryTree.ts
import fs from 'fs';
import path from 'path';
import matter from "gray-matter";

export interface DirectoryNode {
  name: string;
  path: string;
  uri?: string;
  children: DirectoryNode[];
}

export function getDirectoryTree(dirPath: string, excludeDirs: string[] = ['assets']): DirectoryNode[] {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const tree: DirectoryNode[] = [];

  items.forEach(item => {
    if (excludeDirs?.includes(item.name)) {
      return
    }
    const fullPath = path.join(dirPath, item.name);
    const resourcesRelativePath = path.relative(path.join(process.cwd(), 'public/'), fullPath);
    if (item.isDirectory()) {
      const indexFile = path.join(fullPath, 'index.md')
      const indexFileRelativePath = path.relative(path.join(process.cwd(), 'public/'), indexFile)
      let fileContent = '';
      let data = null
      if (fs.existsSync(indexFile)) {
        fileContent = fs.readFileSync(indexFile, "utf-8");
        data = matter(fileContent).data;
      }
      tree.push({
        name: data?.title || item.name,
        path: fileContent ? indexFile : fullPath,
        uri: fileContent ? indexFileRelativePath.replace('.md', '') : '',
        children: getDirectoryTree(fullPath),
      });
    } else if (item.isFile() && path.extname(item.name) === '.md' && item.name !== "index.md") {
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const data = matter(fileContent).data;
      tree.push({
        name: data?.title || item.name.replace('.md', ''),
        path: fullPath,
        uri: resourcesRelativePath.replace('.md', ''),
        children: [],
      });
    }
  });

  return tree;
}

