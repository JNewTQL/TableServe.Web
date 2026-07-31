import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { categoryAPI } from "./CategoryAPI";
import type { ICategory } from "./ICategory";

const emptyCategory: ICategory = {
  id: undefined,
  name: "",
  sortOrder: 0,
};

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICategory>({
    defaultValues: async () => {
      if (!id) return emptyCategory;
      return await categoryAPI.find(Number(id));
    },
  });

  const save = async (category: ICategory) => {
    if (category.id) {
      await categoryAPI.put(category);
    } else {
      await categoryAPI.post(category);
    }
    navigate("/categories");
  };

  return (
    <form className="card p-4 bg-light w-50" onSubmit={handleSubmit(save)} noValidate>
      <h3 className="mb-4">{id ? "Edit Category" : "Add Category"}</h3>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} {...register("name", { required: "Name is required." })} />
        <div className="invalid-feedback">{errors.name?.message}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="sortOrder" className="form-label">
          Sort Order
        </label>
        <input
          id="sortOrder"
          type="number"
          className={`form-control ${errors.sortOrder ? "is-invalid" : ""}`}
          {...register("sortOrder", {
            required: "Sort Order is required",
            valueAsNumber: true,
          })}
        />
        <div className="invalid-feedback">{errors.sortOrder?.message}</div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Category"}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/categories")}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
