import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client';

const NUEVA_CUENTA = gql`
mutation nuevoUsuario($input: UsuarioInput) {
  nuevoUsuario(input: $input){
    id
    nombre
    apellido
    email
  }
}
`;

const NuevaCuenta = () => {
    //State para el mensaje
    const [mensaje, setMensaje] = useState(null);

    //Mutation para crear nuevos usaurios.
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

    //Validación del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio').min(6, 'El password debe de ser minimo 6 caracteres')
        }),
        onSubmit: async valores => {
            
          

            const { nombre, apellido, email, password } = valores;

            try {
                const { data } = await nuevoUsuario(
                    {
                        variables: {
                            input: {
                                nombre,
                                apellido,
                                email,
                                password
                            }
                        }
                    }
                );
                console.log(data);

                //Usuario creado correctamente.
                formik.values.nombre = '';
                formik.values.apellido = '';
                formik.values.email = '';
                formik.values.password = '';
                //Redigir al usuario para iniciar sesion.

            } catch (error) {
                setMensaje(error.message);

                setTimeout(() => {
                    setMensaje(null);
                }, 3000);
            }
        }
    });


    const mostrarMensaje = () => {
        return (
            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-sm text-center mx-auto text-red-600'>
                <p className='font-bold'>Alto</p>
                <p>{mensaje}</p>
            </div>
        );
    }

    return (
        <Layout>
            {mensaje && mostrarMensaje()}


            <h1 className='text-center text-2xl text-white font-light'>Crear Nueva Cuenta</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                placeholder="Nombre Usuario"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.nombre &&
                            formik.errors.nombre ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null
                        }

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                placeholder="Apellido Usuario"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.apellido &&
                            formik.errors.apellido ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null
                        }

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
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.email &&
                            formik.errors.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null
                        }

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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.password &&
                            formik.errors.password ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null
                        }

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Crear Cuenta"
                        />

                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default NuevaCuenta;
