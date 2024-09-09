import { useState, useEffect } from "react";
import API from '@/modules/Api';

const BoostTime = ({ username }) => {
    const [remain, setRemain] = useState(0);

    useEffect(() => {
        API.post('api/v1/todos/getboost', { username }).then((res) => {
            const ms = res.data.bonus_time;
            setRemain(ms);
        });
    }, []);

    useEffect(() => {
        if (remain > 0) {
            const id = setTimeout(() => setRemain(remain - 1000), 1000);
            return () => clearTimeout(id);
        }
    }, [remain]);

    function calculateTimeRemaining(ms) {
        
        if (ms <= 0) return "";
        
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    }

    return <p className='pt-3 text-center'>{ calculateTimeRemaining(remain) }</p>
}

export default BoostTime;