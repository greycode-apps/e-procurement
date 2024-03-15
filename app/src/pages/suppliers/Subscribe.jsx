import { useState } from "react"
import { Axios } from "../../../config";
import { userData } from "../../../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Subscribe = () => {

  const {token, userId} = userData()


  const [values, setValues] = useState({
    phone: "",
    userId
  })


  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(values)

    await Axios.post('/subscribe/payment/', values, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      toast.info(res.data.msg);
    }).catch(err => {
      if(err.response.data.err){
        toast.error(err.response.data.err)
      }else if(err.response.data.msg){
        toast.error(err.response.data.msg)
      }else{
        toast.error(err.response.message)
      }

      navigate('/s-dashboard');

    })
  }
  return (
    <>
      <div className="px-10 py-32 md:px-32">

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="$150 USD" disabled />
        <input type="text" name="phone" id="disabled-input-2" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Phone number" onChange={(e) => setValues({...values, phone: e.target.value})} />

        <button type="submit" className="w-full mt-5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay Using Ecocash</button>

      </form>

      </div>
    </>
  )
}

export default Subscribe