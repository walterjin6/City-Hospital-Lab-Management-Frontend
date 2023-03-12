import { Link, useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'
import { AiFillEdit } from 'react-icons/ai'


const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        return (
          <tr>
            <td className="border-black border-2 px-2 py-2">
              {note.completed ? (
                <span className="text-green-500">Completed</span>
              ) : (
                <span className="text-red-500">Open</span>
              )}
            </td>
            <td className="border-black border-2 px-2 py-2">{created}</td>
            <td className="border-black border-2 px-2 py-2">{updated}</td>
            <td className="border-black border-2 px-2 py-2">{note.title}</td>
            <td className="border-black border-2 px-2 py-2">{note.username}</td>
            <td className="border-black border-2 px-2 py-2">
              <Link to={`/dash/notes/${noteId}`} className="text-black">
                <AiFillEdit />
              </Link>
            </td>
          </tr>
        );

    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote