import React, { useState, useEffect } from "react";
import API from "@/modules/Api";
import { FaMedal } from 'react-icons/fa';

const Leaderboard = function () {
    const [users, setUsers] = useState([]);
    useEffect(() =>{
        API.get('/api/v1/todos').then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[rgb(243,248,240)] px-8 text-black">
            <div className='container flex flex-col items-center justify-center pt-10 mx-auto'>
                <div className='flex items-center text-xl gap-3 w-full mt-3 mb-8'>
                    <FaMedal size={30} /> Leaderboard
                </div>
                <div className="flex flex-col w-full gap-5">
                    { users.map((user, key) => (
                        <div key={key} className="flex gap-3 p-3 text-xl justify-between w-full bg-white rounded-lg">
                            <div className="flex gap-2 items-center"><FaMedal size={30} />{key + 1}</div>
                            <div className="flex-1">{user.name}</div>
                            <div>{user.score}</div>
                        </div>
                    )) }                    
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;