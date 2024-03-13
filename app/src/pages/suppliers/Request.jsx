import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Axios } from "../../../config";
import { toast } from "react-toastify";
import { userData } from "../../../helper";

const Request = () => {

    const { id } = useParams();
    const { token, userId } = userData();
  
    const [data, setData] = useState([]);
  
    const [values, setValues] = useState({
      item: "",
      quantity: "",
      variants: "",
      price: "",
      bidId: "",
      supplierId: userId,
      qoute: "",
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Axios.get(`/tender/list/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data.data);
        } catch (error) {
          toast.error(error.response.message);
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      setValues((prevValues) => ({
        ...prevValues,
        item: data.item,
        quantity: data.quantity,
        price: data.budget,
        bidId: data.id,
      }));
    }, [data]);
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      console.log(values);
      await Axios.post('/tender/send-request', values, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then(res => {
        navigate('/my-requests');
        toast.info(res.data.msg);
      }).catch(err => {
          console.log(err)
          toast.error(err.response.message);
      })
    };
  return (
    <>
        <div className="py-32 md:px-32 px-10">

            <h1 className="text-3xl text-center text-gray-900 font-bold py-5">Bid for Tender</h1>

            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">Tender Category</label>
            <input type="text" id="disabled-input" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${data.trade_type}`} disabled />
            

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">Budget</label>
            <input type="text" id="disabled-input-2" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`$${data.budget} USD`} disabled />

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">Due Date</label>
            <input type="text" id="disabled-input-2" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${new Date(data.due_date).toLocaleDateString()}`} disabled />



            
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">Attache| Upload Qoutation</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" name="qoute" type="file" accept="application/pdf" onChange={(e) => setValues({...values, qoute: e.target.files[0]})}/>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Please upload pdf files only. <span className="text-red-400 text-xs">size ( 10 mb)</span></div>
           

            <button type="submit" className="py-3 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Request</button>


            
            </form>

        </div>
    </>
  )
}

export default Request