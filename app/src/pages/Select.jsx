import { Link } from "react-router-dom"

const Select = () => {
  return (
    <>
        <div className="py-32 px-10md:px-32 w-full h-[100%]">
            <div className="md:flex items-center ">
                <div className="bg-gray-50 md:flex items-center w-full px-10 py-10">
                    <div className="flex flex-col items-center gap-5 w-full h-full py-20 md:py-72">
                        <div className="flex flex-col gap-2 items-center">
                        <h1 className="md:text-4xl text-lg text-gray-700">Sign up as Supplier</h1>
                        <p className="md:text-lg text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, explicabo.</p>
                        </div>
                        <Link to='/s-sign-up' className="bg-blue-900 py-2 px-3 rounded text-white">Sign-up</Link>
                    </div>
                </div>

                <div className="bg-white md:flex items-center w-full px-10 py-10">
                    <div className="flex flex-col items-center gap-5 w-full h-full py-20 md:py-72">
                        <div className="flex flex-col gap-2 items-center">
                        <h1 className="md:text-4xl text-lg text-gray-700">Sign up as Institute</h1>
                        <p className="md:text-lg text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, explicabo.</p>
                        </div>
                        <Link to='/i-sign-up' className="bg-blue-700 py-2 px-3 rounded text-white">Sign-up</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Select