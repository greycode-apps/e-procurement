import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../../../config'
import { userData } from '../../../helper'
import { toast } from 'react-toastify'

const ListRequest = () => {

    const {token} = userData();

    const [requests, setRequest] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() => {
            await Axios.get('/request/show', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setRequest(res.data.data);
            }).catch(err => {
                if(err.response.data.err){
                    toast.error(err.response.data.err);
                }else if(err.response.data.msg){
                    toast.error(err.response.data.msg);
                }else{
                    toast.error(err.response.message);
                }
                navigate('/i-dashboard');
            })
        }

        fetchData();
    }, [])

    const handleAcceptRequest = async (id) => {
        
            await Axios.post(`/request/accept/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                toast.info(res.data.msg);
            }).catch(err => {
                if(err.response.data.err){
                    toast.error(err.response.data.err);
                }else if(err.response.data.msg){
                    toast.error(err.response.data.msg);
                }else{
                    toast.error(err.response.message);
                }
                navigate('/i-dashboard');
            })
       
    };

    const handleRejectRequest = async (id) => {
        
        await Axios.post(`/request/reject/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            toast.info(res.data.msg);
            window.location.reload()
        }).catch(err => {
            if(err.response.data.err){
                toast.error(err.response.data.err);
            }else if(err.response.data.msg){
                toast.error(err.response.data.msg);
            }else{
                toast.error(err.response.message);
            }
            navigate('/i-dashboard');
            window.location.reload();
        })
   
};
  return (
    <>
        <div className="py-32 px-10 md:px-32">

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product | Item (s)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Accepted
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Budget
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            requests.map((bid, key) => {
                                return( 
                                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                   
                                    <td className="px-6 py-4">
                                        {bid.desc}
                                    </td>
                                    <td className="px-6 py-4">
                                    {bid.is_accepted ? <p>True</p> : <p>False</p>}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${bid.budget} USD
                                    </td>
                                    <td className="px-6 py-4 flex justify-between">
                                        {
                                            bid.qoute && (
                                                <Link className="bg-blue-400 text-white px-3 py-2 rounded">View Qoute <small>(pdf)</small></Link>

                                            )
                                        }

                                        <div className="flex gap-3">
                                       {
                                        bid.is_accepted ? (
                                            <Link className="bg-red-400 text-white px-3 py-2 rounded" onClick={() => handleRejectRequest(bid.id)}>Reject Quote</Link>
                                          ) : (
                                            <Link className="bg-green-400 text-white px-3 py-2 rounded" onClick={() => handleAcceptRequest(bid.id)}>Accept Quote</Link>
                                          )
                                       }
                                        </div>
                                    </td>
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

export default ListRequest