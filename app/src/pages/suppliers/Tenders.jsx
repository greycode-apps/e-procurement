import { useEffect, useState } from "react"
import { Axios } from "../../../config"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const Tenders = () => {

    const [tendes, setTenders] = useState([])

    useEffect(() => {
        const fetchData = async()=> {
            await Axios.get('/tender/list/all').then(res => {
                setTenders(res.data.data);
            }).catch(error => {
                console.log(error);
                if(error.response.data.err){
                    toast.error(error.response.data.err);
                }else if(error.response.data.msg){
                    toast.error(error.response.data.msg);
                }else{
                toast.error(error.message);
                }
            })
        }

        fetchData();
    },[])
  return (
     <>
        <div className="pt-36 px-10 md:px-32">
            <h1 className="text-start text-gray-800 text-xl md:text-4xl my-5 underline ">Latest Tenders</h1>


        <div className="grid md:grid-cols-3 grid-flow-row  gap-4">

            {
                tendes.map((tender, key) => {
                    if(tender.is_available)
                    return(
                        <div key={key} className="max-w-sm p-6 bg-white border  rounded-lg shadow  border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{tender.trade_type}</h5>
                               
                               <p className="mb-3 font-normal  text-gray-900"> <span className="text-gray-400">{tender.desc }</span> </p>
                               <p className="mb-3 font-normal  text-gray-900">Posted by: <span className="text-gray-400">{tender.Institute.org_name }</span> </p>
   
                               <div className="flex gap-5">
                               <p className="mb-3 font-normal  text-gray-900">Budget: <span className="text-gray-400">${tender.budget}</span></p>
                               </div>
                               <small className="mb-3 font-normal text-gray-900">
                               Apply before: <span className="text-gray-400">{new Date(tender.due_date).toLocaleDateString()}</span>
                               </small><br />
                            <Link to={`/tender-request/${tender.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center   rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600  ">
                                Apply
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </Link>
                        </div>
                    )
                })
            }

           

        </div>

            

        </div>
    </>
  )
}

export default Tenders