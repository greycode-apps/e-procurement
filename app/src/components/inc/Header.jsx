import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
        <div className="w-full h-32 flex items-center bg-white fixed px-10 py-5 md:px-32 border-b-2">
            <div className="w-full flex justify-between items-center ">
                <div className="">
                    <Link to='/' className="md:text-6xl text-sm text-blue-500 font-bold">E-Procurement</Link>
                </div>
                <div className="flex gap-5 items-center">
                    <Link to='/login' className="bg-blue-700 px-3 py-2 text-white rounded">Sign-in</Link>
                    <Link to='/select-account' className="bg-blue-900 px-3 py-2 text-white rounded">Sign-up</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header