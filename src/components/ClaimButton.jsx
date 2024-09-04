import { useEffect, useState } from 'react';

const ClaimButton = ({ text, callback }) => {
    const [visible, setVisible] = useState(true);
    const handleClick = () => {
        setVisible(false);
        setTimeout(callback, 1000);
    }

    useEffect(() => {
        
    }, [visible])

    return (
        <div className='fixed flex flex-col items-center w-screen h-screen top-[45px] overflow-hidden'>
            <div className='w-[400vw] flex justify-center'>
                <video className='h-screen rounded-3xl' autoPlay loop muted>
                    <source src="./video/confetti.mp4" type="video/mp4" />
                </video>
            </div>
            <h1 className='absolute top-[40%] text-white text-3xl'>Jackpot Winner!</h1>
            <div className='absolute flex justify-center w-full bottom-20'>
                {visible ? <button onClick={handleClick} className='px-10 py-2 text-white bg-blue-600 rounded-full shadow-md'>{ text }</button> :
                // <img src={jackpotImg} className='h-16 mx-auto opacity-0 cursor-pointer animate-disappear' alt="jackpot image" />}
                ''}
            </div>
        </div>
    )
}

export default ClaimButton;