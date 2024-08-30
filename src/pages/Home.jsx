import { useMemo } from 'react';
import { MdBolt } from 'react-icons/md';
import { FaMedal } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import { MdOutlineInfo } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import API from '@/modules/Api';
import Audio from '@/modules/Audio';
import WebApp from '@twa-dev/sdk';
import { Link } from '@/components/Link/Link';
import jackpotImg from '@/assets/images/jackpot.png';

const Home = function () {
    const user = WebApp.initDataUnsafe.user;
    const [searchParams, setSearchParams] = useSearchParams();
    const username = useMemo(() => {
        API.post('api/v1/auth/login', { username: user.id, fullname: user.first_name + ' ' + user.last_name, invitor: searchParams.get('inviter_id') }).then((res) => {
			setUserId(res.data.user.userId);
		});
        return user.first_name + ' ' + user.last_name;
    }, [user]);

    const [userId, setUserId] = useState('');
    const [gameId, setGameId] = useState('');
    const [score, setScore] = useState(0);
    const [max_score, setMaxScore] = useState(0);
    const [jackpot, setJackpot] = useState(0);
    const [heart, setHeart] = useState(0);
    const [pushed, setPushed] = useState(false);
    const [isClaimable, setClaimable] = useState(false);
    const [isShowGetEffect, setShowGetEffect] = useState(false);

    const mouseDownHandler = async () => {
        if (isClaimable) return;
        setPushed(true);
        try {
            const response = await API.post('/api/v1/todos', { id: gameId, userid: userId });
            setGameId(response.data._id);
            setScore(response.data.score);
            setMaxScore(response.data.max_score);
            setJackpot(response.data.jackpot);
            setHeart(response.data.heart);

            if (response.data.heart == 1) {
                Audio.beat.play();
                setTimeout(() => {
                    setHeart(0);
                    if (response.data.jackpot) {
                        setClaimable(true);
                    }
                    else {

                    }
                }, 3000);
            } else if (response.data.score > 0) {
                Audio.click.play();
            } else {
                Audio.notify.play();
            }
        } catch (error) {
            console.error(error);
        }

    }
    const handleClaim = () => {
        setClaimable(false);
        setShowGetEffect(true);
        setTimeout(() => setShowGetEffect(false), 1980)
    }
    const touchStartHandler = () => isClaimable || setPushed(true);
    const touchEndHandler = () => setPushed(false);
    const mouseUpHandler = () => setPushed(false);
    const mouseLeaveHandler = () => setPushed(false);

    return (
        <div className='w-full min-h-screen bg-[rgb(243,248,240)] text-black'>
            {heart ? <div className='absolute top-0 left-0 z-10 w-screen h-screen animate-warning' style={{ backgroundImage: 'radial-gradient(transparent, #ffaaaa)' }}></div> : ''}
            <div className='container flex flex-col items-center justify-center pt-10'>
                <div className='flex justify-between w-full px-10'>
                    <div className='text-lg font-bold text-blue-500'>buttoncoin</div>
                    <div className='px-4 py-1 text-white bg-blue-500 rounded-full'>{username}</div>
                </div>
                <div className='flex items-center justify-between w-full px-16 mt-3'>
                    <button className=''><MdOutlineInfo size={30} /></button>
                    <Link to='/leaderboard' className=''><GiTrophyCup size={30} /></Link>
                </div>
                <div className='flex items-center justify-center w-full gap-3 px-16 my-10'>
                    <FaMedal size={30} /> <span className='text-4xl font-extrabold'>{max_score}</span>
                </div>
                <div
                    onMouseDown={mouseDownHandler}
                    onTouchStart={touchStartHandler}
                    onTouchEnd={touchEndHandler}
                    onTouchCancel={mouseUpHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseLeave={mouseLeaveHandler}
                    className={`w-60 h-60 relative bg-gradient-to-t from-purple-400 to-purple-200 rounded-full border-slate-700 border`} style={{ transform: 'rotateX(30deg)' }}>
                    <div className={`w-48 h-48 absolute top-3 left-6 bg-indigo-500 rounded-full shadow-slate-600 border-2 border-slate-700 ${pushed ? 'shadow-md' : 'shadow-lg'}`}></div>
                    <div className={`w-48 h-48 select-none absolute -top-1 left-6 bg-gradient-to-t from-indigo-400 to-indigo-300 rounded-full cursor-pointer transition-all duration-200 flex justify-center items-center text-5xl font-bold ${pushed ? 'translate-y-4' : ''}`}>{score}</div>
                </div>
                { isClaimable && <img onClick={handleClaim} src={jackpotImg} className='w-16 h-16 animate-bounce cursor-pointer' alt="jackpot image" />}
                { isShowGetEffect && <div className='text-xl font-bold opacity-1 animate-disappear'>+ 10</div>}
                
                <Link to='/boost' className='flex items-center px-10 py-2 mt-5 text-white bg-blue-600 rounded-full shadow-md'>Boost <MdBolt size={20} /></Link>
            </div>
        </div>
    )
}

export default Home;