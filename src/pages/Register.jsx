import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthProvider/AuthProvider"
import useAuth from "../hooks/useAuth"
import { useForm } from "react-hook-form"
import GoogleLogin from "../components/login-registration/GoogleLogin"

const Register = () => {
  const { CreateUser } = useAuth();
  // Import React Hook
  const {
    register, 
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data)=>{
      CreateUser(data.email, data.password)
      console.log(user)
      navigate("/");
    }

  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
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
            Eight length Password is required
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered"
          {...register('confirmPassword',{required: true, validate: (value)=>{
            if(watch('password') != value){
              return "Your password do not match"
            }
          }})}
          />
          {errors.confirmPassword && ( 
          <p className="text-red-500 text-sm font-light">
            Both password must match
          </p>)}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>

          <select className="select select-bordered w-full max-w-xs"
          {...register("role", {required:true})}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {errors.role && ( 
          <p className="text-red-500 text-sm font-light">
            You must select a role
          </p>)}

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">Register</button>
        </div>

        <GoogleLogin/>
        <p className="my-4 text-sm font-light">
          Already have an account?{" "} 
          <Link to="/login" className="text-primary">
          Login
          </Link>
        </p>
      </form> 
    </div>
  </div>
</div>
  )
}

export default Register
