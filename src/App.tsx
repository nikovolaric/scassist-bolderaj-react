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
import ConfirmMail from "./pages/User/ConfirmMail";
import PickAgeGroup from "./pages/User/PickAgeGroup";
import Gifts from "./pages/User/Gifts";
import GiftCart from "./pages/User/GiftCart";
import GiftPaymentSuccess from "./pages/User/GiftPaymentSuccess";
import ErrorBoundary from "./pages/User/ErrorBoundry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    loader: Spinner,
    HydrateFallback: Spinner,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signup/end",
        element: <SignUpEnd />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "resetpassword/:token",
        element: <ResetPassword />,
      },
      { path: "confirmmail/:token", element: <ConfirmMail /> },
      {
        path: "setchildauth/:token",
        element: <SetChildAuth />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "me",
            element: <DashboardMe />,
          },
          {
            path: "tickets",
            element: <Tickets />,
          },
          {
            path: "tickets/pickuser",
            element: <PickUser />,
          },
          {
            path: "tickets/ticketcart",
            element: <OnlineCart />,
          },
          {
            path: "tickets/ticketcart/success",
            element: <TicketPaymentSuccess />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
          {
            path: "classes/pickuser",
            element: <PickUser />,
          },
          {
            path: "classes/:id",
            element: <ClassesChoose />,
          },
          {
            path: "classes/:id/payment",
            element: <ClassPayment />,
          },
          {
            path: "classes/:id/payment/success",
            element: <ClassSignUpSuccess />,
          },
          {
            path: "mytickets",
            element: <MyTickets />,
          },
          {
            path: "myclasses",
            element: <MyClasses />,
          },
          {
            path: "invoices",
            element: <MyInvoices />,
          },
          {
            path: "gifts/pickage",
            element: <PickAgeGroup />,
          },
          {
            path: "gifts/:ageGroup",
            element: <Gifts />,
          },
          {
            path: "gifts/giftcart",
            element: <GiftCart />,
          },
          {
            path: "gifts/giftcart/success",
            element: <GiftPaymentSuccess />,
          },
          {
            path: "child/:childId",
            element: <ChildDashboardLayout />,
            children: [
              {
                index: true,
                element: <ChildDashboard />,
              },
              {
                path: "tickets",
                element: <Tickets />,
              },
              {
                path: "tickets/ticketcart",
                element: <OnlineCart />,
              },
              {
                path: "tickets/ticketcart/success",
                element: <TicketPaymentSuccess />,
              },
              {
                path: "classes",
                element: <Classes />,
              },
              {
                path: "classes/:id",
                element: <ClassesChoose />,
              },
              {
                path: "classes/:id/payment",
                element: <ClassPayment />,
              },
              {
                path: "classes/:id/payment/success",
                element: <ClassSignUpSuccess />,
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
