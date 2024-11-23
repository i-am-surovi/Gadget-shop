import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { FcGoogle } from "react-icons/fc";


const GoogleLogin = () => {
    const {GoogleLogin} = useAuth()
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        GoogleLogin().then(()=>{
            navigate("/");
        });
        
    }
  return (
    <div>
        <div className="divider">OR</div>
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-primary btn-outline w-full">
                <FcGoogle size={25} Sign />Google
            </button>
        </div>
    </div>
  )
}

export default GoogleLogin
