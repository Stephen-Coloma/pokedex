import Image from "next/image";

export function Header() {
  return (
    <div className="px-5 w-full h-24 flex justify-center items-center relative">
      <Image src="/pokeball-icon.svg" alt="logo" width={50} height={50} className="relative sm:absolute left-5" />
      <h1 className="hidden md:inline-block text-sm">Old St. Labs</h1>
      <h1 className="hidden md:inline-block text-sm absolute right-5">By: Stephen Coloma</h1>
    </div>
  );
}
