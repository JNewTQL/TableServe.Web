import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ICategory } from "./ICategory";
import { categoryAPI } from "./CategoryAPI";

function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ICategory | undefined>(undefined);

  async function loadCategory() {
    setLoading(true);
    try {
      setCategory(await categoryAPI.find(Number(id)));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Category</h2>
      </div>

      {loading && <p>Loading…</p>}
      {category && (
        <div className="row d-flex flex-wrap gap-4">
          <dl>
            <dt>Name</dt>
            <dd>{category.name}</dd>

            <dt>Sort Order</dt>
            <dd>{category.sortOrder}</dd>
          </dl>
        </div>
      )}
    </section>
  );
}

export default CategoryDetailPage;
