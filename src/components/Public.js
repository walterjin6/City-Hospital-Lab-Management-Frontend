import { Link } from "react-router-dom";
import { SiBandlab } from "react-icons/si";
import { GiWaterDrop } from 'react-icons/gi'
import { GiHeartOrgan } from 'react-icons/gi'
import { FaVirus } from 'react-icons/fa'
import { RiParentFill } from 'react-icons/ri'

const Public = () => {
  const content = (
    <div className='px-2 py-10 w-full min-h-screen flex flex-col justify-between items-center   '>
      <header className='gap-2 flex justify-center items-center w-full  text-3xl  px-1 py-1 '>
        <SiBandlab className='text-red-700' />
        <h1 className=''>City Hospital Laboratory</h1>
      </header>
      <div className='flex justify-center items-center w-full px-16 py-1'>
        <div className='glass grid place-items-center w-[40%] px-8 py-4'>
          <p className='font-boldflex flex-col justify-start w-full  text-xl  '>
            <h1 className='w-full font-bold mb-2 text-white bg-blue-600 text-2xl round px-2 py-1'>
              - Testing Service -
            </h1>
            <div className='flex justify-start gap-4'>
              <GiWaterDrop className='text-blue-800' />
              <span className=''>Blood</span>
            </div>
            <div className='flex justify-start gap-4'>
              <GiHeartOrgan className='text-blue-800' />
              <span className=''>Organ</span>
            </div>
            <div className='flex justify-start gap-4'>
              <FaVirus className='text-blue-800' />
              <span className=''>Covid-19</span>
            </div>
            <div className='flex justify-start gap-4'>
              <RiParentFill className='text-blue-800' />
              <span className=''>Paternity</span>
            </div>
          </p>
        </div>
        <div className='glass grid place-items-center w-[40%] px-8 py-4'>
          <p className='flex flex-col justify-start w-full  text-xl  '>
            <h1 className='w-full font-bold mb-2 text-white bg-blue-600 text-2xl round px-2 py-1'>
              - Contact Infomation -
            </h1>
            <span className=''>Roger Smith</span>
            <span className=''>256 Linden Street</span>
            <span className=''>Alex City, CA 12345</span>
            <span className=''>(222) 222-2222</span>
          </p>
        </div>
      </div>
      <footer>
        <Link
          to='/login'
          className='font-bold text-xl text-white bg-blue-700 rounded px-8 py-1'
        >
          Employee &nbsp;&nbsp; Login
        </Link>
      </footer>
    </div>
  )
  return content;
};
export default Public;
