import { useAppSelector } from "../../../app/hooks";
import { getTicketCart } from "../tickets/slices/ticketCartSlice";

function CartCard() {
  const ticketCard = useAppSelector(getTicketCart);

  return <div></div>;
}

export default CartCard;
