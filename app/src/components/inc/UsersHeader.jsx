import { Link } from "react-router-dom"
import { userData } from "../../../helper"

const UsersHeader = () => {
  const {role} = userData();

  if(role === 'admin'){
    return(
      <div className="w-full bg-gray-500 h-24 flex justify-between items-center px-10 md:px-32">
        
        <Link to='/dashboard'><h1 className="text-2xl text-white">Admin Portal</h1></Link>
          <Link className="bg-blue-900 text-white rounded py-2 px-3" to="/logout">Logout</Link>
      </div>
    )
  }else if(role === 'institute'){
  return (
    <div className="w-full bg-gray-500 h-24 flex justify-between items-center px-10 md:px-32">
    
        <Link to='/i-account'><h1 className="text-2xl text-white">My Institute Portal</h1></Link>
        <Link className="bg-blue-900 text-white rounded py-2 px-3" to="/logout">Logout</Link>
    </div>
  )
  }else if(role === 'supplier'){
    return(
      <div className="w-full bg-gray-500 h-24 flex justify-between items-center px-10 md:px-32">
    
        <Link to='s-account'><h1 className="text-2xl text-white">My Supplier Portal</h1></Link>
        <Link className="bg-blue-900 text-white rounded py-2 px-3" to="/logout">Logout</Link>
      </div>
    )
  }
}

export default UsersHeader