import { useEffect, useState } from "react"
import { Axios } from "../../config"
import { toast } from "react-toastify"

const Landing = () => {

    const [bids, setBids] = useState([])

    useEffect(() => {
        const fetchData = async()=> {
            await Axios.get('/tender/list/all').then(res => {
                console.log(res.data.data)
                setBids(res.data.data);
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


        <div className="grid md:grid-cols-2 grid-flow-row  gap-4">

            {
                bids.map((bid, key) => {
                    if(bid.is_available){
                        return(
                        
                            <div key={key} className="max-w-sm p-6 bg-white border  rounded-lg shadow  border-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{bid.trade_type}</h5>
                               
                                <p className="mb-3 font-normal  text-gray-900"> <span className="text-gray-400">{bid.desc }</span> </p>
                                <p className="mb-3 font-normal  text-gray-900">Posted by: <span className="text-gray-400">{bid.Institute.org_name }</span> </p>
    
                                <div className="flex gap-5">
                                <p className="mb-3 font-normal  text-gray-900">Budget: <span className="text-gray-400">${bid.budget}</span></p>
                                </div>
                                <small className="mb-3 font-normal text-gray-900">
                                Apply before: <span className="text-gray-400">{new Date(bid.due_date).toLocaleDateString()}</span>
                                </small><br />
                                {
                                    bid.quote && (
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center   rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600  ">
                                    Download Quotation
                                </a>
                                    )
                                }
                                
                            </div>
                        )
                    }
                    
                })
            }

           

        </div>

            

        </div>
    </>
  )
}

export default Landing