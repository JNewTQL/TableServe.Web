import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ICategory } from "./ICategory";
import { categoryAPI } from "./CategoryAPI";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import bootstrapIcons from "../assets/bootstrap-icons.svg";

function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const removeCategory = (categoryToRemove: ICategory) => {
    setCategories(categories.filter((s) => s.id !== categoryToRemove.id));
  };

  async function loadCategory() {
    setLoading(true);
    try {
      const data = await categoryAPI.list();

      const sortedData = data.sort((a, b) => a.sortOrder - b.sortOrder);

      setCategories(sortedData);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, []);

  const categoryCardSkeletons = Array.from(Array(12), (_v, i) => <CategoryCardSkeleton key={i} />);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Categories ({categories.length})</h2>
        <Link to="/categories/create" className="btn btn-primary">
          <svg className="bi pe-none me-2" width={32} height={32} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#plus`} />
          </svg>
          Add Category
        </Link>
      </div>

      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
        {loading && categoryCardSkeletons}
        {!loading && categories.map((category) => <CategoryCard key={category.id} category={category} onRemove={removeCategory} />)}
      </section>
    </section>
  );
}

export default CategoryPage;
