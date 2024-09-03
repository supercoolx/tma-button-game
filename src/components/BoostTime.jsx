import { useState, useEffect } from "react";
import API from '@/modules/Api';

const BoostTime = ({ username }) => {
    const [bonusTime, setBonusTime] = useState('');

    useEffect(() => {
        // const fetchBonus = () => {
            API.post('api/v1/todos/getboost', { username }).then((res) => {
            	const ms = res.data.bonus_time;
                if (ms > 0) {
                    const totalMinutes = Math.floor(ms / 60000); // 60000 ms in a minute
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    setBonusTime(`${hours} : ${minutes}`);
                }
                else setBonusTime('');
            });
        // }
        // fetchBonus();
        // const intervalId = setInterval(fetchBonus, 5000);
        // return () => clearInterval(intervalId);
    }, []);

    return <p className='pt-3 text-center'>{ bonusTime }</p>
}

export default BoostTime;