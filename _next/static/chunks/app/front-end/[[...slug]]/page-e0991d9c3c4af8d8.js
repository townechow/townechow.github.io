(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[400],{1680:(e,n,t)=>{Promise.resolve().then(t.bind(t,2383))},2383:(e,n,t)=>{"use strict";t.d(n,{ToggleBtn:()=>_,default:()=>d});var s=t(5155),r=t(2115),a=t(9725),c=t.n(a),i=t(6658),l=t(8173),u=t.n(l);let o=e=>{let{tree:n,currentUri:t}=e,[a,i]=(0,r.useState)(new Set),l=e=>{i(n=>{let t=new Set(n);return t.has(e)?t.delete(e):t.add(e),t})},o=e=>(0,s.jsxs)("li",{className:t==="".concat(e.uri)?c().activity:"",children:[(0,s.jsx)("div",{children:(0,s.jsx)("span",{onClick:()=>l(e.path),className:"".concat(c().menuItem," ").concat(a.has(e.path)?c().expanded:""),title:e.name,children:e.uri?(0,s.jsx)(u(),{href:"".concat(e.uri),children:e.name}):(0,s.jsx)("span",{children:e.name})})}),e.children.length>0&&(0,s.jsx)("ul",{className:"".concat(c().subMenu," ").concat(a.has(e.path)?c().show:""),children:e.children.map(e=>o(e))})]},e.path);return(0,r.useMemo)(()=>(0,s.jsx)("ul",{className:c().menu,children:n.map(e=>o(e))}),[n,t,a])},d=e=>{let{tree:n}=e,t=(0,i.usePathname)();return(0,s.jsx)("aside",{className:c().aside,children:(0,s.jsx)(o,{tree:n,currentUri:t})})},_=()=>(0,s.jsx)("div",{className:c().toggle,children:(0,s.jsx)("span",{style:{cursor:"pointer",userSelect:"none",position:"relative",zIndex:10,pointerEvents:"auto"},onClick:()=>{var e;null===(e=document.querySelector("aside"))||void 0===e||e.classList.toggle(c().open)},children:"◀"})})},9725:e=>{e.exports={aside:"DirectoryMenu_aside__g_arJ",menu:"DirectoryMenu_menu__wBwKb",toggle:"DirectoryMenu_toggle__pd7PL",open:"DirectoryMenu_open__E_i1E",menuItem:"DirectoryMenu_menuItem__kbV1P",activity:"DirectoryMenu_activity__dycB6",subMenu:"DirectoryMenu_subMenu__vnmaB",show:"DirectoryMenu_show__7TXEq"}}},e=>{var n=n=>e(e.s=n);e.O(0,[607,173,441,517,358],()=>n(1680)),_N_E=e.O()}]);