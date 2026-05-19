const cartItems = [
  {
    id: 1,
    name: 'Classic Leather Jacket',
    price: 129.99,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    price: 69.99,
    quantity: 2,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Everyday Sneakers',
    price: 89.99,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
];

function Cart() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className="mb-1">Shopping Cart</h1>
          <p className="text-muted">Review your items and complete your purchase.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              {cartItems.length === 0 ? (
                <p className="mb-0">Your cart is empty. Add products to get started.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="mb-1 text-muted">Quantity: {item.quantity}</p>
                      <p className="mb-0 fw-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button type="button" className="btn btn-outline-secondary btn-sm">
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <strong>${shipping.toFixed(2)}</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-semibold">Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button type="button" className="btn btn-primary w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;