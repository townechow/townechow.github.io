"use client"
import React, { useMemo, useState } from 'react';
import styles from "./index.module.css"
import { usePathname } from 'next/navigation';
import Link from "next/link"

interface DirectoryNode {
  name: string;
  path: string;
  uri?: string;
  children: DirectoryNode[];
}

interface DirectoryMenuProps {
  tree: DirectoryNode[];
  currentUri?: string;
}

const DirectoryMenu: React.FC<DirectoryMenuProps> = ({ tree, currentUri }) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const handleToggle = (path: string) => {
    setExpandedPaths(prev => {
      const newExpandedPaths = new Set(prev);
      if (newExpandedPaths.has(path)) {
        newExpandedPaths.delete(path);
      } else {
        newExpandedPaths.add(path);
      }
      return newExpandedPaths;
    });
  };

  // 渲染每个节点的函数，支持递归
  const renderNode = (node: DirectoryNode) => {
    return (
      <li key={node.path} className={currentUri === `/${node.uri}` ? styles.activity : ""}>
        <div>
          <span
            onClick={() => handleToggle(node.path)}
            className={`${styles.menuItem} ${expandedPaths.has(node.path) ? styles.expanded : ""}`}
          >
            {node.uri ? <Link href={`/${node.uri}`}>{node.name}</Link> : <span>{node.name}</span>}
          </span>
        </div>
        {/* 递归渲染子菜单 */}
        {node.children.length > 0 && (
          <ul className={`${styles.subMenu} ${expandedPaths.has(node.path) ? styles.show : ""}`}>
            {node.children.map(child => renderNode(child))}
          </ul>
        )}
      </li>
    );
  };

  const renderedTree = useMemo(() => (
    <ul className={styles.menu}>
      {tree.map(node => renderNode(node))}
    </ul>
  ), [tree, currentUri, expandedPaths]);

  return renderedTree;
};

const AsideMenu: React.FC<DirectoryMenuProps> = ({ tree }) => {
  const pathName = usePathname();

  return (
    <aside className={styles.aside}>
      <DirectoryMenu tree={tree} currentUri={pathName} />
    </aside>
  );
};

export default AsideMenu;
