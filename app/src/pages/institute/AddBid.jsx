import { useState } from "react"
import { userData } from "../../../helper"
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../config";
import { toast } from "react-toastify";

const AddBid = () => {

    const {token, userId} = userData();

    const [values, setValues] = useState({
        budget: 0,
        desc: '',
        trade_type: '',
        due_date: '',
        userId,
        quote: ''
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('budget', values.budget);
        formData.append('desc', values.desc);
        formData.append('trade_type', values.trade_type);
        formData.append('due_date', values.due_date);
        formData.append('userId', values.userId);
        formData.append('quote', values.quote);
      
        await Axios.post('/tender/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        })
          .then((res) => {
            navigate('/list-bids');
            toast.success(res.data.msg);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.err) {
              toast.error(error.response.data.err);
            } else {
              toast.error(error.message);
            }
          });
      };
      


  return (
    <>
    <div className="bg-white py-32 px-10 md:px-32">
        <section className="bg-white ">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 ">Request for Qoutation</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Items | Description</label>
                            <textarea type="text" name="desc" id="desc" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Items | Description" required="" onChange={(e) => setValues({...values, desc: e.target.value})} ></textarea>
                        </div>
                        <div className="w-full">
                            <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900 ">Total budget</label>
                            <input type="text" name="budget" id="budget" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$280.00" required="" onChange={(e) => setValues({...values, budget: e.target.value})} />
                        </div>
                        
                        <div>
                            <label htmlFor="trade_type" className="block mb-2 text-sm font-medium text-gray-900 ">Category |Trade sector</label>
                            <select name="trade_type" id="trade_type" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setValues({...values, trade_type: e.target.value})}>
                                <option defaultValue>Select category</option>
                                <option>Stationary</option>
                                <option>Computer networking</option>
                                <option>Computer supplier</option>
                                <option>Software Development</option>
                                <option>ICT Consulting</option>
                                <option>Accounting Consulting</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 ">Due Date</label>
                            <input type="date" name="due_date" id="due_date" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={(e) => setValues({...values, due_date: e.target.value})} />
                        </div> 

                        <div>
                            <label htmlFor="quote" className="block mb-2 text-sm font-medium text-gray-900 ">Attach | Upload Qoutation</label>
                            <input
                                type="file"
                                name="quote"
                                id="quote"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                onChange={(e) => setValues({ ...values, quote: e.target.files[0] })} // Updated attribute name
                            />
                        </div> 
                       
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Add Bid|Tender
                    </button>
                </form>
            </div>
        </section>
    </div>
    </>
  )
}

export default AddBid