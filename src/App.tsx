import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import SignUpEnd from "./pages/User/SignUpEnd";
import AppLayout from "./app/AppLayout";
import Dashboard from "./pages/User/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardMe from "./pages/User/DashboardMe";
import Tickets from "./pages/User/Tickets";
import OnlineCart from "./pages/User/OnlineCart";
import Classes from "./pages/User/Classes";
import MyTickets from "./pages/User/MyTickets";
import DashboardLayout from "./app/DashboardLayout";
import ChildDashboardLayout from "./app/ChildDashboardLayout";
import Spinner from "./components/Spinner";
import ChildDashboard from "./pages/User/ChildDashboard";
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import SetChildAuth from "./pages/User/SetChildAuth";
import ClassesChoose from "./pages/User/ClassesChoose";
import ClassPayment from "./pages/User/ClassPayment";
import ClassSignUpSuccess from "./pages/User/ClassSignUpSuccess";
import MyClasses from "./pages/User/MyClasses";
import TicketPaymentSuccess from "./pages/User/TicketPaymentSuccess";
import PickUser from "./pages/User/PickUser";
import MyInvoices from "./pages/User/MyInvoices";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    loader: Spinner,
    HydrateFallback: Spinner,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "signup/end",
        Component: SignUpEnd,
      },
      {
        path: "forgotpassword",
        Component: ForgotPassword,
      },
      {
        path: "resetpassword/:token",
        Component: ResetPassword,
      },
      {
        path: "setchildauth/:token",
        Component: SetChildAuth,
      },
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
          {
            path: "me",
            Component: DashboardMe,
          },
          {
            path: "tickets",
            Component: Tickets,
          },
          {
            path: "tickets/pickuser",
            Component: PickUser,
          },
          {
            path: "tickets/ticketcart",
            Component: OnlineCart,
          },
          {
            path: "tickets/ticketcart/success",
            Component: TicketPaymentSuccess,
          },
          {
            path: "classes",
            Component: Classes,
          },
          {
            path: "classes/pickuser",
            Component: PickUser,
          },
          {
            path: "classes/:id",
            Component: ClassesChoose,
          },
          {
            path: "classes/:id/payment",
            Component: ClassPayment,
          },
          {
            path: "classes/:id/payment/success",
            Component: ClassSignUpSuccess,
          },
          {
            path: "mytickets",
            Component: MyTickets,
          },
          {
            path: "myclasses",
            Component: MyClasses,
          },
          {
            path: "invoices",
            Component: MyInvoices,
          },
          {
            path: "child/:childId",
            Component: ChildDashboardLayout,
            children: [
              {
                index: true,
                Component: ChildDashboard,
              },
              {
                path: "tickets",
                Component: Tickets,
              },
              {
                path: "tickets/ticketcart",
                Component: OnlineCart,
              },
              {
                path: "tickets/ticketcart/success",
                Component: TicketPaymentSuccess,
              },
              {
                path: "classes",
                Component: Classes,
              },
              {
                path: "classes/:id",
                Component: ClassesChoose,
              },
              {
                path: "classes/:id/payment",
                Component: ClassPayment,
              },
              {
                path: "classes/:id/payment/success",
                Component: ClassSignUpSuccess,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
