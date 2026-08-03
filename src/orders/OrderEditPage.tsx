import OrderForm from "./OrderForm";

function OrderEditPage() {
  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <h2 className="pb-4 mb-4 border-bottom border-2">Edit Order</h2>
      <OrderForm />
    </section>
  );
}

export default OrderEditPage;
