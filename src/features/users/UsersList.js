import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const UsersList = () => {
    useTitle('techNotes: Users List')

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

        content = (
          <div className=" overflow-y-auto px-2 py-2   w-full gap-2 flex justify-center item-center">
            <table className="table-auto text-[24px] text-black w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="border-black border-2 px-2 py-2 w-[25%]">
                    UserName
                  </th>
                  <th className="border-black border-2 px-2 py-2 w-[50%]">
                    Roles
                  </th>
                  <th className="border-black border-2 px-2 py-2 w-[25%]">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">{tableContent}</tbody>
            </table>
          </div>
        );
    }

    return content
}
export default UsersList