import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormType } from "../../types";
import { register as registerUserApi, login as loginUserApi } from "../../services/auth.api";
import { useAuth } from "../../hooks/useAuth"
import { AuthContextType } from "../../contexts/AuthContext";
function SignupForm() {

    const { login } = useAuth() as AuthContextType;

    const { register, handleSubmit, formState: { errors }  } = useForm<SignupFormType>();
    const onSubmit: SubmitHandler<SignupFormType> = (data) => {
        registerUserApi(data.username, data.password, data.role).then((res) => {
            console.log(res.data);
           if(res.success === true){
            loginUserApi(data.username,data.password).then((res) => {
                login(res.data);
                console.log(res.data);
                
            });
           }     
        }).catch((err) => {
            console.log(err);
        });
    };  
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input placeholder="Username" className="border border-gray-300 rounded-md p-2"  type="text" {...register("username")} />
            {errors.username && <span>This field is required</span>}
            <label htmlFor="password">Password</label>
            <input placeholder="Password" className="border border-gray-300 rounded-md p-2" type="password" {...register("password")} />
            {errors.password && <span>This field is required</span>}
            <label htmlFor="role">Role</label>
            <input placeholder="Role" className="border border-gray-300 rounded-md p-2" type="text" {...register("role")} />
            {errors.role && <span>This field is required</span>}
            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Signup</button>
        </form>
    </div>
  )
}

export default SignupForm