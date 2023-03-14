import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import { HiSearchCircle } from "react-icons/hi";
import { AiFillFileAdd } from "react-icons/ai";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";


const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    useTitle(`techNotes: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
      <div className="flex justify-center items-center  h-full w-full">
        <div className="font-black gap-4 text-red-600 flex flex-col justify-start items-center w-[30%]   ">
          <h1>~ Welcome ~</h1>
          <h1> {username}</h1>
        </div>
        <section className="flex flex-col justify-between items-center w-[70%] px-1 py-1 gap-4 text-2xl font-semibold">
          <Link
            to="/dash/notes"
            className="flex justify-start items-center w-full  gap-2 "
          >
            <HiSearchCircle className="icon-button1 w-[15%] text-5xl" />
            <span className="w-[40%] px-4 py-1 rounded bg-blue-800 text-white  ">
              View Tasks
            </span>
          </Link>
          <Link
            to="/dash/notes/new"
            className="flex justify-start items-center w-full  gap-2 "
          >
            <AiFillFileAdd className="icon-button1 w-[15%] text-5xl" />
            <span className="w-[40%] px-4 py-1 rounded bg-blue-800 text-white  ">
              Add New Task
            </span>
          </Link>
          {(isManager || isAdmin) && (
            <Link
              to="/dash/users"
              className="flex justify-start items-center w-full  gap-2 "
            >
              <AiTwotoneSetting className="icon-button1 w-[15%] text-5xl" />
              <span className="w-[40%] px-4 py-1 rounded bg-blue-800 text-white  ">
                View User Settings
              </span>
            </Link>
          )}
          {(isManager || isAdmin) && (
            <Link
              to="/dash/users/new"
              className="flex justify-start items-center w-full  gap-2 "
            >
              <IoMdPersonAdd className="icon-button1 w-[15%] text-5xl" />
              <span className="w-[40%] px-4 py-1 rounded bg-blue-800 text-white  ">
                Add New User
              </span>
            </Link>
          )}
        </section>
      </div>
    );

    return content
}
export default Welcome