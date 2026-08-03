import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import toast from "react-hot-toast";

import type { IOrder } from "./IOrder";
import type { IStaff } from "../staff/IStaff";
import { orderAPI } from "./OrderAPI";
import { staffAPI } from "../staff/StaffAPI";
import { useStaffContext } from "../App";

let emptyOrder: IOrder = {
  id: undefined,
  tableNumber: undefined,
  notes: undefined,
  status: "PLACED",
  cancellationReason: undefined,
  total: 0,
  orderedAt: new Date().toISOString(),
  staffId: undefined,
  orderItems: [],
  menuItem: undefined,
};

function OrderForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { staff } = useStaffContext();
  const [staffList, setStaffList] = useState<IStaff[]>([]);
  const isEdit = Boolean(id);

  async function loadStaff() {
    setStaffList(await staffAPI.list());
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrder>({
    defaultValues: async () => {
      await loadStaff();
      if (!id) {
        emptyOrder.staffId = staff?.id;
        return emptyOrder;
      }
      return await orderAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IOrder> = async (order) => {
    try {
      if (!order.id) {
        const newOrder = await orderAPI.post(order);
        toast.success("Order successfully created.");
        navigate(`/orders/detail/${newOrder.id}`);
      } else {
        await orderAPI.put(order);
        toast.success("Order successfully updated.");
        navigate(`/orders/detail/${order.id}`);
      }
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
    }
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-4" onSubmit={handleSubmit(save)}>
      <div className="w-50">
        <label htmlFor="tableNumber" className="form-label">
          Table Number
        </label>
        <input
          id="tableNumber"
          type="number"
          {...register("tableNumber", {
            required: "Table number is required",
            valueAsNumber: true,
          })}
          className={`form-control ${errors?.tableNumber && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.tableNumber?.message}</div>
      </div>

      <div className="w-50">
        <label htmlFor="staffId" className="form-label">
          Assigned Staff
        </label>
        <select id="staffId" {...register("staffId", { required: "Staff is required" })} disabled className={`form-select ${errors?.staffId && "is-invalid"}`}>
          <option value="">Select Staff</option>
          {staffList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.staffId?.message}</div>
      </div>

      <div className="w-50">
        <label htmlFor="status" className="form-label">
          Order Status
        </label>
        <select
          id="status"
          {...register("status", { required: "Status is required" })}
          disabled={!isEdit} // ✨ Disabled on create, enabled on edit!
          className={`form-select ${errors?.status && "is-invalid"}`}
        >
          <option value="PLACED">Placed</option>
          <option value="PREPARING">Preparing</option>
          <option value="READY">Ready</option>
          <option value="SERVED">Served</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <div className="invalid-feedback">{errors?.status?.message}</div>
      </div>
      <div className="w-100">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <textarea id="notes" {...register("notes")} className={`form-control ${errors?.notes && "is-invalid"}`} rows={2} />
        <div className="invalid-feedback">{errors?.notes?.message}</div>
      </div>

      {isEdit && (
        <div className="w-100">
          <label htmlFor="cancellationReason" className="form-label">
            Cancellation Reason
          </label>
          <textarea id="cancellationReason" {...register("cancellationReason")} className="form-control" rows={2} />
        </div>
      )}

      <div className="d-flex justify-content-end w-100 mt-2">
        <Link to="/orders" className="btn btn-outline-primary me-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          <svg className="bi pe-none me-2" width={16} height={16} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#save`} />
          </svg>
          Save Order
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
