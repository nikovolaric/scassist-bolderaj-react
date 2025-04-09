import Header from "../components/Header";
import CartCard from "../features/dashboard/components/CartCard";

function OnlineCart() {
  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <CartCard />
    </div>
  );
}

export default OnlineCart;
