"use client"
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
 
const Home = () => {
  const [usuario, setusuario] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
 

  return (
    <main className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-gray-800 bg-opacity-60">
        <div className="  w-50vw   ">
          <div className="flex flex-col items-center items-center h-screen align-center justify-center px-24">
            <h2 className="text-4xl text-white pb-10">Iniciar Sesión</h2>

            <form  >
              <div className="mb-4">
                <input
                  className="w-full px-4 py-2 border rounded-md text-center font-arial"
                  type="usuario"
                  value={usuario}
                  onChange={(e) => setusuario(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  className="w-full px-4 py-2 border rounded-md text-center font-cinzel"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p>{errorMessage}</p>}
              </div>

              <button
                className="mt-8 bg-white text-gray-800 rounded-full py-2 px-4 border-b-2 border-gray-500 hover:bg-gray-600 hover:text-white"
               >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
