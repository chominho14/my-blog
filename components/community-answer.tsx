import Image from "next/image";

interface SillComentProps {
  name?: string;
  answer: string;
  avatarUrl?: string;
  time: string;
}

export function timeForToday(value: any) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export default function CommunityAnswers({
  name,
  answer,
  avatarUrl,
  time,
}: SillComentProps) {
  const beforeTime = timeForToday(time);
  return (
    <div className="flex items-start space-x-3">
      {avatarUrl ? (
        <Image
          width={40}
          height={40}
          src={`https://imagedelivery.net/gW7iMYc8PRF7ooz9ysBNKw/${avatarUrl}/avatar`}
          className="bg-gray-300 w-5 h-5 rounded-full mb-1"
        />
      ) : (
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
      )}
      <div>
        <span className="text-sm block font-medium text-gray-700">{name}</span>
        <p className="text-gray-700 mt-2">{answer}</p>
        <span className="text-xs pt-1 text-gray-500 block ">
          · {beforeTime}
        </span>
      </div>
    </div>
  );
}
