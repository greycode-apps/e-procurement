import Header from "./Header"
import UsersHeader from "./UsersHeader"

const Navbar = ({user}) => {
  if(!user){
    return (
        <Header />
    )
  }else{
    return (
        <UsersHeader />
    )
  }
}

export default Navbar