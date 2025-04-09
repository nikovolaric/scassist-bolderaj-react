import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { clearSignupData } from "../slices/signUpSlice";

function AuthLogo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(clearSignupData());
    navigate("/");
  }

  return (
    <img
      src="/logo.svg"
      alt="logotip"
      className="h-auto w-auto cursor-pointer object-cover"
      onClick={handleClick}
    />
  );
}

export default AuthLogo;
