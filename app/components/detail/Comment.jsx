import { Rating } from "@mui/material";
import Avatar from "../general/Avatar";

export default function Comments({ comment }) {
  return (
    <div className="w-1/3 flex bg-white p-4 rounded-md shadow-md my-4">
      <Avatar image={comment?.image} />
      <div className="ml-4">
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg">{comment?.user}</p>
          <Rating name="read-only" value={comment?.rate} readOnly />
        </div>
        <p className="text-gray-700">{comment?.text}</p>
        <p className="text-sm text-gray-500">{comment?.date}</p>
      </div>
    </div>
  );
}
