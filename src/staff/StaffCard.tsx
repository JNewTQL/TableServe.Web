import { Dropdown } from "react-bootstrap";
import { formatPhoneNumber } from "../utility/formatUtilities";
import type { IStaff } from "./IStaff";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { staffAPI } from "./StaffAPI";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface IStaffCardProps {
  staff: IStaff;
  onRemove: (staff: IStaff) => void;
}

const getRoleLabel = (staff: IStaff) => {
  if (staff.isAdmin) {
    return <span className="badge text-bg-dark mt-1">Admin</span>;
  }

  if (staff.isManager) {
    return <span className="badge text-bg-primary mt-1">Manager</span>;
  }

  return <span className="text-muted fst-italic small mt-1">no role assigned</span>;
};

function StaffCard({ staff, onRemove }: IStaffCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <Dropdown className="d-inline position-absolute top-0 end-0 m-3">
        <Dropdown.Toggle className="btn btn-light border-0" style={{ background: "none" }}>
          <svg className="bi pe-none" width={20} height={20} fill="#ff9100">
            <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/staff/edit/${staff.id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            href="#"
            onClick={async (event) => {
              event.preventDefault();
              if (confirm("Delete this staff member?") && staff.id) {
                try {
                  await staffAPI.delete(staff.id);
                  onRemove(staff);
                  toast.success("Successfully deleted.");
                } catch (error: any) {
                  toast.error(error.message);
                }
              }
            }}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <span className="fs-4 fw-bolder">
        {staff.firstName} {staff.lastName}
      </span>
      <span className="fs-6 fw-light">{staff.username}</span>
      <span className="fs-6 fw-light">{formatPhoneNumber(staff.phone) || "—"}</span>
      <span className="fs-6 fw-light">{staff.email || "—"}</span>

      <div>{getRoleLabel(staff)}</div>
    </div>
  );
}

export default StaffCard;
