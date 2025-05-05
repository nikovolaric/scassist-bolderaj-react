import {
  ChartBarSquareIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router";
import { MouseEventHandler, useState } from "react";
import { logout } from "../services/authAPI";

function NavMenu() {
  const { pathname } = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function toggleMenu() {
    if (isOpenMenu) {
      setIsOpenMenu(false);
    } else {
      setIsOpenMenu(true);
    }
  }

  return (
    <>
      <BurgerIcon toggleMenu={toggleMenu} />
      <BottomMenu toggleMenu={toggleMenu} />
      {isOpenMenu && (
        <div
          className="fixed top-0 left-0 z-40 h-dvh w-dvw bg-black/50"
          onClick={() => setIsOpenMenu(false)}
        ></div>
      )}
      <nav
        className={`bg-neutral drop-shadow-input fixed top-1/2 right-4 z-50 flex -translate-y-1/2 flex-col gap-8 rounded-xl px-8 py-6 font-semibold ${isOpenMenu ? "" : "translate-y-[500%] md:translate-x-[500%] md:-translate-y-1/2"} h-[calc(100dvh-40px)] transition-transform duration-300 md:right-8 md:flex md:flex-col md:justify-between md:py-10 lg:right-20 lg:h-[80dvh] 2xl:right-[calc((100dvw-1280px)/2)]`}
      >
        <ul className="flex h-full flex-col justify-between xl:h-4/5">
          <li className="hidden md:block md:self-end">
            <ChevronRightIcon
              className="h-4 w-4 cursor-pointer self-end stroke-3 text-black/50"
              onClick={() => setIsOpenMenu(false)}
            />
          </li>
          <li
            className={`rounded-lg px-3.5 py-2 ${pathname === "/dashboard" ? "bg-primary" : ""}`}
          >
            <NavLink to="/dashboard" className="flex items-center gap-6">
              <HomeIcon className="h-6 stroke-2" /> Oglasna deska
            </NavLink>
          </li>
          <li className="px-3.5 py-2">
            <NavLink
              to="/dashboard/tickets"
              className="flex items-center gap-6"
            >
              <TicketIcon className="h-6 stroke-2" /> Nakup
            </NavLink>
            <ul className="mt-4 flex flex-col gap-2">
              <li
                className={`rounded-lg px-15 py-2 ${pathname === "/dashboard/tickets" ? "bg-primary" : ""}`}
              >
                <NavLink
                  to="/dashboard/tickets"
                  className="text-sm text-black/50"
                >
                  Vstopnice
                </NavLink>
              </li>
              <li
                className={`rounded-lg px-15 py-2 ${pathname === "/dashboard/classes" ? "bg-primary" : ""}`}
              >
                <NavLink
                  to="/dashboard/classes"
                  className="text-sm text-black/50"
                >
                  Aktivnosti in vadbe
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="px-3.5 py-2">
            <NavLink
              to="/dashboard/mytickets"
              className="flex items-center gap-6"
            >
              <ChartBarSquareIcon className="h-6 stroke-2" /> Moje plezanje v
              Bolderaju
            </NavLink>
            <ul className="mt-4 flex flex-col gap-2">
              <li
                className={`rounded-lg px-15 py-2 ${pathname === "/dashboard/mytickets" ? "bg-primary" : ""}`}
              >
                <NavLink
                  to="/dashboard/mytickets"
                  className="text-sm text-black/50"
                >
                  Vstopnice in obiski
                </NavLink>
              </li>
              <li
                className={`rounded-lg px-15 py-2 ${pathname === "/dashboard/myclasses" ? "bg-primary" : ""}`}
              >
                <NavLink
                  to="/dashboard/myclasses"
                  className="text-sm text-black/50"
                >
                  Aktivnosti in vadbe
                </NavLink>
              </li>
            </ul>
          </li>
          <li
            className={`rounded-lg px-3.5 py-2 ${pathname === "/dashboard/me" ? "bg-primary" : ""}`}
          >
            <NavLink to="/dashboard/me" className="flex items-center gap-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                  stroke="#1C1C1C"
                  strokeOpacity="0.75"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Moj profil
            </NavLink>
          </li>
          <li
            className={`rounded-lg px-3.5 py-2 ${pathname === "/dashboard/invoices" ? "bg-primary" : ""}`}
          >
            <NavLink
              to="/dashboard/invoices"
              className="flex items-center gap-6"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2H15.2C16.8802 2 17.7202 2 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C20 4.27976 20 5.11984 20 6.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V16.5M16 13H11.5M16 9H12.5M16 17H8M6 10V4.5C6 3.67157 6.67157 3 7.5 3C8.32843 3 9 3.67157 9 4.5V10C9 11.6569 7.65685 13 6 13C4.34315 13 3 11.6569 3 10V6"
                  stroke="#1C1C1C"
                  strokeOpacity="0.75"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Moji računi
            </NavLink>
          </li>
          <li className="px-3.5 py-2">
            <a
              href="https://www.bolderaj.si"
              target="_blank"
              className="flex items-center gap-6"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.68675 15.6451L4.59494 14.5435C4.6983 14.4839 4.8196 14.4631 4.9369 14.4851L8.6914 15.1878C8.99995 15.2455 9.28478 15.008 9.28338 14.6941L9.26876 11.4045C9.26836 11.3151 9.29193 11.2272 9.33701 11.15L11.2317 7.90621C11.3303 7.73739 11.3215 7.52658 11.2091 7.3666L8.01892 2.82568M19.0002 4.85905C13.5002 7.50004 16.5 11 17.5002 11.5C19.3773 12.4384 21.9876 12.5 21.9876 12.5C21.9958 12.3344 22 12.1677 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.1677 22 12.3344 21.9959 12.5 21.9877M16.7578 21.9398L13.591 13.591L21.9398 16.7578L18.2376 18.2376L16.7578 21.9398Z"
                  stroke="#1C1C1C"
                  strokeOpacity="0.75"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Na spletno stran
            </a>
          </li>
        </ul>
        <LogoutBtn />
        <ChevronDownIcon
          className="w-4 self-end stroke-3 text-black/50 md:hidden"
          onClick={() => setIsOpenMenu(false)}
        />
      </nav>
    </>
  );
}

function BurgerIcon({
  toggleMenu,
}: {
  toggleMenu: MouseEventHandler<HTMLButtonElement>;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-5">
      <button
        className="drop-shadow-input border-gray hidden h-11 w-12 cursor-pointer items-center justify-center rounded-lg border bg-white md:flex"
        onClick={() => navigate("/dashboard")}
      >
        <HomeIcon
          className={`${pathname === "/dashboard" ? "text-secondary" : "text-black/50"} w-6`}
        />
      </button>
      <button
        className="drop-shadow-input border-gray hidden h-11 w-12 cursor-pointer items-center justify-center rounded-lg border bg-white md:flex"
        onClick={() => navigate("/dashboard/me")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
            stroke={pathname === "/dashboard/me" ? "#D7A760" : "#1C1C1C"}
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="drop-shadow-input border-gray hidden h-11 w-12 cursor-pointer items-center justify-center rounded-lg border bg-white md:flex"
        onClick={toggleMenu}
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.5 12H9.5M21.5 6H3.5M21.5 18H3.5"
            stroke="#1C1C1C"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function BottomMenu({
  toggleMenu,
}: {
  toggleMenu: MouseEventHandler<HTMLButtonElement>;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="bg-neutral fixed bottom-1 left-1/2 z-30 flex w-[92dvw] -translate-x-1/2 items-center justify-around rounded-xl px-4 py-4 drop-shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.25)] md:hidden">
      <button className="flex-none" onClick={() => navigate("/dashboard")}>
        <HomeIcon
          className={`${pathname === "/dashboard" ? "text-secondary" : "text-black/50"} w-6`}
        />
      </button>
      <button className="flex-none" onClick={() => navigate("/dashboard/me")}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
            stroke={pathname === "/dashboard/me" ? "#D7A760" : "#1C1C1C"}
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button className="flex-none" onClick={toggleMenu}>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.5 12H9.5M21.5 6H3.5M21.5 18H3.5"
            stroke="#1C1C1C"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function LogoutBtn() {
  const navigate = useNavigate();

  async function handleClick() {
    const data = await logout();

    if (!(data instanceof Error)) navigate("/");
  }

  return (
    <button
      className="w-32 cursor-pointer self-end rounded-lg bg-white py-1 text-center text-black/50"
      onClick={handleClick}
    >
      Odjavi se
    </button>
  );
}

export default NavMenu;
