import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={'/'}>
      <h1 className="text-2xl font-bold bg-orange-700 px-3 py-1 rounded-lg shadow-xl cursor-pointer">
        <span className="underline">twoShops.</span>
        <span className="font-extralight">com</span>
      </h1>
    </Link>
  );
};
