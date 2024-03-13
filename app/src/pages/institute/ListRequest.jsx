import { Link } from 'react-router-dom'

const ListRequest = () => {
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
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Budget
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* {
                            bids.map((bid, key) => {
                                return( */}
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Computer Networking
                                    </th>
                                    <td className="px-6 py-4">
                                        HP Desktop
                                    </td>
                                    <td className="px-6 py-4">
                                       12
                                    </td>
                                    <td className="px-6 py-4">
                                        $1200.00 USD
                                    </td>
                                    <td className="px-6 py-4 flex justify-between">
                                        <Link className="bg-blue-400 text-white px-3 py-2 rounded">View Qoute <small>(pdf)</small></Link>

                                        <div className="flex gap-3">
                                        <Link className="bg-green-400 text-white px-3 py-2 rounded">Accept Qoute</Link>
                                        <Link className="bg-red-400 text-white px-3 py-2 rounded">Reject Qoute</Link>
                                        </div>
                                    </td>
                                </tr>
                                {/* )
                            })
                        }
                         */}
                        
                        
                    </tbody>
                </table>
            </div>

        </div>
    </>
  )
}

export default ListRequest