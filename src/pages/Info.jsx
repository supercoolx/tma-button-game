import { useState } from "react";
import { Link } from "@/components/Link/Link";
import { ReactSVG } from "react-svg";
import BoostTime from "@/components/BoostTime";
import LogoImg from '@/assets/images/logo.png';
import WebApp from '@twa-dev/sdk';

const Info = function () {
    const user = WebApp.initDataUnsafe.user;
    const [page, setPage] = useState(1);

    const handlePrev = () => setPage((page - 1) < 1 ? 4 : page - 1);
    const handleNext = () => setPage((page + 1) > 4 ? 1 : page + 1);

    return (
        <div className='w-full min-h-screen bg-[rgb(243,248,240)] text-black'>
            <div className='container flex flex-col items-center justify-center'>
                <div className='flex justify-between w-full px-3 py-2 bg-white'>
                    <Link to='/' className='font-bold text-blue-500'>Buttoncoin</Link>
                    <div className='px-4 py-1 text-sm text-white bg-blue-500 rounded-full'>{user.username}</div>
                </div>
                <div className='w-full bg-white'>
                    <div className='flex justify-between w-full px-8 pt-3 bg-[rgb(243,248,240)] rounded-t-3xl'>
                        <Link to='/info'><ReactSVG className="w-6" src='./svg/info.svg' /></Link>
                        <button className=''><ReactSVG className="w-7" src='./svg/badge.svg' /></button>
                        <Link to='/leaderboard' className=''><ReactSVG className="w-6" src='./svg/leaderboard.svg' /></Link>
                    </div>
                </div>
                <div className='mx-auto mt-5 text-sm bg-white rounded-3xl' style={{ width: 'calc(100vw - 40px)' }}>
                    <div className="flex items-center justify-between px-5 pt-2">
                        <div>{ page }/4</div>
                        <div><img alt="logo" className="w-10" src={LogoImg} /></div>
                        <Link to='/'><ReactSVG className="w-5" src="./svg/close.svg" /></Link>
                    </div>
                    <h1 className="mt-4 text-center">{ page == 1 ? 'How to play' : `Page ${page}` }</h1>
                    <p className="px-8 mt-5">Every time the button is pressed, your score goes up with 1 point. However, every press on the button increases the chance that your score will be reset with 1%. </p><br />
                    <p className="px-8">The top 10 ranked players on the leaderboard will receive weekly prizes.</p>
                    <div className="flex justify-between mt-20 mb-5">
                        <div onClick={handlePrev} className="flex justify-start flex-1 ml-5"><button><ReactSVG className="rotate-180 w-7" src="./svg/right.svg" /></button></div>
                        <div className="flex-1"><button className="px-16 py-1 text-sm text-white bg-blue-600 rounded-full grid-">whitepaper</button></div>
                        <div onClick={handleNext} className="flex justify-end flex-1 mr-5"><button><ReactSVG className="w-7" src="./svg/right.svg" /></button></div>
                    </div>
                </div>
                <Link to='/boost' className='flex items-center px-20 py-2 mt-10 text-white bg-blue-600 rounded-full shadow-md'>Boost <ReactSVG className='text-white' src='./svg/bolt.svg' /></Link>
                <BoostTime username={user.id} />
            </div>
        </div>
        
    )
}

export default Info;