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
        <div className="w-full min-h-screen bg-[rgb(243,248,240)]">
            <div className='container flex flex-col items-center justify-center pt-10 mx-auto'>
                <div className='flex items-center justify-between w-full px-8 mt-3'>
                    <FaMedal size={30} />
                </div>
                <div className="flex justify-between w-full px-20 mt-20 font-bold">
                    <div>No</div>
                    <div>Name</div>
                    <div>Score</div>
                </div>
                { users.map((user, key) => (
                    <div key={key} className="flex justify-between w-full px-20">
                        <div>{key + 1}</div>
                        <div>{user.username}</div>
                        <div>{user.score}</div>
                    </div>
                )) }                    
            </div>
        </div>
    );
}

export default Leaderboard;