import Image from "next/image";
import Link from "next/link";

interface SkillItemProps {
  time: string;
  id: number;
  title: string;
  subtitle: string;
  comments: number;
  hearts: number;
  avatar?: string;
}

export function getMonthName(month: number) {
  const d = new Date();
  d.setMonth(month - 1);
  const monthName = d.toLocaleDateString("en-US", { month: "long" });
  return monthName.slice(0, 3);
}

export default function SkillItem({
  time,
  id,
  title,
  subtitle,
  comments,
  hearts,
  avatar,
}: SkillItemProps) {
  const timeYear = time.slice(0, 4);
  const timeDay = time.slice(8, 10);
  const timeMonth = getMonthName(Number(time.slice(5, 7)));

  return (
    <Link href={`/skill/${id}`}>
      <a className=" flex px-4  border-b pb-5 cursor-pointer justify-between">
        <div className="flex space-x-4">
          <div className="pt-2 flex flex-col">
            <div className="flex space-x-2 text-xs">
              <div className="flex">
                {timeMonth}.{timeDay}.{timeYear}&nbsp;&nbsp; 조민호&nbsp;&nbsp;
                {avatar ? (
                  <Image
                    width={23}
                    height={23}
                    src={`https://imagedelivery.net/gW7iMYc8PRF7ooz9ysBNKw/${avatar}/mini`}
                    className="bg-gray-300 w-5 h-5 rounded-full mb-1"
                  />
                ) : (
                  <div className="bg-gray-300 w-6 h-6 rounded-full mb-1" />
                )}
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <span className="text-xs text-gray-500">{subtitle}</span>
          </div>
        </div>
        <div className="flex space-x-2 items-end justify-end">
          <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{hearts}</span>
          </div>
          <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>{comments}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
