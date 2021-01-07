// import { FileInterface } from './File';

export interface RegistryInterface {
    isLoading: boolean;
    totalFilesCount: number;
    files; // FileInterface[]
    clear(): void;
    getFile(fileId: string);
    loadFiles();
    upload(file: File);
    share(fileId: string);
    delete(fileId: string);
}
