import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { AiFillSave } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
      <div className=" overflow-y-auto px-20 py-2 flex flex-col  w-full gap-2">
        <p className={errClass}>{error?.data?.message}</p>
        <form
          className="fflex flex-col  w-full gap-2"
          onSubmit={onSaveNoteClicked}
        >
          <div className="  flex justify-between  items-center w-full text-[30px]">
            <h1>New Task</h1>
            <button className="icon-button1" title="Save" disabled={!canSave}>
              <AiFillSave className="" />
            </button>
          </div>
          <h2 className="">Task Title:</h2>
          <input
            type="text"
            onChange={onTitleChanged}
            value={title}
            className="text-gray-600 w-full dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          />

          <h2>Task Content:</h2>
          <textarea
            rows="10"
            style={{ height: "400px" }}
            type="text"
            className="resize-y text-gray-600 w-full h-[400px] dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal  flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            onChange={onTextChanged}
            value={text}
          />

          <div className="flex justify-start font-semibold gap-4 ">
            <div>ASSIGNED TO:</div>
            <select
              id="note-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
        </form>
      </div>
    );

    return content
}

export default NewNoteForm