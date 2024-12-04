import React from "react";
import Image from "next/image";
const Footer = () => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Footer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <div className="w-full h-16 bg-black flex flex-col sm:flex-row justify-around items-center py-2 sm:py-0">
      <div className="flex items-center w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 scale-75 sm:scale-100">
        <Image src="/copyright.svg" alt="logo" width={313} height={20} />
      </div>
      <div className="flex items-center w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 scale-75 sm:scale-100">
        <Image src="/socialmedia.svg" alt="logo" width={130} height={20} />
      </div>
    </div>
  );
};

export default Footer;
