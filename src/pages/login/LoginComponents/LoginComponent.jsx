import React, { useState } from "react";
import logo from "../../../assets/img/logo.png";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://portaflex.com.ar/api/admin/login`, {
        email: email,
        password: password,
        dni: dni,
      })
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('name', JSON.stringify(response.data.name));

      navigate('/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712')
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-0 lg:px-8 mt-[160px]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
        <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicia sesion
        </h4>
        <p>
          para ingresar al panel de{" "}
          <span className="text-[#96897b] font-bold">administrador</span>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Correo Electronico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email} // Set the value to the email state
                onChange={(e) => setEmail(e.target.value)} // Update email state when the input changes
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

          </div>

          <div>
            <label htmlFor="dni">DNI</label>
            <div className="mt-2">
              <input
                id="dni"
                name="dni"
                type="text"
                autoComplete="email"
                required
                value={dni} // Set the value to the email state
                onChange={(e) => setDni(e.target.value)} // Update email state when the input changes
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-xs text-indigo-600 hover:text-indigo-500"
                >
                  Olvidaste la contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#bdaa95] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-background hover:bg-[#ada08c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesion
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Sistema desarrollador por{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-[#bdaa95] hover:text-[#fdb8da]"
          >
            @alan_opk y @aguchi
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;