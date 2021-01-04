import { observable, action, computed } from 'mobx';
import agent from '../agent';

const LIMIT = 10;

export class FilesStore {
    @observable isLoading = false;
    @observable totalFilesCount = 0;
    @observable filesRegistry = observable.map();

    @computed get files() {
        return this.filesRegistry.values();
    }

    clear() {
        this.filesRegistry.clear();
    }

    getArticle(slug) {
        return this.filesRegistry.get(slug);
    }

    $req() {
        return agent.Files.all();
    }

    @action loadFiles() {
        this.isLoading = true;
        return this.$req()
            .then(
                action(({ files, filesCount }) => {
                    this.filesRegistry.clear();
                    files.forEach((file) => this.filesRegistry.set(file));
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
        return agent.Files.create(file).then(({ file }) => {
            this.filesRegistry.set(file.slug, file);
            return file;
        });
    }

    @action share(data) {
        return agent.Files.update(data).then(({ file }) => {
            this.filesRegistry.set(file.slug, file);
            return file;
        });
    }

    @action delete(file) {
        this.filesRegistry.delete(file);
        return agent.Files.del(file).catch(
            action((err) => {
                this.loadFiles();
                throw err;
            })
        );
    }
}

export default new FilesStore();
