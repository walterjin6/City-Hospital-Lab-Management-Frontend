import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { AiFillSave } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

const EditNoteForm = ({ note, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
          <button
            className="icon-button1"
            title="Delete"
            onClick={onDeleteNoteClicked}
          >
            <RiDeleteBin6Fill className=" mx-2 icon-button1" />
          </button>
        );
    }

    const content = (
      <div className=" overflow-y-auto px-20 py-2 flex flex-col  w-full gap-2">
        <div className="  flex justify-between  items-center w-full text-[30px]">
          <h1>Edite Note #{note.ticket}</h1>
          <div className="flex ">
            <button
              className="icon-button1"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <AiFillSave className="" />
            </button>
            {deleteButton}

            
          </div>
        </div>
        <h2 className="">Task Title:</h2>
        <input
          type="text"
          onChange={onTitleChanged}
          value={title}
          className="text-gray-600 w-full dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          placeholder="Placeholder"
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
          <div className="flex ">
            <label>WORK COMPLETE:</label>
            <input
              type="checkbox"
              className="text-black mx-2"
              onChange={onCompletedChanged}
              name="completed"
              checked={completed}
            />
          </div>
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
          <div className="flex ">
            <div>CREATED:&nbsp; </div>
            <div>{note.createdAt}</div>
          </div>
          <div className="flex ">
            <div>UPDATED:&nbsp; </div>
            <div>{note.updatedAt}</div>
          </div>
        </div>
      </div>
    );

    return content
}

export default EditNoteForm