import {createJWT, createUnixTime, formatNumberWithSpaces, generateUserToken} from '../utils.js';
import CircleForTasks from './CircleForTasks.jsx';
import useUser from '../http/hooks/useUser.js';

const TaskItem = ({task}) => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);


    const taskStatus = task.status && task.status !== 'Null' ? Number(task.status) : 0;
    const handleClick = async () => {
        if (task.type === 'link' || task.type === 'channel') {
            window.open(task.data, '_blank');
            // try {
            //     const task_token = createJWT({
            //         id : user.id,
            //         task_id : task.id,
            //         type : task.type,
            //         data : createUnixTime(),
            //     });
            //
            //     const response = await fetch(`https://api.tonixhub.com/api/v1/users/webhook?${task_token}`, {
            //         method : 'POST',
            //         headers : {
            //             'Content-Type' : 'application/json',
            //         },
            //     });
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     const result = await response.json();
            //     console.log('POST request successful:', result);
            // } catch (error) {
            //     console.error('Error in POST request:', error);
            // }
        }
    };

    return (
        <div
            className="px-4 py-2 flex items-center justify-between max-w-96 relative cursor-pointer"
            onClick={handleClick}
        >
            <div
                className={`flex-1 p-2 rounded-3xl shadow-md relative overflow-hidden ${theme === 'dark' ? 'bg-[#323870] text-white' : 'bg-[#E8F6FF] text-black'}`}
            >
                <div className="absolute left-0 top-0 h-full">
                    <img src={'/assets/taskGradient.png'} alt="Gradient" className="h-full"/>
                </div>
                <div className="ml-4">
                    <div
                        className={`text-s font-bold ${(task.type === 'link' || task.type === 'channel') ? 'text-[#c001ff]' : ''} `}>{task.head}</div>
                    <div className="text-xs w-full">{task.description} </div>
                    <div className="flex items-center mt-2">
                        <img src={`/assets/${theme === 'dark' ? 'coinDark.png' : 'coin.png'}`}
                             className="w-[5vw] h-[2vh]"/>
                        <div className="text-[5vw] mb-1 ml-2 font-typingrad">
                            {formatNumberWithSpaces(Number(task.amount))} TONiX
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-4">
                <CircleForTasks percentage={taskStatus}/>
            </div>
        </div>
    );
};

export default TaskItem;
