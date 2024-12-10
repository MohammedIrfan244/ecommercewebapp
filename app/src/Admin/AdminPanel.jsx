import {  useState } from "react";
import AdminProduct from "./AdminProduct";
import AdminUsers from "./AdminUsers";
import AdminDashboard from "./AdminDashboard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faDashboard,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setIsAdmin } from "../Redux/userSlice";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";




function AdminPanel() {
  const {currentUser,loading}=useSelector((state)=>state.user)
  const [loading2,setLoading2]=useState(false)
  
  
  const dispatch=useDispatch()
  const [component, setComponent] = useState();
  const navigate = useNavigate();

  const handleLogOut = async() => {
setLoading2(true)
   await axios.post("http://localhost:3001/api/admin/logout",{},{withCredentials:true})
   .then((res)=>{
     toast.success(res.data.message);
     dispatch(setCurrentUser(null));
     dispatch(setIsAdmin(false))
   })
   .catch((err)=>toast.error(axiosErrorManager(err)))
   .finally(()=>{
     setLoading2(false)
     navigate('/')
   })
   await axios.post("http://localhost:3001/api/users/logout",{},{withCredentials:true})
   .then(()=>{
     dispatch(setCurrentUser(null));
     dispatch(setIsAdmin(false))
   })
   .catch((err)=>toast.error(axiosErrorManager(err)))
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
        <div className="w-[100%] relative">
          <div className="bg-[#FFFFFF] h-16 border-b-2 border-[#544A3E] px-5 flex items-center justify-between">
            <h2
              className="font-serif text-2xl sm:text-3xl font-medium"
              style={{ textShadow: "0 0 1px #000000" }}
            >
              Furniche
            </h2>
            <div>
              <button
                className="py-2 px-3 me-5 rounded-md bg-blue-500 text-[#F9FCFA] text-xs"
                onClick={handleLogOut}
              >
                {loading2 ? "Logging out..." : "Log out"}
              </button>
              <Link
                className="py-2 px-3 me-5 rounded-md bg-blue-500 text-[#F9FCFA] text-xs"
                to={"/"}
              >
                Go back
              </Link>
            </div>
          </div>
          <div className="flex">
            <div className="w-[20%] border-r-2 border-[#544A3E] h-screen bg-[#FFFFFF] flex flex-col gap-5 px-5 pt-10">
              <div className="flex w-[100%] gap-5 text-sm">
                <img className="avatar" src={currentUser?.profile} alt="User Profile" />
                <div>
                  <p>{currentUser?.name}</p>
                  <p className="text-green-500">Admin</p>
                </div>
              </div>
              <p className="text-xs ps-2 text-red-700">
                Any changes made here will directly affect the live content.
                Please proceed with caution and double-check your updates before
                saving.
              </p>
              <p
                className="cursor-pointer flex justify-between items-center bg-[#D7D2C9] py-1 px-2 hover:bg-[#544A3E] hover:text-[#FFFFFF]"
                onClick={() => setComponent("dashboard")}
              >
                <FontAwesomeIcon icon={faDashboard} />
                Dashboard{" "}
                <FontAwesomeIcon
                  className={`${
                    component === "dashboard" ? "text-xs" : "hidden"
                  }`}
                  icon={faChevronRight}
                />
              </p>
              <p
                className="cursor-pointer flex justify-between items-center bg-[#D7D2C9] py-1 px-2 hover:bg-[#544A3E] hover:text-[#FFFFFF]"
                onClick={() => setComponent("users")}
              >
                <FontAwesomeIcon icon={faUser} />
                Users{" "}
                <FontAwesomeIcon
                  className={`${component === "users" ? "text-xs" : "hidden"}`}
                  icon={faChevronRight}
                />
              </p>
              <p
                className="cursor-pointer flex justify-between items-center bg-[#D7D2C9] py-1 px-2 hover:bg-[#544A3E] hover:text-[#FFFFFF]"
                onClick={() => setComponent("products")}
              >
                <FontAwesomeIcon icon={faTag} />
                Products{" "}
                <FontAwesomeIcon
                  className={`${
                    component === "products" ? "text-xs" : "hidden"
                  }`}
                  icon={faChevronRight}
                />
              </p>
            </div>
            <div className="w-[80%] ">
              {component === "users" ? (
                <AdminUsers />
              ) : component === "products" ? (
                <AdminProduct />
              ) : (
                <AdminDashboard  />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
