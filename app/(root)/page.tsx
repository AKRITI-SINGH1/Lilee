import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/features/home/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className=" z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      
      <div className="flex flex-col justify-center items-center my-5">
      <Image src={"/hero.svg"} alt="Hero-Section" height={500}  width={500} style={{height: 'auto'}} className="mb-2" priority/>
      
      <h1 
  className="z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent tracking-tight leading-[1.3]"
  style={{
    background: 'linear-gradient(0deg, rgba(237, 178, 223, 1) 0%, rgba(237, 14, 100, 1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }}
>
  Lilee Code with Intelligence
</h1>
      </div>
     

      <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
       Lilee Code Editor is an intelligent platform that empowers developers to write, debug, and optimize code with unparalleled speed and precision through a powerful suite of advanced features and seamless integration. 
      </p>
      <Link href={"/dashboard"}>
        <Button variant={"brand"} className="mb-4 bg-pink-500 rounded-full" size={"lg"}>
          Get Started
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
    </>
  );
}