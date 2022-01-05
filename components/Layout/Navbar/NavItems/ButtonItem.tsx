import { ButtonNavItem } from "../../../../types/NavItem";
import Latern from "./Latern";

function ButtonItem({ title, withLatern, onClick, icon }: ButtonNavItem) {
  const laternJSX = withLatern ? <Latern /> : null;

  return (
    <>
      {laternJSX}
      <button onClick={onClick} className="navbar__btn-item">
        <span>{title}</span>
      </button>
    </>
  );
}

export default ButtonItem;
