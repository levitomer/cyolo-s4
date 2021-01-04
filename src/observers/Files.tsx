import { observer } from 'mobx-react';

const Files = ({ files }) => {
    const onShare = () => {
        console.log('Share');
    };

    const onDelete = () => {
        console.log('Delete');
    };

    return files.map((file) => <File onShare={onShare} onDelete={onDelete} />);
};

export default observer(Files);
