import { useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();
  return (
    <img
      src="/logo.svg"
      alt="logotip"
      className="h-auto w-auto cursor-pointer object-cover"
      onClick={() => navigate("/dashboard")}
    />
  );
}

export default Logo;
