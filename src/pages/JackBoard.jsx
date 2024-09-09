import React, { useState, useEffect } from "react";
import API from "@/modules/Api";
import { ReactSVG } from "react-svg";
import { Link } from "@/components/Link/Link";
import BoostTime from "@/components/BoostTime";
import WebApp from '@twa-dev/sdk';

const Jackpot = function () {
    const user = WebApp.initDataUnsafe.user;
    const [data, setData] = useState();
    const [remain, setRemain] = useState('');
    useEffect(() =>{
        API.get('/api/v1/todos/getjackboard/' + user.id, {}).then((res) => {
            console.log("jackborad=", res.data);
            setData(res.data);
            let days = Math.floor(res.data.remainTime /1000 / 60 / 60 / 24);
            let hours = Math.ceil(res.data.remainTime /1000 / 60 / 60) % 24;
            setRemain(`${days} days & ${hours} hours`);
        });
    }, []);

    return (
        <div className='w-full min-h-screen bg-[rgb(243,248,240)] text-black'>
            <div className='container flex flex-col items-center justify-center'>
                <div className='flex justify-between w-full px-3 py-2 bg-white'>
                    <Link to='/' className='font-bold text-blue-500'>Buttoncoin</Link>
                    <div className='px-4 py-1 text-sm text-white bg-blue-500 rounded-full'>{user.username}</div>
                </div>
                <div className='w-full bg-white'>
                    <div className='flex justify-between items-center w-full px-4 pt-3 bg-[rgb(243,248,240)] rounded-t-3xl'>
                        <div className='flex items-center gap-2'>
                            <Link to='/jackpot' className=''><ReactSVG className='w-6' src='./svg/badge.svg' /></Link>
                            <h1 className="text-2xl">Jackpot</h1>
                            <ReactSVG className="w-4 h-4" src="./svg/clock.svg" />
                            <p className="text-xs">{ remain }</p>
                        </div>
                        <Link to='/info'><ReactSVG className="w-6" src='./svg/info.svg' /></Link>
                    </div>
                </div>
                { data?.exist &&
                    <div className="w-full text-sm px-7">
                        <div className="w-full mt-10 text-center">
                            <div className="border"></div>
                            <div className="-translate-y-3">
                                <span className="bg-[rgb(243,248,240)] px-2">$250</span>
                            </div>
                            <div className="flex justify-center items-center gap-3 px-3 py-3 -mt-2 bg-[rgb(255,215,0,0.49)] rounded-md place-content-between">
                                <ReactSVG className="w-4" src="./svg/user.svg" />
                                <span>You{ data.total - 1 ? ` & ${data.total - 1} other players` : '' }</span>
                            </div>
                        </div>
                    </div>
                }
                <Link to='/boost' className='flex items-center px-20 py-2 mt-20 text-sm text-white bg-blue-600 rounded-full shadow-md'>Boost <ReactSVG className='w-3 text-white' src='./svg/bolt.svg' /></Link>
                <BoostTime username={user.id} />
            </div>
        </div>
    );
}

export default Jackpot;