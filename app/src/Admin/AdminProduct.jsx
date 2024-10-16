import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AdminProduct({ products = [] }) {
  const [productData, setProductData] = useState({
    name: "",
    rating: "",
    price: "",
    image: "",
    description: "",
    original: "",
    category: "",
    review: "",
  });
  const { addProduct } = useContext(ShopContext);
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // for category
  const checkCategory = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategories((prev) => [...prev, e.target.value]);
    }
  };
  useEffect(() => {
    if (categories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((items) => categories.includes(items.category))
      );
    }
  }, [categories, products]);

  const navigate = useNavigate();
  // for addpro
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name == "rating" || name == "price" ? Number(value) : value;
    setProductData((prevData) => ({ ...prevData, [name]: newValue }));
  };
  const formSubmit = (e) => {
    e.preventDefault();
    addProduct(productData);
    setProductData({
      name: "",
      rating: "",
      price: "",
      image: "",
      description: "",
      original: "",
      category: "",
      review: "",
    });
  };
  return (
    <div className="flex">
      <div className="overflow-y-auto max-h-screen scrollbar-thin w-[69%]">
        <table className="table-auto border-collapse border bg-[#F9FCFA] border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Id</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Rating</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct?.map((product, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{product.id}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cartCard w-[70px] h-[50px] object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">
                  {product.category.toUpperCase()}
                </td>
                <td className="border border-gray-300 p-2">{product.rating}</td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                    onClick={() =>
                      navigate(`/adminpanel/productaction/${product.id}`, {
                        state: { product },
                      })
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center">
        <h1>CATEGORIES</h1>
        <div className="bg-[#F9FCFA] shadow-sm flex text-xs py-5 px-2 rounded-md  w-[320px] ms-2 mb-3 justify-between">
          <p className="text-nowrap text-xs sm:text-[100%]">
            <input type="checkbox" onChange={checkCategory} value={"bed"} />{" "}
            BEDS
          </p>
          <p className="text-nowrap text-xs sm:text-[100%]">
            <input type="checkbox" onChange={checkCategory} value={"lamps"} />{" "}
            LAMPS
          </p>
          <p className="text-nowrap text-xs sm:text-[100%]">
            <input type="checkbox" onChange={checkCategory} value={"tables"} />{" "}
            TABLES
          </p>
          <p className="text-nowrap text-xs sm:text-[100%]">
            <input type="checkbox" onChange={checkCategory} value={"chairs"} />{" "}
            CHAIRS
          </p>
          <p className="text-nowrap text-xs sm:text-[100%]">
            <input type="checkbox" onChange={checkCategory} value={"sofas"} />{" "}
            SOFAS
          </p>
        </div>
        <h1>ADD PRODUCT</h1>
        <form
          onSubmit={formSubmit}
          className="p-2 w-[320px] ms-2 bg-[#F9FCFA] shadow-md rounded-lg space-y-2"
        >
          <input
            placeholder="Name"
            required
            name="name"
            value={productData.name}
            type="text"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          />

          <input
            placeholder="Rating"
            required
            name="rating"
            min={1}
            max={5}
            value={productData.rating}
            type="number"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          />

          <input
            placeholder="Price"
            required
            name="price"
            value={productData.price}
            type="number"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          />

          <input
            placeholder="Image"
            required
            name="image"
            value={productData.image}
            type="text"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          />

          <textarea
            placeholder="Description"
            required
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          ></textarea>

          <select
            name="original"
            value={productData.original}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          >
            <option value="">Select Original</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="sofas">Sofas</option>
            <option value="chairs">Chairs</option>
            <option value="tables">Tables</option>
            <option value="bed">Beds</option>
            <option value="lamps">Lamps</option>
          </select>

          <textarea
            placeholder="Review"
            required
            name="review"
            value={productData.review}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-xs focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProduct;
