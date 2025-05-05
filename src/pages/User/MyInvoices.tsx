import Header from "../../components/Header";
import UserInvocies from "../../features/dashboard/invoices/UserInvoices";
import UserPreInvocies from "../../features/dashboard/invoices/UserPreInvocies";

function MyInvoices() {
  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-16 lg:gap-20">
        <UserPreInvocies />
        <UserInvocies />
      </div>
    </div>
  );
}

export default MyInvoices;
