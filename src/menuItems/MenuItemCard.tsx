import { menuItemAPI } from "./MenuItemAPI";
import toast from "react-hot-toast";
import { IMenuItem } from "./IMenuItem";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import bootstrapIcons from "../assets/bootstrap-icons.svg";

interface IMenuItemCardProps {
  menuItem: IMenuItem;
  onRemove: (menuItem: IMenuItem) => void;
}

function MenuItemCard({ menuItem, onRemove }: IMenuItemCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <div className="d-flex justify-content-between align-items-start">
        <span className="fs-4 fw-bolder">{menuItem.name}</span>

        <Dropdown>
          <Dropdown.Toggle className="btn btn-light d-flex border-0" style={{ background: "none" }}>
            <svg className="bi pe-none" width={20} height={20} fill="#ff9100">
              <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/menuitems/edit/${menuItem.id}`}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href="#"
              onClick={async (event) => {
                event.preventDefault();
                if (confirm("Are you sure you want to delete this menu item?") && menuItem.id) {
                  try {
                    await menuItemAPI.delete(menuItem.id);
                    onRemove(menuItem); // update parent state
                    toast.success("Successfully deleted.");
                  } catch (error: any) {
                    toast.error(error.message, { duration: 6000 });
                  }
                }
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <span className="fs-5 fw-light">${menuItem.price}</span>
    </div>
  );
}

export default MenuItemCard;
