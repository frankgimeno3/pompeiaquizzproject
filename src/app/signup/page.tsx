'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../firebase';

import Contras from './signupComponents/Contras';

import {doc, setDoc, } from 'firebase/firestore';
import { db } from '../firebase';
import Correo from './signupComponents/Correo';

import { redirect } from 'next/navigation';
 
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
 

  if (status === "authenticated") {
    redirect('/landing');
  }  
  

  const router = useRouter();

  
  const addUserInFirebase = async () => {
    const userDocRef = doc(db, 'users', email.trim());

        await setDoc(userDocRef, {
          email: email.trim(),
        });
    

   };
 


  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        addUserInFirebase();
        setIsAccepted(true);
        setTimeout(() => {
          router.push("/");
        }, 3500);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  
  return (
    <div className='relative'>
    

        <div className=" md:mx-56 md:px-56">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  min-h-screen md:mx-24 bg-zinc-900 bg-opacity-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Registro / Sign Up
              </h2>
            </div>
            {isAccepted === false && <>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  signup();
                }} className="space-y-6">
                  <Correo setEmail={setEmail} />
                  <Contras setPassword={setPassword} setPasswordAgain={setPasswordAgain} />

                  <div>
                    <button
                      disabled={(!email || !password || !passwordAgain ) || (password !== passwordAgain)}
                      onClick={() => signup()}
                      className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      Crear cuenta / Sign Up
                    </button>
                  </div>
              </form>
            </div>
          </>}
          {isAccepted && <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Cuenta creada con éxito / Account created successfully
            </h2>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Redireccionando al inicio de sesión... / Redirecting...
            </h2>
          </>}
        </div>
      </div>
    </div >
  )
}