import { timeForToday } from "./community-answer";

interface SillComentProps {
  name?: string;
  comment: string;
  avatarUrl?: string;
  time: string;
}

export default function SkillComment({
  name,
  comment,
  avatarUrl,
  time,
}: SillComentProps) {
  // const beforeTime = timeForToday(time);
  return (
    <div>
      <div className="flex space-x-2 py-3">
        <div className="w-10 h-10 bg-slate-200"></div>
        <div className="w-9/12 pl-3">
          <div>{name}</div>
          <div className="text-sm">{comment}</div>
          <div className=" text-xs text-gray-400">· {time}</div>
        </div>
      </div>
      <hr />
    </div>
  );
}
