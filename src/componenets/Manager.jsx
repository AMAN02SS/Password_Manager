/* global confirm */
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        localStorage.setItem("password", JSON.stringify(passwordArray));
    }, [passwordArray]);


    const savePassword = () => {
        const newPassword = { ...form, id: uuidv4() }
        setPasswordArray([...passwordArray, newPassword])
        localStorage.setItem("password", JSON.stringify([...passwordArray, newPassword]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast('Password Save Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deletePassword = (id) => {
        console.log("delete password by id", id)
        let c = confirm("Do you really want to delete it ?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        toast('Password Delete Successfully 🗑', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPassword = (id) => {
        console.log("editing password by id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyeslash.svg")) {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyeslash.svg"
        }
    }

    const handleForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('📝Copy to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className='md:container md:px-40 md:py-16 md:mx-auto'>
                <div className='flex flex-col justify-center items-center my-5 p-5 '>
                    <h1 className='text-4xl font-bold'> <span className=' text-[#075528]'>&lt;</span><span>Pass</span><span className=' text-[#075528]'>OP/&gt;</span> </h1><p className='text-green-700'>Your own password Manager/protector</p>
                </div>
                <div className='flex flex-col justify-center items-center container mx-auto m-2 p-5 '>
                    <input value={form.site} type="text" name="site" onChange={handleForm} id="1" placeholder='Enter Website URL' className='w-full border-2 rounded-full border-green-700 p-4 py-1' />
                    <div className='flex justify-center w-full m-2 gap-1 md:gap-8 relative'>
                        <input value={form.username} placeholder='Enter Username' type="text" name="username" id="2" onChange={handleForm} className='w-full border-2 rounded-full border-green-700 p-4 py-1' />
                        <input ref={passwordRef} value={form.password} placeholder='Enter Password' type="password" name="password" id="3" onChange={handleForm} className='w-full border-2 rounded-full border-green-700 p-4 py-1' />
                        <span className='absolute right-3 top-2 cursor-pointer' onClick={showPassword}><img ref={ref} src="/icons/eye.svg" alt="" width={24} height={24} /></span>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-600 rounded-full m-2 px-4 py-1 font-bold border-2 border-green-900 hover:bg-amber-200'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>SAVE
                    </button>
                </div>
                <div className="password ">
                    <h1 className='flex justify-center text-4xl font-bold py-2'>Your Passwords</h1>
                    <div className="relative overflow-x-auto">
                        {passwordArray.length === 0 && <div>No password to show</div>}
                        {passwordArray.length !== 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden mb-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-bold text-2xl text-center flex justify-center items-center">
                                            Website
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-bold text-2xl text-center">
                                            username
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-bold text-2xl text-center">
                                            Password
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-bold text-2xl text-center">
                                            copy
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-bold text-2xl text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                            </th>
                                            <td className="px-6 py-4  text-center">
                                                {item.username}
                                            </td>
                                            <td className="px-6 py-4  text-center">
                                                {item.password}
                                            </td>
                                            <td className="px-6 py-4  flex justify-center cursor-pointer">
                                                <img src="/icons/copy.svg" alt="" width={24} height={24} onClick={() => copytext("Password: " + item.password + ", Website: " + item.site + ", Username: " + item.username)} />
                                            </td>
                                            <td className="px-6 py-4 cursor-pointer text-center">
                                                <div className='flex justify-center'>
                                                    <div className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                    <span className='flex justify-center items-center text-3xl'>&nbsp;|&nbsp;</span>
                                                    <div className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>


                                            </td>

                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Manager