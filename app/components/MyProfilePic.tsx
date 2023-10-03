import Image from "next/image";
import React from "react";

export default function MyProfilePic() {
  return (
    <section className="w-52 h-52 mx-auto relative">
      <Image
        className="border-4 border-back dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src="/avatar.jpg"
        fill
        alt="Danh Nguyen"
        priority={true}
      />
    </section>
  );
}
