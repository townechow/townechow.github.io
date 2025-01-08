// components/DirectoryMenu.tsx
import React from 'react';
import styles from "./index.module.css"

interface DirectoryNode {
  name: string;
  path: string;
  uri: string;
  children: DirectoryNode[];
}

interface DirectoryMenuProps {
  tree: DirectoryNode[];
}


const DirectoryMenu: React.FC<DirectoryMenuProps> = ({ tree }) => {
  return (
    <ul className={styles.menu}>
      {tree.map(node => (
        <li key={node.path}>
          {node.children.length > 0 ? <span >{node.name}</span> : <a href={`/${node.uri}`}>{node.name}</a>}
          {node.children.length > 0 && <DirectoryMenu tree={node.children} />}
        </li>
      ))}
    </ul>
  );
};
const AsideMenu: React.FC<DirectoryMenuProps> = ({ tree }) => {
  return <aside className={styles.aside}>
    <DirectoryMenu tree={tree} />
  </aside>

}

export default AsideMenu;