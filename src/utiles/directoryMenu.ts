// utils/getDirectoryTree.ts
import fs from 'fs';
import path from 'path';

export interface DirectoryNode {
  name: string;
  path: string;
  uri: string;
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
      tree.push({
        name: item.name,
        path: fullPath,
        uri: resourcesRelativePath,
        children: getDirectoryTree(fullPath),
      });
    } else if (item.isFile() && path.extname(item.name) === '.md') {
      tree.push({
        name: item.name.replace('.md', ''),
        path: fullPath,
        uri: resourcesRelativePath.replace('.md', ''),
        children: [],
      });
    }
  });

  return tree;
}

