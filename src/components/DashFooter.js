import { AiFillHome } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className=" flex justify-start  items-center text-[20px] font-black"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <AiFillHome className=" mx-2" />
      </button>
    );
  }

  const content = (
    <footer className="bg-blue-800 text-white px-4 flex justify-between  items-center  w-full text-[20px] font-black">
      <div className="flex justify-start gap-2 items-center  px-1 py-1">
        {goHomeButton}
        <p>Current User: {username}</p>
        <p>Status: {status}</p>
      </div>
      <div>{new Date().toLocaleString() + ""}</div>
    </footer>
  );
  return content;
};
export default DashFooter;
