import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a className="fixed hover:bg-red-500 transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-red-400 rounded-full p-4 text-white">
        {children}
      </a>
    </Link>
  );
}
