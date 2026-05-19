export default function ProductCard({ image, title, price }) {
  return (
    <div className="card shadow p-2">
      <img
        src={image}
        alt={title}
        height="200"
        className="card-img-top"
      />

      <div className="card-body text-center">
        <h5>{title}</h5>

        <h6 className="text-success">₹{price}</h6>

        <button className="btn btn-primary">
          Add To Cart
        </button>
      </div>
    </div>
  );
}