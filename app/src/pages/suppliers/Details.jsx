import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../config";
import { toast } from "react-toastify";
import { userData } from "../../../helper";

const Details = () => {

    const [values, setValues] = useState({
        org_name: '',
        address: '',
        phone: '',
        tax_no: '',
        trade_type: ''
    })

    const navigate = useNavigate();

    const {role, token} = userData();

    const handleSubmit = async(e) => {
        e.preventDefault();

        await Axios.post('/supplier/create/', values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then( res => {
            if(role !== 'supplier'){
                navigate('/s-sign-up');
                toast.warning('Please sign up as a Supplier.');
            }
            navigate('/s-dashboard');
            toast.info(res.data.msg);

            window.location.reload();
        }).catch( error => {
            console.log(error)
            if(error.response.data.err){
                toast.error(error.response.data.err);
            }else if(error.response.data.msg){
                toast.error(error.response.data.msg);
            }else{
                toast.error(error.message);
            }
            window.location.reload();

        })

    }
  return (
    <>
        <div className="py-32 md:px-32 px-10">
            <h1 className="text-gray-900 text-center pt-5 text-lg md:text-2xl">Company details.</h1>

            <form className="max-w-md mx-auto py-20" onSubmit={handleSubmit}>

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="org_name" id="org_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setValues({...values, org_name: e.target.value})}/>
                <label htmlFor="org_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Organisation name</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <textarea name="address" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setValues({...values, address: e.target.value})} ></textarea>
                <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Organiasation Address</label>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setValues({...values, phone: e.target.value})}/>
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (077-139-2149)</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" name="tax_no" id="tax_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setValues({...values, tax_no: e.target.value})}/>
                    <label htmlFor="tax_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tax number (0123-2783-1827)</label>
                </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-500 ">Select your Trade sector</label>
                <select id="trade_type" name="trade_type" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setValues({...values, trade_type: e.target.value})}>
                    <option selected></option>
                    <option>Stationary</option>
                    <option>Computer networking</option>
                    <option>Computer supplier</option>
                    <option>Software Development</option>
                    <option>ICT Consulting</option>
                    <option>Accounting Consulting</option>
                </select>
            </div>
            
           
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    </>
  )
}

export default Details