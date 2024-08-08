import {formatNumberWithSpaces} from '../utils.js';
import CircleForTasks from './CircleForTasks.jsx';

// eslint-disable-next-line react/prop-types
const TaskItem = ({title, description, reward, progress}) => {
    const tg = window.Telegram.WebApp;
    const theme = tg.colorScheme;

    return (
        <div className="px-4 py-2 flex items-center justify-between max-w-96 relative">
            <div
                className={`flex-1 p-2 rounded-3xl shadow-md relative overflow-hidden ${theme === 'dark' ? 'bg-[#323870] text-white' : 'bg-[#E8F6FF] text-black'}`}>
                <div className="absolute left-0 top-0 h-full">
                    <img src={'/assets/taskGradient.png'} alt="Gradient" className="h-full"/>
                </div>
                <div className="ml-4">
                    <div className="text-s font-bold">{title}</div>
                    <div className="text-xs w-full">{description}</div>
                    <div className="flex items-center mt-2">
                        <img src={`/assets/${theme === 'dark' ? 'coinDark.png' : 'coin.png'}`}
                             className="w-[5vw] h-[2vh]"/>
                        <div className="text-[5vw] mb-1 ml-2 font-typingrad">
                            {formatNumberWithSpaces(reward)} TONiX
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-4">
                <CircleForTasks
                    percentage={progress}
                />
            </div>
        </div>
    );
};

export default TaskItem;