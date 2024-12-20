
// @ts-expect-error  This is a temporary workaround for a known issue.
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'; // 引入 highlight.js

// @ts-expect-error  This is a temporary workaround for a known issue.
import { full as emoji } from 'markdown-it-emoji'

import path from 'path';
import fs from "fs"

export const md2html = (mdContent: string) => {
  const md = new MarkdownIt({
    highlight: (code: string, language: string) => {
      if (language && hljs.getLanguage(language)) {
        try {
          // 使用 highlight.js 高亮代码
          return `<pre class="hljs"><code class="language-${language}">${hljs.highlight(code, { language }).value}</code></pre>`;
        } catch (err) {
          window.console.error(`highlight: ${err}`)
        }
      }
      // 如果没有指定语言或语言不支持，默认处理
      return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`;
    },
  }).use(emoji);;

  return md.render(mdContent);
};


export const getMdFileContentByPath = (filePath: string) => {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const potentialFiles = [
      path.join(filePath, 'index.md'),
      path.join(filePath, 'readme.md'),
      path.join(filePath, "README.md")
    ]
    for (const potentialFile of potentialFiles) {
      if (fs.existsSync(potentialFile)) {
        const fileContent = fs.readFileSync(potentialFile, "utf-8");
        return fileContent
      }
    }

  }
  const filePathFix = `${filePath}.md`
  if (fs.existsSync(filePathFix)) {
    const fileContent = fs.readFileSync(filePathFix, "utf-8");
    return fileContent
  }
  return ''
}