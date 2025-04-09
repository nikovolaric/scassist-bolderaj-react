import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getClassCart,
  setArticleId,
  setPaymentMethod,
} from "../features/dashboard/classes/slices/classCartSlice";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { signUpForClassOnline } from "../services/classAPI";
import Header from "../components/Header";

function ClassPayment() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      dispatch(setArticleId(id));
    },
    [id, dispatch],
  );

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="flex items-center gap-4 text-2xl font-semibold">
          <Link to={`/dashboard/classes/${id}`}>Tečaji in vadbe</Link>{" "}
          <ChevronRightIcon className="w-6 stroke-3" /> Prijava
        </h1>
      </div>
      <PaymentType />
    </div>
  );
}

function PaymentType() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classCart = useAppSelector(getClassCart);
  const [isChecked, setIsChecked] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: signUpForClassOnline,
    onSuccess: (data) => {
      if (data instanceof Error) {
        return;
      }
      navigate(`/dashboard/classes/${classCart.articleId}/payment/success`);
    },
  });

  console.log(classCart);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.value);
    dispatch(setPaymentMethod(e.target.value));
  }

  async function handleClick() {
    mutate(classCart);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium">Izberi način plačila in dokončaj prijavo</p>
      <div className="flex flex-col gap-8 rounded-xl bg-white p-4">
        <p className="font-semibold">Znesek želim poravnati:</p>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={!isChecked}
                onChange={handleChange}
                value=""
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75 peer-checked:scale-125">
                <span
                  className={`${!isChecked ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <p className="font-medium">S plačilno kartico</p>
          </div>
          <div className="flex gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isChecked === "preInvoice"}
                onChange={handleChange}
                value="preInvoice"
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75 peer-checked:scale-125">
                <span
                  className={`${isChecked ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Po predračunu</p>
              <p className="text-sm font-medium text-black/50">
                Znesek lahko poravnate tudi v času delovnih ur, na recepciji
                plezalnega centra, pred pričetkom tečaja.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-500"
        onClick={handleClick}
        disabled={isPending}
      >
        {!isPending ? (
          <p className="flex items-center gap-4">
            Zaključi prijavo
            <ChevronRightIcon className="w-6 stroke-3" />
          </p>
        ) : (
          "..."
        )}
      </button>
    </div>
  );
}

export default ClassPayment;
