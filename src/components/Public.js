import { Link } from "react-router-dom";
import { SiBandlab } from "react-icons/si";
const Public = () => {
  const content = (
    <div className="px-2 py-10 w-full min-h-screen flex flex-col justify-between items-center   ">
      <header className="gap-2 flex justify-center items-center w-full  text-3xl  px-1 py-1 ">
        <SiBandlab className="text-red-700" />
        <h1 className="">City Hospital Laboratory</h1>
      </header>
      <div className="flex justify-between items-center w-full px-16 py-1">
        <div className="  glass grid place-items-center w-[40%] px-8 py-4">
          <p className="flex flex-col justify-start  text-xl  ">
            <span className="font-bold  underline underline-offset-2">
              Testing Services:
            </span>
            <span className="">Blood Tests</span>
            <span className="">Paternity Tests</span>
            <span className="">Covid-19 Tests</span>
            <span className="">At-home Tests</span>
          </p>
        </div>
        <div className="glass grid place-items-center w-[40%] px-8 py-4">
          <p className="flex flex-col justify-start  text-xl  ">
            <span className="font-bold underline underline-offset-2">
              Contact Infomation:
            </span>
            <span className="">Roger Smith</span>
            <span className="">256 Linden Street</span>
            <span className="">Alex City, CA 12345</span>
            <span className="">(222) 222-2222</span>
          </p>
         </div>
      </div>
      <footer>
        <Link
          to="/login"
          className="font-bold text-xl text-white bg-blue-700 rounded px-8 py-1"
        >
          Employee Login
        </Link>
      </footer>
    </div>
  );
  return content;
};
export default Public;
