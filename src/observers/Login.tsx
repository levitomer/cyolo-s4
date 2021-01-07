import React from 'react';
import { observer } from 'mobx-react';
import { AuthInterface } from 'interfaces/Auth';

interface IProps {
    auth: AuthInterface;
}
const Login: React.FC<IProps> = (props: IProps): JSX.Element => {
    const {
        inProgress,
        errors,
        setUsername,
        setEmail,
        setPassword,
        reset,
        login,
        register,
        logout,
    } = props.auth;

    const onNewTodo = () => {
        console.log('Login');
    };

    if (inProgress) {
        return <div>IN PROGRESS</div>;
    }
    return <div>Login</div>;
};

export default observer(Login);
