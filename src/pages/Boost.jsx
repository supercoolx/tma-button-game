import { HiUsers } from "react-icons/hi";
import WebApp from '@twa-dev/sdk';
import { initUtils } from "@telegram-apps/sdk";
import API from "@/modules/Api";
import { useEffect, useState } from "react";

const Boost = function () {
    const [isTg, setTg] = useState(false);
    const user = WebApp.initDataUnsafe.user;
    // const user = {id: 7449972885}; // mock

    const handleInviteFriend = function () {
        const utils = initUtils();
        const inviteLink = `https://t.me/button_game_123_bot/test2?startapp=${user.id}`;
        const shareText = 'Join our button game.';
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
        utils.openTelegramLink(fullUrl);
    }

    const handleTelegramClick = function () {
        if (isTg) {
            API.post('/api/v1/todos/jointg', { username: user.id }).then(res => console.log('join telegram channel:', res.data)).catch(console.log);
        }
        else {
            const utils = initUtils();
            const channelLink = 'https://t.me/thebuttoncoin';
            utils.openTelegramLink(channelLink);
        }
    }
    
    const handleTwitterClick = function () {
        const utils = initUtils();
        const xLink = 'https://X.com/thebuttoncoin';
        API.post('/api/v1/todos/followx', { username: user.id }).then(res => console.log('follow twitter account:', res.data)).catch(console.log);
        utils.openLink(xLink);
    }

    useEffect(() => {
        API.post('/api/v1/users/' + user.id).then(res => {
            if (res.data.user?.jointg) setTg(true); 
        });
    }, []);

    return (
        <div className="w-full min-h-screen bg-[rgb(243,248,240)] pt-10 text-black">
            <h1 className="text-2xl text-center">Boost your chance of<br />hitting the jackpot!</h1>
            <div className="p-3 mx-5 mt-5 bg-white rounded-xl">
                <p className="text-sm text-center">Invite a friend and get a DOUBLE chance to win a jackpot price!</p>
                <p className="mt-3 text-center">Time: 24h</p>
            </div>
            <div className="flex justify-center">
                <button onClick={handleInviteFriend} className="flex items-center gap-2 px-5 py-2 mt-5 text-sm text-white bg-blue-600 rounded-full">Invite a Friend <HiUsers size={20} /></button>
            </div>
            <div className="p-3 mx-5 mt-5 bg-white rounded-xl">
                <p className="text-sm text-center">Follow us on Social Media to get a DOUBLE chance to win a jackpot price!</p>
                <p className="mt-3 text-center">Time: 4h each</p>
            </div>
            <div className="flex justify-between px-5">
                <button onClick={handleTelegramClick} className="flex items-center gap-2 px-10 py-2 mt-5 text-sm text-white bg-blue-600 rounded-full">Telegram { isTg ? 'joined' : ''}</button>
                <button onClick={handleTwitterClick} className="flex items-center gap-2 px-10 py-2 mt-5 text-sm text-white bg-blue-600 rounded-full">X / Twitter</button>
            </div>
        </div>
        
    )
}

export default Boost;