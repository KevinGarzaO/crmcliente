import React from 'react';
import Layout from '../components/Layout';

const Login = () => {
    return (
        <Layout>
            <h1 className='text-center text-2xl text-white font-light'>Login</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                       <div className='mb-4'>
                           <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                           </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                                placeholder="you@example.com" 
                            />
                       </div>

                       <div className='mb-4'>
                           <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                                Password
                           </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                                placeholder="Password Usuario" 
                                />
                       </div>

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Iniciar Sesión"
                        />

                    </form>
                </div>
            </div>
        </Layout> 
    );
}

export default Login;