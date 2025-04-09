import {
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { setArticles } from "../slices/ticketCartSlice";
import { useNavigate } from "react-router";

function SetQuantity({ id }: { id: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const [err, setErr] = useState("");

  function handleMinus() {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
  }

  function handlePlus() {
    if (quantity < 50) setQuantity((quantity) => quantity + 1);
  }

  function handleClick() {
    const articles = {
      articleId: id,
      quantity,
    };

    if (quantity) {
      setErr("");
      dispatch(setArticles(articles));

      navigate("/dashboard/ticketcart");
    } else {
      setErr("Prosim izberite količino!");
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="border-gray drop-shadow-input flex w-fit items-center rounded-lg border-[1.5px]">
          <button className="cursor-pointer p-3" onClick={handleMinus}>
            <MinusIcon className="w-4 stroke-3" />
          </button>
          <p className="border-gray border-s-[1.5px] border-e-[1.5px] p-3">
            {quantity}
          </p>
          <button className="cursor-pointer p-3" onClick={handlePlus}>
            <PlusIcon className="w-4 stroke-3" />
          </button>
        </div>
        {err && (
          <p className="absolute mt-1 text-sm font-bold text-red-500">{err}</p>
        )}
      </div>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
        onClick={handleClick}
      >
        <p className="flex items-center gap-3">
          Kupi vstopnico
          <span>
            <ChevronRightIcon className="h-4 stroke-3" />
          </span>
        </p>
      </button>
    </div>
  );
}

export default SetQuantity;
