"use client"
import Script from "next/script"
function Com() {

  return <>
    <Script src="/static/js/pageMenu.js" strategy="afterInteractive" />
    <div id="toc"></div>
  </>
}
export default Com 