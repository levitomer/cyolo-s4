import React from 'react';
import { observer } from 'mobx-react';
import { File } from '../components';
// import { FileInterface } from '../interfaces/File';
import { RegistryInterface } from '../interfaces/Registry';

interface IProps {
    registry: RegistryInterface;
}

const Registry: React.FC<IProps> = (props: IProps): JSX.Element => {
    const { isLoading, totalFilesCount, files } = props.registry;

    const onShare = React.useCallback(() => {
        console.log('Share');
    }, []);

    const onDelete = React.useCallback(() => {
        console.log('Share');
    }, []);

    if (isLoading) {
        return <div>Loading Files...</div>;
    }

    return (
        <React.Fragment>
            {files.map((file) => (
                <File
                    key={file.id}
                    file={file}
                    onShare={onShare}
                    onDelete={onDelete}
                />
            ))}
        </React.Fragment>
    );
};

export default observer(Registry);
