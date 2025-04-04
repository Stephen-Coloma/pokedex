import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="px-5 w-full h-20 flex justify-center items-center relative">
      <div className="relative sm:absolute sm:left-5 ">
        <Link href={'/'}>
          <Image src="/pokeball-icon.svg" alt="logo" width={40} height={40}/>
        </Link>
      </div>
      <h1 className="hidden sm:inline-block text-sm">Old St. Labs</h1>
      <h1 className="hidden sm:inline-block text-sm absolute right-5">By: Stephen Coloma</h1>
    </div>
  );
}
