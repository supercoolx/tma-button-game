import { useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';
import API from '@/modules/Api';
import Audio from '@/modules/Audio';
import WebApp from '@twa-dev/sdk';
import { useGame } from '@/contexts/GameProvider';
import { Link } from '@/components/Link/Link';
import BoostTime from '@/components/BoostTime';
import PushButton from '@/components/PushButton';
import ClaimButton from '@/components/ClaimButton';

const Home = function () {
    const { userId, setUserId, score, setScore, maxScore, setMaxScore, gameId, setGameId} = useGame();
    // const user = WebApp.initDataUnsafe.user;
    // const invitor = WebApp.initDataUnsafe.start_param;
    const invitor = '';
    const user = { id: 7449972885, first_name: 'Marco', last_name: 'Wong' , invitor };
    const username = useMemo(() => {
        console.log('user info:', user, 'invitor: ' + invitor);
        API.post('api/v1/auth/login', { username: user.id, fullname: user.first_name + ' ' + user.last_name, invitor: invitor || '' }).then((res) => {
			setUserId(res.data.user.userId);
		});
        return user.first_name + ' ' + user.last_name;
    }, []);
    const [heart, setHeart] = useState(0);
    const [isClaimable, setClaimable] = useState(false);
    const [loading, setLoading] = useState(false);

    const clickHandler = () => {
        if (loading || isClaimable) return;
        setLoading(true);
        API.post('/api/v1/todos', { id: gameId, userid: userId })
            .then(response => {
                // const response = { data: { _id: '234', score: 1, max_score: 1, jackpot: 1, heart: 1}};
                setGameId(response.data._id);
                setScore(response.data.score);
                setMaxScore(response.data.max_score);
                setHeart(response.data.heart);
    
                if (response.data.heart == 1) {
                    Audio.beat.play();
                    setTimeout(() => {
                        setHeart(0);
                        if (response.data.jackpot) {
                            Audio.jackpot.play();
                            setClaimable(true);
                        }
                        else {
                            Audio.none.play();
                        }
                    }, 3000);
                } else if (response.data.score > 0) {
                    
                } else {
                    Audio.reset.play();
                }
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });

    }

    return (
        <div className='w-full min-h-screen bg-[rgb(243,248,240)] text-black'>
            {heart ? <div className='fixed top-0 left-0 z-10 w-screen h-screen animate-warning' style={{ backgroundImage: 'radial-gradient(transparent, #ff5555)' }}></div> : ''}
            <div className='container flex flex-col items-center justify-center'>
                <div className='flex justify-between w-full px-3 py-2 bg-white'>
                    <div className='text-lg font-bold text-blue-500'>buttoncoin</div>
                    <div className='px-4 py-1 text-sm text-white bg-blue-500 rounded-full'>{username}</div>
                </div>
                <div className='w-full bg-white'>
                    <div className='flex justify-between w-full px-8 pt-3 bg-[rgb(243,248,240)] rounded-t-3xl'>
                        <button className=''><ReactSVG src='./svg/info.svg' /></button>
                        <button className=''><ReactSVG src='./svg/badge.svg' /></button>
                        <Link to='/leaderboard' className=''><ReactSVG src='./svg/leaderboard.svg' /></Link>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full gap-3 px-16 my-10'>
                    <ReactSVG src='./svg/medal.svg' /> <span className='text-4xl'>{maxScore}</span>
                </div>
                <PushButton text={score} disable={loading || isClaimable} callback={clickHandler} />
                <Link to='/boost' className='flex items-center px-10 py-2 mt-10 text-white bg-blue-600 rounded-full shadow-md'>Boost <ReactSVG className='text-white' src='./svg/bolt.svg' /></Link>
                <BoostTime username={user.id} />
            </div>
            { isClaimable && <ClaimButton text="Claim" callback={() => setClaimable(false)} /> }
        </div>
    )
}

export default Home;