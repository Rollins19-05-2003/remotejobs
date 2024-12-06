import Image from "next/image";

const Navbar = () => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto md:px-8 lg:px-[4.5rem] py-1">
          <div className="flex justify-between items-center h-20 px-8 md:px-16 py-4">
            <div className="flex gap-2 items-center">
              <Image src="/logo.svg" width={40} height={40} alt="logo" />
              <p
                className="text-lg md:text-2xl font-semibold cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                RemoteJobs
              </p>
            </div>

            <div className="flex gap-2 h-12">
              <Image src="/bell.svg" width={24} height={24} alt="bell" />
              <Image src="/user.svg" width={48} height={48} alt="user" />
            </div>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
