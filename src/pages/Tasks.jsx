import TaskItem from '../components/TaskItem.jsx';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';

const Tasks = () => {
    const tasks = [
        {
            title : 'Приветственный бонус',
            description : '@TonixHub',
            reward : '500',
            progress : '100'
        },
        {
            title : 'Подпишись на канал',
            description : '@TonixHub',
            reward : '1000',
            progress : '75'
        },
        {
            title : 'Подключи TonKeeper',
            description : 'Подключите крипто кошелек через Telegram',
            reward : '2000',
            progress : '25'
        },
        {
            title : 'Подпишись на TONIX',
            description : '@TonixHub',
            reward : '500',
            progress : '100'
        },
        {
            title : 'Подпишись на TONIX',
            description : '@TonixHub',
            reward : '500',
            progress : '100'
        }
    ];

    const tg = window.Telegram.WebApp;
    const theme = tg.colorScheme;


    return (
        <div
            className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}>
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
                }}>
                <div className="text-center">
                    <h1 className="text-3xl font-lego font-bold">TASKS</h1>
                    <p className="text-xs">Выполняй задания и зарабатывай больше</p>
                </div>
                <div className="h-[63vh] overflow-y-auto mb-2 w-[96vw]">
                    {tasks.map((task, index) => (
                        <TaskItem
                            key={index}
                            title={task.title}
                            description={task.description}
                            reward={task.reward}
                            progress={task.progress}
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