import { ReactNode } from "react";
import { useNavigate } from "react-router";

function LinkBtn({
  children,
  to,
  type,
}: {
  children: ReactNode;
  to: string;
  type: string;
}) {
  const navigate = useNavigate();

  const style: { [key: string]: string } = {
    primary:
      "from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300",
    secondary:
      "hover:bg-secondary cursor-pointer rounded-lg px-4 py-3 font-semibold transition-colors duration-300 border border-black hover:border-black/0",
  };

  function handleClick() {
    navigate(to);
  }

  return (
    <button onClick={handleClick} className={style[type]}>
      {children}
    </button>
  );
}

export default LinkBtn;
