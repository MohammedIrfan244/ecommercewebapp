import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";
import OrderCards from "../shared/OrderCards";
import ScrollTop from "../shared/ScrollTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import AdminProfile from "../assets/Me.jpeg";

function User() {
  const {
    currentUser,
    setCurrentUser,
    setCartItems,
    setUserOrders,
    userOrders,
  } = useContext(UserContext);
  const { setCartCount } = useContext(ShopContext);
  const navigate=useNavigate()


  const handleLogOut = () => {
    const checkLogout=confirm("Are you sure you want to logout")
    if(checkLogout){
      setCurrentUser(null);
    setCartItems({});
    setCartCount(0);
    setUserOrders([]);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("userOrders");
    navigate("/");
    }
  };

  return (
    <div className="w-[100%] flex flex-col sm:flex-row justify-between pt-[26%] sm:pt-[8%] px-5 gap-5 sm:gap-32">
      <div className="w-[100%] sm:w-[40%]">
        <h1
          className="text-xl sm:text-2xl font-serif tracking-wide underline ms-3 mb-10"
          style={{ textShadow: "0 0 1px #000000" }}
        >
          USER DETAILS
        </h1>
        <div className="mt-10 bg-[#F9FCFA] rounded-2xl shadow-sm shadow-[#544A3E] p-3 flex flex-col gap-3">
          <div className="flex justify-center">
            <div className="h-36 flex justify-center items-center rounded-full mb-5 overflow-hidden w-36">
              <img
                src={currentUser.isAdmin ? AdminProfile : currentUser.avatar}
                alt="User avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
                }}
              />
            </div>
          </div>
          <div className="flex justify-start gap-14">
            <p className="w-[20%]">{currentUser.isAdmin ? "Admin" : "User"}</p>
            <p className="font-bold flex w-[60%]">{currentUser.name}</p>
          </div>
          <div className="flex justify-start gap-14">
            <p className="w-[20%]">Email</p>
            <p className="flex w-[60%]">{currentUser.email}</p>
          </div>
          <div className="flex justify-start gap-14">
            <p className="w-[20%]">Mobile</p>
            <p className="flex w-[60%]">{currentUser.mobile}</p>
          </div>
          <div className="w-[100%] flex justify-end">
            <button
              className="bg-[#544A3E] rounded-lg shadow-md shadow-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[2%]"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="w-[100%] sm:w-[70%]">
        <h1
          className="text-xl sm:text-2xl font-serif tracking-wide underline ms-3 mb-10"
          style={{ textShadow: "0 0 1px #000000" }}
        >
          ORDERS
        </h1>
        <div className="flex flex-col gap-5 overflow-y-auto w-[100%] scrollbar-thin h-[90vh]">
          {userOrders.length === 0 ? (
            <div className="h-56 flex justify-center items-center w-32">
              <FontAwesomeIcon className="text-5xl" icon={faBoxOpen} />
            </div>
          ) : (
            userOrders?.map((items, index) => (
              <OrderCards key={index} orderItems={items} />
            ))
          )}
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}

export default User;
