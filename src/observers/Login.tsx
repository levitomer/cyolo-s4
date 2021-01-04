import { observer } from 'mobx-react';

const Login = ({ store }) => {
    const onNewTodo = () => {
        console.log('Login');
    };

    return <div>Login</div>;
};

export default observer(Login);
