import {createJWT, createUnixTime, formatNumberWithSpaces, generateUserToken} from '../utils.js';
import CircleForTasks from './CircleForTasks.jsx';
import useUser from '../http/hooks/useUser.js';

const TaskItem = ({task, updateTaskStatus}) => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);
    const taskStatus = task.status && task.status !== 'claimed' ? Number(task.status) : 0;

    const handleClick = async () => {
        if (task.status === 'claimed') {
            return; // Не выполнять действия для задач со статусом 'claimed'
        }
        if (task.status === '100') {
            await claimReward();
            updateTaskStatus(task.id, 'claimed', Number(task.amount));
        } else if (task.status !== '100' && (task.type === 'link' || task.type === 'channel')) {
            try {
                window.open(task.data, '_blank');
                const task_token = createJWT({
                    id : user.id,
                    task_id : task.id,
                    type : task.type,
                    data : createUnixTime(),
                });
                const response = await fetch(`https://api.tonixhub.com/api/v1/users/webhook?token=${task_token}`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                updateTaskStatus(task.id, '100');
                console.log('POST request successful:', result);
            } catch (error) {
                console.error('Error in POST request:', error);
            }
        }
    };

    const claimReward = async () => {
        try {
            const task_token = createJWT({
                id : user.id,
                task_id : task.id,
                type : task.type,
                asset : 'tonix',
                data : createUnixTime(),
            });
            const response = await fetch(`https://api.tonixhub.com/api/v1/users/task/claim?token=${task_token}`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('POST request successful:', result);
        } catch (error) {
            console.error('Error in POST request:', error);
        }
    };

    return (
        <div
            className={`px-4 py-2 flex items-center justify-between max-w-96 relative cursor-pointer`}
            onClick={task.status !== 'claimed' ? handleClick : null}
        >
            <div
                className={`flex-1 p-2 rounded-3xl shadow-md relative overflow-hidden ${theme === 'dark' ? 'bg-[#323870] text-white' : 'bg-[#E8F6FF] text-black'}`}
            >
                <div className="absolute left-0 top-0 h-full">
                    <img src={'/assets/taskGradient.png'} alt="Gradient" className="h-full"/>
                </div>
                <div className="ml-4">
                    <div
                        className={`text-s font-bold ${(task.type === 'link' || task.type === 'channel') ? 'text-[#c001ff]' : ''} `}
                    >
                        {task.head}
                    </div>
                    <div className="text-xs w-full">{task.description} </div>

                    {task.status === '100' ? (
                        <button
                            className="bg-[#00FFFC] text-s text-[#323870] z-20 font-bold py-1 px-4 rounded-lg my-1"
                        >
                            Забрать
                        </button>
                    ) : (
                        <div className="flex items-center mt-2">
                            <img src={`/assets/${theme === 'dark' ? 'coinDark.png' : 'coin.png'}`}
                                 className="w-[5vw] h-[2vh]"/>
                            <div className="text-[5vw] ml-2 font-typingrad">
                                {formatNumberWithSpaces(Number(task.amount))} TONiX
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="ml-4">
                {task.status === 'claimed' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#00FFFC"/>
                        <path d="M6 12l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                ) : (
                    <CircleForTasks percentage={taskStatus}/>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
