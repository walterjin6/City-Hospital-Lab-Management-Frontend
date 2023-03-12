import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import useTitle from "../../hooks/useTitle"
import { AiFillSave } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle('techNotes: New User')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
      <div className=" overflow-y-auto px-20 py-2 flex flex-col  w-full gap-2">
        <p className={errClass}>{error?.data?.message}</p>

        <form
          className="flex flex-col  w-full gap-2"
          onSubmit={onSaveUserClicked}
        >
          <div className="  flex justify-between  items-center w-full text-[30px]">
            <h1>New User</h1>
            <div className="flex ">
              <button className="icon-button1" title="Save" disabled={!canSave}>
                <AiFillSave className="" />
              </button>
            </div>
          </div>
          <h2 className="">Username: [3-20 letters]</h2>
          <input
            className="text-gray-600 w-full dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />

          <h2>Password: [4-12 chars incl. !@#$%]</h2>
          <input
            className="text-gray-600 w-full dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />

          <div className="flex justify-start font-semibold gap-8 ">
            <div>ASSIGNED ROLES:</div>
            <select
              id="roles"
              name="roles"
              className={`form__select ${validRolesClass}`}
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>
        </form>
      </div>
    );

    return content
}
export default NewUserForm