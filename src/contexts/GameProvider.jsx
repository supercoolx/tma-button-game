import { useState, useEffect, createContext, useContext } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [userId, setUserId] = useState('');//mongodb user id
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [gameId, setGameId] = useState('');

    return (
        <GameContext.Provider value={{
            userId, setUserId,
            score, setScore,
            maxScore, setMaxScore,
            gameId, setGameId
        }} >
            { children }
        </GameContext.Provider>
    )
};

export const useGame = () => useContext(GameContext);

export default GameProvider;