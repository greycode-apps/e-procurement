import { useEffect, useState } from "react"
import { userData } from "../../../helper"
import { Axios } from "../../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ListBid = () => {

    const {token} = userData();

    const [bids, setBids] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            await Axios.get('/tender/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setBids(res.data.data)
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
    }, [token])
  return (
    <>
        <div className="py-32 px-10 md:px-32">

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Category | Trade Sector
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product | Item (s)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Budget
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Action
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bids.map((bid, key) => {
                                return(
                                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {bid.trade_type}
                                    </th>
                                    <td className="px-6 py-4">
                                        {bid.desc}
                                    </td>
                                    <td className="px-6 py-4">
                                        {bid.budget}
                                    </td>
                                    {/* <td className="px-6 py-4"><Link className="bg-red-400 text-white rounded px-3 py-2">Delete</Link></td> */}
                                </tr>
                                )
                            })
                        }
                        
                        
                        
                    </tbody>
                </table>
            </div>

        </div>
    </>
  )
}

export default ListBid