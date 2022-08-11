import { cls } from "@libs/client/utils";
import React from "react";

interface PaginationButton {
  children: React.ReactNode;
  rOpt?: number;
  direction: "left" | "right";
  page: number;
  itemLength?: any;
  [key: string]: any;
}

export default function PaginationButton({
  children,
  direction,
  page,
  itemLength,
  onClick,
  rest,
}: PaginationButton) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        direction === "left" || (direction === "right" && page <= 1)
          ? "bottom-40"
          : "bottom-56",
        direction === "left" && page <= 1 ? "hidden" : "",

        direction === "right" && itemLength < 10 ? "hidden" : "",
        `fixed flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full  border-0 border-transparent bg-red-300 text-white shadow-xl transition-all hover:bg-red-500 sm:sticky sm:translate-x-[32rem]`
      )}
    >
      {children}
    </button>
  );
}
