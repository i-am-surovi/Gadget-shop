import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import GoogleLogin from "../components/login-registration/GoogleLogin";

const Login = () => {

  const { Login } = useAuth();
  // Import React Hook
  const {
    register, 
    handleSubmit,
    formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data)=>{
      console.log(data);
      Login(data.email, data.password)
      navigate("/")
    }


  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" 
          {...register("email", {required: true})}
          />
          {errors.email && <p className="text-red-500 text-sm font-light">Email is required</p>} 
        </div>

          <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" 
          {...register("password", {required: true, minLength: 8, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,})} 
          />
          {errors.password?.type === "required" && ( 
          <p className="text-red-500 text-sm font-light">
            Password is required
          </p>)}

          {errors.password?.type === "minlength" && ( 
          <p className="text-red-500 text-sm font-light">
            Password must have at least 8 characters
          </p>)}

          {errors.password?.type === "pattern" && (
          <p className="text-red-500 text-sm font-light">
            Password must include uppercase and lowercase letters, at least one number, and one special character.
          </p>)}
        </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
          <GoogleLogin/>
          <p className="my-4 text-sm font-light">
            New Here?{" "}  
            <Link to="/register" className="text-primary">
            Register
            </Link>
          </p>
        </form> 
      </div>
    </div>
  </div>
  )
}

export default Login
