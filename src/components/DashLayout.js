import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
    return (
      <div className="w-full  h-screen overflow-y-auto flex flex-col justify-between ">
        <DashHeader className=" " />
        <Outlet className="flex-grow h-full overflow-y-auto" />
        <DashFooter className=" " />
      </div>
    );
}
export default DashLayout