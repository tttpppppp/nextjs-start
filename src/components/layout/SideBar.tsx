import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <Link href={"/"} className="text-4xl font-bold mb-10 block text-center">
        TTP
      </Link>
      <ul>
        <li>
          <Link href={"/login"}>Đăng nhập</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
