import { useEffect, useState } from 'react';
import jackpotImg from '@/assets/images/jackpot.png';
import congraImg from '@/assets/images/congratulation.gif';

const ClaimButton = ({ text, callback }) => {
    const [visible, setVisible] = useState(true);
    const handleClick = () => {
        setVisible(false);
        setTimeout(callback, 2000);
    }

    useEffect(() => {
        
    }, [visible])

    return (
        <div className='fixed w-screen h-screen top-[45px]'>
            <img src={congraImg} className='absolute w-screen h-screen rounded-3xl' alt="congratulation" />
            <div className='absolute flex justify-center w-full bottom-20'>
                {visible ? <button onClick={handleClick} className='px-10 py-2 text-white bg-blue-600 rounded-full shadow-md'>{ text }</button> :
                <img src={jackpotImg} className='h-16 mx-auto opacity-0 cursor-pointer animate-disappear' alt="jackpot image" />}
            </div>
        </div>
    )
}

export default ClaimButton;