import MenuItemCard from "./MenuItemCard";
import { useEffect, useState } from "react";
import type { IMenuItem } from "./IMenuItem";
import { menuItemAPI } from "./MenuItemAPI";
import MenuItemCardSkeleton from "./MenuitemCardSkeleton";
import { Link } from "react-router-dom";

function MenuItemsPage() {
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const menuItemCardSkeletons = Array.from(Array(12), (_value, index) => <MenuItemCardSkeleton key={index} />);

  async function loadMenuItems() {
    setLoading(true);
    try {
      const data = await menuItemAPI.list();
      setMenuItems(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenuItems();
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Menu</h2>
        <Link to="/menuitems/create" className="btn fs-5 btn-primary">
          Add Item
        </Link>
      </div>{" "}
      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
        {loading && menuItemCardSkeletons}
        {menuItems.map((menuItem) => (
          <MenuItemCard key={menuItem.id} menuItem={menuItem} />
        ))}
      </section>
    </section>
  );
}

export default MenuItemsPage;
