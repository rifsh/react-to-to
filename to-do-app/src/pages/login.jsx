import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useUsers";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

    const { userLogin, userLogindata } = useAuth();
    const mail = useRef();
    const password = useRef();
    const navigate = useNavigate();

    let loginData = {
        userNameOrEmail: '',
        password: ''
    }

    const loginFormHandler = async (e) => {
        e.preventDefault();

        loginData.userNameOrEmail = mail.current.value;
        loginData.password = password.current.value;
        try {
            const response = await userLogin(loginData);
            if (response.data.message.token) {
                toast.success('Success', {
                    position: 'top-center',
                    autoClose: 5000,
                    draggable: true,
                    theme: 'colored',
                    progress: undefined,
                    transition: Bounce
                })
                localStorage.setItem('token', response.data.message.token);
                localStorage.setItem('userId', response.data.message.userId);
                navigate('/home');
            } else {
                toast.warning(response.response.data.message, {
                    position: 'top-center',
                    autoClose: 5000,
                    draggable: true,
                    theme: 'colored',
                    progress: undefined,
                    transition: Bounce
                })
                // alert(response.response.data.message)
            }
        } catch (error) {
            toast.warning('User not found', {
                position: 'top-center',
                autoClose: 5000,
                draggable: true,
                theme: 'colored',
                progress: undefined,
                transition: Bounce
            })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-6" onSubmit={loginFormHandler}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            ref={mail}
                            type="text"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        // required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            ref={password}
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        // required
                        />
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div> */}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {!userLogindata.loading && <span>Sign in</span>}
                            {userLogindata.loading && <span>Loading ...</span>}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        {/* <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a> */}
                        <Link className="font-medium text-blue-600 hover:text-blue-500" to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000} />
        </div>
    );
}

export default LoginPage;