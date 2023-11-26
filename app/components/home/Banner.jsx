import Image from "next/image";

export const Banner = () => {
  return (
    <div className="h-auto container mx-auto">
      <div className="h-[70vh] relative flex items-center justify-center">
        <Image className="w-full object-contain" src="/images/banner.jpg" fill alt="Banner" />
      </div>
    </div>
  );
};
