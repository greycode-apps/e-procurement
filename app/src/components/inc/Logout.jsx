import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("user", "");
    navigate("/login");
    toast.success("Logged out!");
    window.location.reload()
  },[])
  return null
};

export default Logout;