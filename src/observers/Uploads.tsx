import { observer } from 'mobx-react';

const Uploads = observer(({ store }) => {
    const onFileUpload = () => {
        //
        // store.upload(file);
    };

    return <div>Uploads</div>;
});

export default observer(Uploads);
