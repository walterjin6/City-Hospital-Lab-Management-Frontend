
import { Link, useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import { AiFillEdit } from "react-icons/ai";

const User = ({ userId }) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
          <tr>
            <td className="border-black border-2 px-2 py-2">{user.username}</td>
            <td className="border-black border-2 px-2 py-2">
              {user.roles.join(",")}
            </td>
            <td className="border-black border-2 px-2 py-2">
              <Link to={`/dash/users/${userId}`} className="text-black">
                <AiFillEdit />
              </Link>
            </td>
          </tr>
        );

    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser