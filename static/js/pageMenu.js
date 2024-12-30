(function () {
  if (typeof window === "undefined") {
    return
  }
  /**
   * 插入动态 CSS 样式
   */
  function addStyles() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `

      #toc {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 250px;
        padding: 10px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow-y: auto;
        max-height: 90vh;
      }
      #toc ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      #toc li {
        margin: 5px 0;
      }
      #toc a {
        text-decoration: none;
        color: #333;
        font-size: 14px;
      }
      #toc a.active {
        color: #007BFF;
        font-weight: bold;
      }
    `;
    document.head.appendChild(styleElement);
  }

  /**
   * 收集页面中的标题元素
   * @param {string} containerSelector 内容容器选择器
   * @returns {NodeList} 所有标题节点
   */
  function collectHeaders(containerSelector) {
    const container = document.querySelector(containerSelector);
    return container.querySelectorAll("h1, h2, h3, h4, h5, h6");
  }

  /**
   * 根据标题生成目录
   * @param {NodeList} headers 标题节点集合
   * @param {string} tocSelector 目录容器选择器
   */
  function generateTOC(headers, tocSelector) {
    const toc = document.querySelector(tocSelector);
    const ul = document.createElement("ul");

    headers.forEach((header, index) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#header-${index}`;
      a.textContent = header.textContent;
      a.dataset.index = index;
      header.id = `header-${index}`;
      li.appendChild(a);
      ul.appendChild(li);
    });

    toc.appendChild(ul);
  }

  /**
   * 设置目录项的点击滚动功能
   * @param {string} tocSelector 目录容器选择器
   */
  function setupScrollTo(tocSelector) {
    const toc = document.querySelector(tocSelector);

    toc.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const target = document.getElementById(e.target.href.split("#")[1]);
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /**
   * 设置滚动时的高亮功能
   * @param {NodeList} headers 标题节点集合
   * @param {string} tocSelector 目录容器选择器
   */
  function setupHighlight(headers, tocSelector) {
    const toc = document.querySelector(tocSelector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.id.split("-")[1];
          const link = toc.querySelector(`a[data-index="${index}"]`);
          if (entry.isIntersecting) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      }
    );

    headers.forEach((header) => observer.observe(header));
  }

  /**
   * 初始化目录功能
   * @param {Object} options 配置选项
   * @param {string} options.containerSelector 内容容器选择器
   * @param {string} options.tocSelector 目录容器选择器
   */
  function initTOC({ containerSelector, tocSelector }) {
    addStyles();
    const headers = collectHeaders(containerSelector);
    generateTOC(headers, tocSelector);
    setupScrollTo(tocSelector);
    setupHighlight(headers, tocSelector);

  }

  // 自动执行初始化逻辑
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded event');
      initTOC({
        containerSelector: ".markdown-body",
        tocSelector: "#toc",
      });
    });
  } else {
    console.log('DOMContentLoaded already fired');
    initTOC({
      containerSelector: ".markdown-body", 
      tocSelector: "#toc",
    });

  }
})();
