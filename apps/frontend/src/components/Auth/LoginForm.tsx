import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormType } from "../../types";
import { login as loginUserApi } from "../../services/auth.api";
import { useAuth } from "../../hooks/useAuth"
import { AuthContextType } from "../../contexts/AuthContext";

function LoginForm() {
    const { login } = useAuth() as AuthContextType;
    const { register, handleSubmit, formState: { errors }  } = useForm<LoginFormType>();
    const onSubmit: SubmitHandler<LoginFormType> = (data) => {
                //console.log(data);
                
                loginUserApi(data.username,data.password).then((res) => {
                    login(res.data);
                    //console.log(res.data);
                });
    };
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input placeholder="Username" className="border border-gray-300 rounded-md p-2" type="text" {...register("username")} />
            {errors.username && <span>This field is required</span>}
            <label htmlFor="password">Password</label>
            <input placeholder="Password" className="border border-gray-300 rounded-md p-2" type="password" {...register("password")} />
            {errors.password && <span>This field is required</span>}
            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Login</button>
        </form>
    </div>
  )
    }

export default LoginForm