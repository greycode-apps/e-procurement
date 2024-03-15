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
      desc: "",
      budget: "",
      bidId: "",
      supplierId: userId,
      // qoute: "",
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
        bidId: data.id,
      }));
    }, [data]);
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      console.log(values);
      await Axios.post('/request/send', values, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then(res => {
        navigate('/s-dashboard')

        toast.info(res.data.msg);
      }).catch(err => {
          console.log(err)
          if(err.response.data.err){
            toast.error(err.response.data.err)
          navigate('/s-dashboard')

          }else if(err.response.data.msg){
            toast.error(err.response.data.msg)
          navigate('/s-dashboard')

          }else{
            toast.error(err.response.message);
          navigate('/s-dashboard')

          }
      })
    };
  return (
    <>
        <div className="py-32 md:px-32 px-10">

            <h1 className="text-3xl text-center text-gray-900 font-bold py-5">Bid for Tender</h1>

            

            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <p className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">{data.desc}</p>
            <p className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">Budget from Institute: ${data.budget} USD</p>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">Tender Category</label>
            <input type="text" id="disabled-input" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${data.trade_type}`} disabled />
            

           

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">Due Date</label>
            <input type="text" id="disabled-input-2" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${new Date(data.due_date).toLocaleDateString()}`} disabled />

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 pt-5 ">Budget</label>
            <input type="number" id="disabled-input-2" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" name="budget" onChange={(e) => setValues({...values, budget: e.target.value})}/>

            
            <label className="block mb-2 text-sm font-medium text-gray-900 pt-5" htmlFor="user_avatar">Quotation | Items</label>
            <textarea className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" name="desc" type="file" rows={5} accept="application/pdf" onChange={(e) => setValues({...values, desc: e.target.value})}></textarea>
           
           

            <button type="submit" className="py-3 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Request</button>


            
            </form>

        </div>
    </>
  )
}

export default Request