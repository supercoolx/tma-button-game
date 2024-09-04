import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

const ClaimButton = ({ text, callback }) => {
    const [visible, setVisible] = useState(true);
    const handleClick = () => {
        setVisible(false);
        setTimeout(callback, 1000);
    }

    useEffect(() => {
        
    }, [visible])

    return (
        <div className='absolute flex flex-col items-center w-full top-48'>
            <div className='w-64'>
                <video className='object-cover rounded-3xl h-72 border-2 border-[rgb(222,187,2)]' autoPlay loop muted>
                    <source src="./video/confetti.mp4" type="video/mp4" />
                </video>
            </div>
            <div className='absolute top-0 flex flex-col items-center'>
                <div className='w-12 h-12 mt-5 flex justify-center items-center bg-[rgb(222,187,2)] rounded-full'><ReactSVG className='w-8' src='./svg/badge.svg' /></div>
                <h1 className='mt-10 text-3xl text-white animate-appear'>Jackpot Hit!</h1>
                <h1 className='mt-3 text-white animate-appear'>You are a jackpot winner!</h1>
                <div className='mt-10'>
                    {visible ? <button onClick={handleClick} className='px-16 py-2 text-black bg-[rgb(222,187,2)] rounded-lg shadow-md animate-appear'>{ text }</button> :
                    // <img src={jackpotImg} className='h-16 mx-auto opacity-0 cursor-pointer animate-disappear' alt="jackpot image" />}
                    ''}
                </div>

            </div>
        </div>
    )
}

export default ClaimButton;