import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AddBid, Dashboard, IDashboard, IDetails, InstituteSign_up, Landing, ListBid, ListRequest, Request, SDashboard, SDetails, Select, Sign_in, Subscribe, SuppliersSign_up, Tenders } from './pages';
import { Logout, Navbar } from './components';
import { userData } from '../helper';


function App() {

  const user = userData();
  return (
    <>
     <BrowserRouter>
     <Navbar  user={user}/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Sign_in />} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/s-account' element={<SDashboard />} />
        <Route path='/i-account' element={<IDashboard />} />
        <Route path='/select-account' element={<Select />} />
        <Route path='/s-sign-up' element={<SuppliersSign_up />} />
        <Route path='/i-sign-up' element={<InstituteSign_up />} />
        <Route path='/i-dashboard' element={<IDashboard />} />
        <Route path='/s-dashboard' element={<SDashboard />} />
        <Route path='/s-details' element={<SDetails />} />
        <Route path='/i-details' element={<IDetails />} />
        <Route path='/add-bid' element={<AddBid />} />
        <Route path='/list-bids' element={<ListBid />} />
        <Route path='/list-tenders' element={<Tenders />} />
        <Route path='/tender-request/:id' element={<Request />} />
        <Route path='/my-request' element={<Request />} />
        <Route path='/list-requests' element={<ListRequest />} />
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='/logout' element={<Logout />} />

      </Routes>
     </BrowserRouter>

     <ToastContainer />
    </>
  )
}

export default App
