import requests from '.';

export const Files = {
    // Returns an array of file metadata for the logged in user
    all: () => requests.get(`/files`),
    // Deletes a single file
    delete: (fileId: string) => requests.delete(`/files/${fileId}`),
    // Returns the unencrypted file
    get: (fileId: string) => requests.get(`/files/${fileId}`),
    /*
     * Allows the upload of a single file using a multipart request.
     * the file is then encrypted using a pre-set secret
     */
    upload: (file) => requests.post('/files', { file }),
    // Comming Soon - sharing a file
    share: (fileId: string) => requests.post('/files/share', { fileId }),
};
