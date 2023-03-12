import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { AiFillSave } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <div className=" overflow-y-auto px-20 py-2 flex flex-col  w-full gap-2">
      <p className={errClass}>{errContent}</p>

      <form
        className="flex flex-col  w-full gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="  flex justify-between  items-center w-full text-[30px]">
          <h1>Edite User</h1>
          <div className="flex ">
            <button
              className="icon-button1"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <AiFillSave className="" />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <RiDeleteBin6Fill className=" mx-2 icon-button1" />
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
          <div className="flex justify-start gap-4 content-start text-start items-start">
            <label>ACTIVE:</label>
            <input
              className="text-black mt-[3px]"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            />
          </div>
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

  return content;
};
export default EditUserForm;
