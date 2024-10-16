import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function PlaceOrder() {
  const { shippingFee, currency, loading } = useContext(ShopContext);
  const { setUserOrders, cartTotal, setCartItems, setCartTotal, cartItems } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState("pending");
  const [address, setAdress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    place: "",
    pin: "",
  });
  const [order, setOrder] = useState({
    id: uuidv4(),
    products: cartItems,
    address: address,
    totalAmount: cartTotal + shippingFee,
    paymentStatus: payment,
    delivaryStatus: "pending",
  });
  useEffect(() => {
    setOrder((preOrder) => ({
      ...preOrder,
      address: address,
      paymentStatus: payment,
    }));
  }, [address, payment]);
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAdress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setUserOrders((prevUserOrders) => [...prevUserOrders, order]);
    setCartItems({});
    setCartTotal(0);
    setTimeout(() => {
      toast.success("Your order placed succesfully");
    }, 1000);
    navigate("/");
  };

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <form
          className="pt-[26%] sm:pt-[8%] h-[100vh] flex flex-col sm:flex-row justify-between gap-5 sm:gap-3 w-[100%] px-5"
          onSubmit={handleClick}
        >
          <div className="w-[100%] sm:w-[40%]">
            <h1
              className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10"
              style={{ textShadow: "0 0 1px #000000" }}
            >
              DELIVARY ADDRESS
            </h1>
            <div>
              <div className="flex flex-col gap-3 mt-[10%] bg-[#F9FCFA] p-3 rounded-lg shadow-sm shadow-[#544A3E]">
                <div className="flex gap-3 w-[100%] justify-between">
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={address.firstName}
                    onChange={handleAddress}
                    placeholder="First name"
                    className="focus:outline-none border-2 border-[#544A3E] rounded-md text-xs py-1 px-2 w-[50%]"
                  />
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={address.lastName}
                    onChange={handleAddress}
                    placeholder="Last name"
                    className="focus:outline-none border-2 border-[#544A3E] rounded-md text-xs py-1 px-2 w-[50%]"
                  />
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleAddress}
                  placeholder="Email"
                  className="focus:outline-none border-2 border-[#544A3E] rounded-md text-xs py-1 px-2"
                />
                <input
                  required
                  type="text"
                  name="place"
                  value={address.place}
                  onChange={handleAddress}
                  placeholder="Place"
                  className="focus:outline-none border-2 border-[#544A3E] rounded-md text-xs py-1 px-2"
                />
                <div className="flex w-[100%] gap-3 justify-between">
                  <input
                    required
                    type="text"
                    name="mobile"
                    value={address.mobile}
                    onChange={handleAddress}
                    minLength={10}
                    placeholder="Mobile Number"
                    className="focus:outline-none border-2 border-[#544A3E] rounded-md text-xs py-1 px-2 w-[50%]"
                  />
                  <input
                    required
                    type="text"
                    name="pin"
                    minLength={6}
                    value={address.pin}
                    onChange={handleAddress}
                    placeholder="Pincode"
                    className="focus:outline-none border-2 border-[#544A3E] rounded-md text-xs py-1 px-2 w-[50%]"
                  />
                </div>
              </div>
              <div className="bg-[#F9FCFA] mt-5 rounded-md text-xs text-red-800 shadow-sm shadow-[#544A3E] p-3">
                <input type="checkbox" required />
                <label>
                  {" "}
                  Please review your order carefully. By clicking &apos;Place
                  order,&apos; you confirm your purchase of the selected
                  products and authorize us to process the payment as per your
                  chosen method.
                </label>
              </div>
            </div>
          </div>
          <div className="w-[100%] sm:w-[50%] mt-[10%] sm:mt-0">
            <h1
              className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10"
              style={{ textShadow: "0 0 1px #000000" }}
            >
              PAYMENT DETAILS
            </h1>
            <div className="flex flex-col gap-3 mt-12 bg-[#F9FCFA] p-3 rounded-lg shadow-sm shadow-[#544A3E]">
              <div className="flex justify-between">
                Total :
                <p className="font-bold">
                  {currency}
                  {cartTotal}.00
                </p>
              </div>
              <div className="flex justify-between">
                Shipping fee :
                <p className="font-bold">
                  {currency}
                  {shippingFee}.00
                </p>
              </div>
              <div className="flex justify-between">
                Total payment :
                <p className="font-bold">
                  {currency}
                  {cartTotal + shippingFee}.00
                </p>
              </div>
              <div>
                <div className="flex justify-start">
                  <div className="flex w-[40%] sm:w-[30%] gap-4 flex-nowrap">
                    <input
                      type="radio"
                      value="paid"
                      required
                      name="payment"
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    <img
                      className="payments w-[50%] sm:w-[80%] md:w-[50%]"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                      alt="Razor pay"
                    />
                  </div>
                  <div className="flex w-[60%] sm:w-[30%] gap-4">
                    <input
                      type="radio"
                      value="pending"
                      name="payment"
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    <p className="whitespace-nowrap">
                      Cash on Delivary{" "}
                      <FontAwesomeIcon icon={faHandHoldingDollar} />
                    </p>
                  </div>
                </div>
                <div className="text-right mt-[5%]">
                  <button
                    type="submit"
                    className="bg-[#544A3E] text-[#F9FCFA] rounded-md text-xs active:scale-95 px-5 py-1 sm:py-2 "
                  >
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default PlaceOrder;
