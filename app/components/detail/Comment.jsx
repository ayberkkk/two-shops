import Avatar from "../general/Avatar";
import StarRating from "../general/StarRating";

export default function Comments({ comment }) {
  return (
    <div className="flex bg-white p-4 rounded-md shadow-md my-4">
      <Avatar image={comment?.image} />
      <div className="ml-4">
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg">{comment?.user}</p>
          <StarRating rating={comment?.rating} />
        </div>
        <p className="text-gray-700">{comment?.text}</p>
        <p className="text-sm text-gray-500">{comment?.date}</p>
      </div>
    </div>
  );
}
