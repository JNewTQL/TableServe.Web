import { Dropdown } from "react-bootstrap";
import type { ICategory } from "./ICategory";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { categoryAPI } from "./CategoryAPI";
import { Link } from "react-router-dom";

interface ICategoryCardProps {
  category: ICategory;
  onRemove: (category: ICategory) => void;
}

function CategoryCard({ category, onRemove }: ICategoryCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <Dropdown className="d-inline position-absolute top-0 end-0 m-3">
        <Dropdown.Toggle className="btn btn-light border-0" style={{ background: "none" }}>
          <svg className="bi pe-none" width={20} height={20} fill="#ff9100">
            <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/categories/detail/${category.id}`}>
            View
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={`/categories/edit/${category.id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            href="#"
            onClick={async (event) => {
              event.preventDefault();
              if (confirm("Delete this category?") && category.id) {
                await categoryAPI.delete(category.id);
                onRemove(category);
              }
            }}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <span className="fs-4 fw-medium">{category.name}</span>
      <span className="fs-5 fw-light">{category.sortOrder}</span>
    </div>
  );
}

export default CategoryCard;
