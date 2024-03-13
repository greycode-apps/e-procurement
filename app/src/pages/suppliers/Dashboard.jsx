import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
      <div className="py-32 px-10 md:px-32 w-full h-[90vh] bg-blue-50">
        <div className="grid grid-cols-3 gap-5">

          <Link to="/list-tenders" className="py-3 px-3 rounded shadow bg-blue-400">
            <h1 className="md:text-2xl text-white text-lg text-center">Tenders</h1>
          </Link>

          <Link to="/subscribe" className="py-3 px-3 rounded shadow bg-orange-400">
            <h1 className="md:text-2xl text-white text-lg text-center">Subscribe</h1>
          </Link>

          <Link to="/add-bid" className="py-3 px-3 rounded shadow bg-yellow-400">
            <h1 className="md:text-2xl text-white text-lg text-center">My Requests</h1>
          </Link>

        </div>
      </div>
    </>
  )
}

export default Dashboard