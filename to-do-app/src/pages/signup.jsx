import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../hooks/useUsers";
import { toast } from 'react-toastify';

const SignupPage = () => {
    const { userRegister, userRegistration } = userAuth();
    const navigate = useNavigate();
    const [FormData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
    })

    const [formError, setFormError] = useState({
        fullNameError: false,
        usernameError: false,
        emailError: false,
        passwordError: false,
    })

    const signupFromHandler = async (e) => {
        e.preventDefault();
        try {
            if (await userRegister(FormData)) {
                // toast.success('Registration successful! Redirecting to login...');
                navigate('/');
            }
            // console.log(userRegistration.);
        } catch (error) {
            toast.error('Registration failed: ' + err.message);

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
                <form onSubmit={signupFromHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Fullname
                        </label>
                        <input
                            onChange={(e) => setFormData({ ...FormData, fullName: e.target.value })}
                            id="email"
                            type="text"
                            value={FormData.fullName}
                            // required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {formError.fullNameError && <p>Username is required!</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Username
                        </label>
                        <input
                            id="username"
                            value={FormData.userName}
                            onChange={(e) => setFormData({ ...FormData, userName: e.target.value })}
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            value={FormData.email}
                            onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            value={FormData.password}
                            onChange={(e) => setFormData({ ...FormData, password: e.target.value })}
                            type="password"
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {!userRegistration.loading && <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        >
                            Sign Up
                        </button>}
                    </div>
                    <div className="flex items-center justify-between">
                        {userRegistration.loading && <p
                            type="submit"
                            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 flex items-center justify-center"
                        >
                            Loading...
                        </p>}
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link className="font-medium text-blue-600 hover:text-blue-500" to="/">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;