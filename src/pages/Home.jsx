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
    const user = WebApp.initDataUnsafe.user;
    const invitor = WebApp.initDataUnsafe.start_param;
    // const invitor = '';
    // const user = { id: 7449972885, first_name: 'Marco', last_name: 'Wong', username: 'supercool912', invitor };
    const username = useMemo(() => {
        console.log('user info:', user, 'invitor: ' + invitor);
        API.post('api/v1/auth/login', { username: user.id, tgId: user.username, fullname: user.first_name + ' ' + user.last_name, invitor: invitor || '' }).then((res) => {
			setUserId(res.data.user.userId);
		});
        return user.first_name + ' ' + user.last_name;
    }, []);
    const [heart, setHeart] = useState(0);
    const [isClaimable, setClaimable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const clickHandler = () => {
        if (loading || isClaimable) return;
        setLoading(true);
        API.post('/api/v1/todos', { id: gameId, userid: userId })
            .then(response => {
                // const response = { data: { _id: '234', score: 1, max_score: 1, jackpot: 0, heart: 1}};
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
                            setShowModal(true);
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
    
    const FailJackpotModal = () => {
        return (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed z-10 w-screen overflow-y-auto top-44">
                    <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="px-12 pt-8 pb-8 bg-white sm:p-6 sm:pb-10">
                            <div className="sm:flex sm:items-start">
                                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div className="mt-8 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Jackpot Missed!</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">You didn't get Jackpot.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                        <button onClick={() => setShowModal(false)} type="button" className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3">Ok</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-[rgb(243,248,240)] text-black'>
            {heart ? <div className='fixed top-0 left-0 z-10 w-screen h-screen animate-warning' style={{ backgroundImage: 'radial-gradient(transparent, #ff5555)' }}></div> : ''}
            <div className='container flex flex-col items-center justify-center'>
                <div className='flex justify-between w-full px-3 py-2 bg-white'>
                    <Link to='/' className='font-bold text-blue-500'>Buttoncoin</Link>
                    <div className='px-4 py-1 text-sm text-white bg-blue-500 rounded-full'>{username}</div>
                </div>
                <div className='w-full bg-white'>
                    <div className='flex justify-between w-full px-4 pt-3 bg-[rgb(243,248,240)] rounded-t-3xl'>
                        <Link to='/info'><ReactSVG className='w-6' src='./svg/info.svg' /></Link>
                        <Link to='/jackpot'><ReactSVG className='w-7' src='./svg/badge.svg' /></Link>
                        <Link to='/leaderboard' className=''><ReactSVG className='w-6' src='./svg/leaderboard.svg' /></Link>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full gap-3 px-16 my-10'>
                    <ReactSVG className='w-6' src='./svg/medal.svg' /> <span className='text-4xl'>{maxScore}</span>
                </div>
                <PushButton text={score} disable={loading || isClaimable} callback={clickHandler} />
                <Link to='/boost' className='flex items-center px-20 py-2 mt-20 text-sm text-white bg-blue-600 rounded-full shadow-md'>Boost <ReactSVG className='w-3 text-white' src='./svg/bolt.svg' /></Link>
                <BoostTime username={user.id} />
            </div>
            { isClaimable && <ClaimButton text="Claim" callback={() => setClaimable(false)} /> }
            { showModal && <FailJackpotModal /> }
        </div>
    )
}


export default Home;