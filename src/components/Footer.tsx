"use client";

import { BsLinkedin, BsGithub, BsBehance, BsInstagram } from 'react-icons/bs';

const Footer = () => {
    const openInNewTab = (url:string) => {
        window.open(url, '_blank', 'noreferrer');
    };

    return (
        <footer className='bg-violet-50 dark:bg-stone-900 w-full bottom-0 p-4 mt-24'>
            <div className="w-full md:flex md:w-auto">
                <ul className="justify-between px-4 mx-auto lg:max-w-7xl md:flex md:px-16">
                    <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
                        <button onClick={() => {
                            openInNewTab('https://www.linkedin.com/in/katy-rosli-761b70185/');
                        }}>
                            <BsLinkedin /> 
                        </button>
                    </li>
                    <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
                        <button onClick={() => {
                            openInNewTab('https://github.com/KatyRosli');
                        }}>
                            <BsGithub />
                        </button>
                    </li>
                    <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
                        <button onClick={() => {
                            openInNewTab('https://www.behance.net/KatyLii');
                        }}>
                            <BsBehance />
                        </button>
                    </li>
                    <li className='pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0'>
                        <button onClick={() => {
                            openInNewTab('https://www.instagram.com/katy.rosli/');
                        }}>
                            <BsInstagram />
                        </button>
                    </li>
                </ul>
            </div>
            <div className='justify-center mx-auto lg:max-w-7xl md:items-center md:flex md:px-16'>
                <p className='text-center'>© 2024 Katy Rosli</p>
            </div>
        </footer>
    )
};
export default Footer;