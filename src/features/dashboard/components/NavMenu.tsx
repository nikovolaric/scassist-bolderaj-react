function NavMenu() {
  return (
    <div>
      <BurgerIcon />
    </div>
  );
}

function BurgerIcon() {
  return (
    <button className="drop-shadow-input border-gray flex h-11 w-12 cursor-pointer items-center justify-center rounded-lg border bg-white">
      <img
        src="/icons/burger.svg"
        alt="burger-menu-icon"
        className="w-4.5 flex-none"
      />
    </button>
  );
}

export default NavMenu;
