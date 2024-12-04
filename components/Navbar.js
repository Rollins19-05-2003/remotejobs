import Image from "next/image";

const Navbar = () => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between md:justify-around items-center p-4 h-20'>
        <div className="flex gap-2 items-center cursor-pointer" onClick={() => window.location.href = '/'}>
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
          <p className="text-lg md:text-2xl font-semibold">RemoteJobs</p>
        </div>

        <div className="flex gap-2 h-12">
          <Image src="/bell.svg" width={24} height={24} alt="bell" />
          <Image src="/user.svg" width={48} height={48} alt="user" />
        </div>
      </div>
      <hr className='w-full'/>
    </div>
  )
}

export default Navbar