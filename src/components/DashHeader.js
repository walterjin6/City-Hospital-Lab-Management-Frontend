import { useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaUserCog } from 'react-icons/fa'
import { MdOutlineExitToApp } from 'react-icons/md'
import { AiFillFileAdd } from 'react-icons/ai'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import { SiBandlab } from 'react-icons/si'
import { IoMdPersonAdd } from 'react-icons/io'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const onNewNoteClicked = () => navigate('/dash/notes/new')
  const onNewUserClicked = () => navigate('/dash/users/new')
  const onNotesClicked = () => navigate('/dash/notes')
  const onUsersClicked = () => navigate('/dash/users')

  let dashClass = null
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = 'dash-header__container--small'
  }

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button className='-button' title='New Note' onClick={onNewNoteClicked}>
        <AiFillFileAdd className='' />
      </button>
    )
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className='icon-button'
        title='New User'
        onClick={onNewUserClicked}
      >
        <IoMdPersonAdd className='' />
      </button>
    )
  }

  let userButton = null
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <button className='icon-button' title='Users' onClick={onUsersClicked}>
          <FaUserCog className=' mx-2 icon-button' />
        </button>
      )
    }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button className='icon-button' title='Notes' onClick={onNotesClicked}>
        <BiEdit className=' mx-2 icon-button' />
      </button>
    )
  }

  const logoutButton = (
    <button className='icon-button' title='Logout' onClick={sendLogout}>
      <MdOutlineExitToApp className=' mx-2 icon-button' />
    </button>
  )

  const errClass = isError ? 'block' : ' invisible'

  let buttonContent
  if (isLoading) {
    buttonContent = (
      <div className='w-full h-screen flex justify-center items-center '>
        <PulseLoader color={'#808080'} size={100} />
      </div>
    )
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    )
  }

  const content = (
    <div className=' flex flex-col justify-between  w-full   '>
      <p className={errClass}>{error?.data?.message}</p>

      <header className='dash-header'>
        <div
          className={`bg-blue-800 text-white px-4 flex justify-between  items-center w-full text-[30px] ${dashClass}`}
        >
          <Link to='/dash'>
            <header className='gap-2  flex justify-center items-center  text-3xl  px-1 py-1 '>
              <SiBandlab className='text-red-500' />
              <h1 className=''>Tasks Management</h1>
            </header>
          </Link>
          <nav className='gap-1  flex justify-center items-center '>
            {buttonContent}
          </nav>
        </div>
      </header>
    </div>
  )

  return content
}
export default DashHeader
