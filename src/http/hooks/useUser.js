import {useState, useEffect} from 'react';


const useUser = (token) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const tg = window.Telegram.WebApp;
    // const userTg = tg.initDataUnsafe.user;


    useEffect(() => {
        async function fetchUser() {
            try {
                // const response = await UserEndpoints.getUser(token);

                const response = {
                    '_id' : '66a102031c11428fd1db2833',
                    'id' : 11111,
                    'username' : 'gregererg',
                    'profile_lvl' : 1,
                    'bio' : {
                        'first_name' : 'qwwefwwef',
                        'last_name' : 'erge',
                        'language' : 'wqd',
                        'is_active' : 1
                    },
                    'refer_id' : null,
                    'time_data' : {
                        'registration_data' : 1721827843,
                        'last_web_session' : 1722245755
                    },
                    'crypto_data' : {
                        'ton' : {
                            'wallet_type' : null,
                            'adress' : null,
                            'balance' : 100
                        },
                        'tonix' : {
                            'wallet_type' : null,
                            'adress' : null,
                            'balance' : 400100
                        }
                    },
                    'tasks' : {
                        '2dswfq3434f' : 'claimed',
                        'ef324r2fd' : 'completed'
                    },
                    'robot_id' : '66a4e9571ee25a5a8b853544',
                    'airdrops' : {
                        '66a4faa7aa8306a13e177edb' : 2
                    }
                };
                setUser(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [token]);

    return {user, loading, error};
};

export default useUser;
