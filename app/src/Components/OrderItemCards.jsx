import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"


// eslint-disable-next-line react/prop-types
function OrderItemCards({image,name,price,count}) {
    const {currency}=useContext(ShopContext)
  return (
    <div className="flex justify-between border-b-2 border-[#D3D3D3] pe-[2%] pb-[1%]" >
    <div className="flex gap-4">
      <img className="h-[60px] w-[100px] object-cover cartCard" src={image} alt="image" />
      <div className="flex flex-col justify-between pb-[5%] text-xs sm:text-sm md:text-[16px]" >
      <p className="whitespace-nowrap">{name}</p>
      <p className="font-bold">{currency}{price}</p>
      </div>
      </div>
      <div className="flex justify-between sm:gap-5 md:gap-7 lg:gap-10">
      <p>{count}</p>
      </div>
  </div>
  )
}

export default OrderItemCards