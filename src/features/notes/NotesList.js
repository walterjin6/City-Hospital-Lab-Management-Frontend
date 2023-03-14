import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const NotesList = () => {
    useTitle('techNotes: Notes List')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

      content = (
        <div className=' overflow-y-auto'>
          <div className='flex justify-center item-center w-full'>
            <table className='table-auto text-[24px] text-black w-full'>
              <thead className='bg-gray-300'>
                <tr>
                  <th className='border-black border-2 px-2 py-2 w-[14%]'>
                    Status
                  </th>
                  <th className='border-black border-2 px-2 py-2  w-[18%]'>
                    Created
                  </th>
                  <th className='border-black border-2 px-2 py-2 w-[18%]'>
                    Updated
                  </th>
                  <th className='border-black border-2 px-2 py-2 w-[25%]'>
                    Title
                  </th>
                  <th className='border-black border-2 px-2 py-2 w-[15%]'>
                    Owner
                  </th>
                  <th className='border-black border-2 px-2 py-2 w-[10%]'>
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>{tableContent}</tbody>
            </table>
          </div>
        </div>
      )
    }

    return content
}
export default NotesList