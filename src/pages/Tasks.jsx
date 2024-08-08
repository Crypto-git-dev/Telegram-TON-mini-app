import TaskItem from '../components/TaskItem.jsx';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';
import React, {useEffect, useState} from 'react';
import {createJWT, createUnixTime, generateUserToken} from '../utils.js';
import useUser from '../http/hooks/useUser.js';

const Tasks = () => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);

    const task_token = user?.robot_id ? createJWT({
        id : user.id,
        robot_id : user.robot_id,
        data : createUnixTime(),
    }) : null;

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.tonixhub.com/api/v1/task/gettasks/${task_token}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setTasks(result);
            } catch (error) {
                throw new Error(error);
            }
        };
        fetchData();
    }, [task_token]);

    const updateTaskStatus = (taskId, status) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? {...task, status} : task
            )
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div
            className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}
        >
            <div className="fixed top-0 w-full z-10">
                <Header/>
                <div className={'mt-[17%] ml-7'}>
                    <RocketProgressBar/>
                </div>
            </div>
            <div
                className={`flex-grow p-2 rounded-xl shadow-lg max-w-xl mx-auto mt-[30%] rounded-t-3xl z-20 relative
                 ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}
                style={{
                    boxShadow : '0 4px 20px rgba(0, 255, 252, 0.5)',
                    borderTop : '1px solid #00FFFC'
                }}
            >
                <div className="text-center">
                    <h1 className="text-3xl font-lego font-bold">TASKS</h1>
                    <p className="text-xs">Выполняй задания и зарабатывай больше</p>
                </div>
                <div className="h-[63vh] overflow-y-auto mb-2 w-[96vw]">
                    {tasks.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            updateTaskStatus={updateTaskStatus}
                        />
                    ))}
                </div>
                <div className="fixed bottom-3 left-0 w-full mx-auto">
                    <SideBar/>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
