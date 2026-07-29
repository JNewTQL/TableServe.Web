import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { IStaff } from "./IStaff";
import { staffAPI } from "./StaffAPI";
import StaffCard from "./StaffCard";
import StaffCardSkeleton from "./StaffCardSkeleton";

function StaffPage() {
  const [loading, setLoading] = useState(false);
  const [staffMembers, setStaff] = useState<IStaff[]>([]);

  const removeStaff = (staffToRemove: IStaff) => {
    setStaff(staffMembers.filter((s) => s.id !== staffToRemove.id));
  };

  async function loadStaff() {
    setLoading(true);
    try {
      const data = await staffAPI.list();
      setStaff(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, []);

  const staffCardSkeletons = Array.from(Array(12), (_v, i) => <StaffCardSkeleton key={i} />);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Staff ({staffMembers.length})</h2>
        <Link to="/staff/create" className="btn btn-primary">
          Add Staff Member
        </Link>
      </div>

      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
        {loading && staffCardSkeletons}
        {!loading && staffMembers.map((staffMember) => <StaffCard key={staffMember.id} staff={staffMember} onRemove={removeStaff} />)}
      </section>
    </section>
  );
}

export default StaffPage;
