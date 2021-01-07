import { v4 as IDGenerator } from 'uuid';
import { observable, action, computed } from 'mobx';
import { Files as api } from '../api/Files';
// import { FileInterface } from '../interfaces/File';
import { RegistryInterface } from '../interfaces/Registry';
const LIMIT = 10;

export class RegistryStore implements RegistryInterface {
    @observable isLoading = false;
    @observable totalFilesCount = 0;
    @observable files = observable.map();

    @computed getFiles() {
        return this.files.values();
    }

    clear(): void {
        this.files.clear();
    }

    getFile(fileId: string) {
        return this.files.get(fileId);
    }

    $req() {
        return api.all();
    }

    @action loadFiles() {
        this.isLoading = true;
        return this.$req()
            .then(
                action(({ files, filesCount }) => {
                    this.files.clear();
                    files.forEach((file: File) =>
                        this.files.set(IDGenerator(), file)
                    );
                    this.totalFilesCount = Math.ceil(filesCount / LIMIT);
                })
            )
            .finally(
                action(() => {
                    this.isLoading = false;
                })
            );
    }

    @action upload(file) {
        return api.upload(file).then(({ file }) => {
            this.files.set(file.slug, file);
            return file;
        });
    }

    @action share(fileId: string) {
        return api.share(fileId).then(({ file }) => {
            this.files.set(file.slug, file);
            return file;
        });
    }

    @action delete(fileId: string) {
        this.files.delete(fileId);
        return api.delete(fileId).catch(
            action((err) => {
                this.loadFiles();
                throw err;
            })
        );
    }
}

export default new RegistryStore();
