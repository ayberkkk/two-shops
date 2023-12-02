import Image from "next/image";

export const Banner = () => {
  return (
    <div className="h-auto container mx-auto">
      <div className="lg:h-[70vh] h-[30vh] relative flex items-center justify-center">
        <Image
          className="w-full object-contain h-screen"
          src="/images/banner.jpg"
          fill
          alt="Banner"
        />
      </div>
    </div>
  );
};
