import Link from "next/link";

export default function Home() {
  return (
    <div className="markdown-body">
      <main className="flex flex-col gap-4 justify-center items-center">
        <Link href={"/front-end/index"}>front-end</Link>
        <Link href={"/blog/list"}>blog</Link>
        <Link href={"/web3/index"}>web3、区块链和加密货币</Link>
      </main>
    </div>
  );
}
