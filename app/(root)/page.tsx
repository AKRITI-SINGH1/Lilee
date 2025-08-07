import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      
      <div className="flex flex-col justify-center items-center my-5">
      <Image src={"/hero.svg"} alt="Hero-Section" height={500}  width={500} className="mb-2"/>
      
      <h1 className=" z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-100 via-pink-400 to-pink-300 dark:from-pink-500 dark:via-pink-400 dark:to-pink-200 tracking-tight leading-[1.3] ">
        Lilee Code with Intelligence
      </h1>
      </div>
     

      <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
       Lilee Code Editor is an intelligent platform that empowers developers to write, debug, and optimize code with unparalleled speed and precision through a powerful suite of advanced features and seamless integration. 
      </p>
      <Link href={"/dashboard"}>
        <Button variant={"brand"} className="mb-4" size={"lg"}>
          Get Started
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}