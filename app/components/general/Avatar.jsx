import Image from "next/image";
import { TfiUser } from "react-icons/tfi";

export default function Avatar({ image }) {
  if (image)
    return (
      <Image
        className="w-16 h-16 rounded-full"
        width={40}
        height={40}
        src={image}
        title="User"
        alt="User"
      />
    );
  return <TfiUser size={40} />;
}
