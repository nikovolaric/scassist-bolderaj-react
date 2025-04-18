import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpEnd from "./pages/SignUpEnd";
import AppLayout from "./app/AppLayout";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardMe from "./pages/DashboardMe";
import Tickets from "./pages/Tickets";
import OnlineCart from "./pages/OnlineCart";
import Classes from "./pages/Classes";
import MyTickets from "./pages/MyTickets";
import DashboardLayout from "./app/DashboardLayout";
import ChildDashboardLayout from "./app/ChildDashboardLayout";
import Spinner from "./components/Spinner";
import ChildDashboard from "./pages/ChildDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SetChildAuth from "./pages/SetChildAuth";
import ClassesChoose from "./pages/ClassesChoose";
import ClassPayment from "./pages/ClassPayment";
import ClassSignUpSuccess from "./pages/ClassSignUpSuccess";
import MyClasses from "./pages/MyClasses";
import TicketPaymentSuccess from "./pages/TicketPaymentSuccess";

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
          {
            path: "mytickets",
            Component: MyTickets,
          },
          {
            path: "myclasses",
            Component: MyClasses,
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
