import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-[#8ec5b4] '>
            <div className='flex justify-evenly gap-5 items-center'>
                <ul className='flex items-center'>
                    <li className='logo text-3xl font-bold'>
                        <span className=' text-[#075528]'>&lt;</span><span>Pass</span><span className=' text-[#075528]'>OP/&gt;</span>
                    </li>
                </ul>
                <ul className='flex gap-5 font-bold items-center'>
                    <li>
                        <button className='bg-green-950 text-white m-2 p-2 w-12 h-12 rounded-full'><a href="https://www.linkedin.com/in/aman-singh-sikarwar-02/"><lord-icon
                            src="https://cdn.lordicon.com/euybrknk.json"
                            trigger="hover"
                            state="hover-roll"
                            title="Linkedin"
                        >
                        </lord-icon></a></button>
                    </li>
                    <li>
                        <button className='bg-green-950 text-white m-2 p-2 w-12 h-12 rounded-full'><a href="https://github.com/AMAN02SS">
                            <lord-icon
                                src="https://cdn.lordicon.com/jjxzcivr.json"
                                trigger="hover"
                                state="hover-roll"
                                title="Github"
                            >
                            </lord-icon>
                        </a>
                        </button>
                    </li>
                </ul>
            </div>
            <div className=''>

            </div>

           
        </nav>

    )
}

export default Navbar