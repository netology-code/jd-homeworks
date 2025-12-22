import httpClient from "@/api/httpClient";

/**
 * Вход
 * @param email
 * @param password
 */
const login = (email: string, password: string) => {
    return httpClient.post(
        '/login',
        {
            login: email,
            password
        }
    );
}

/**
 * Выход
 */
const logout = () => {
    return httpClient.post(
        '/logout'
    );
}

/**
 * Получаем список файлов
 * @param limit
 */
const getFiles = (limit: number) => {
    return httpClient.get(
        `/list?limit=${limit}`,
    );
}

/**
 * Добавляем файл
 */
const uploadFile = (file: any, filename: string) => {
    const formData = new FormData();
    formData.append('file', file);

    return httpClient.post(
        `/file?filename=${filename}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}

/**
 * Скачиваем файл
 */
const downloadFile = (filename: string) => {
    return httpClient.get(
        `/file?filename=${filename}`,
        {
            responseType: 'blob'
        }
    );
}

/**
 * Изменяем файл
 */
const updateFile = (filename: string, fileData: any) => {
    return httpClient.put(
        `/file?filename=${filename}`,
        {
            ...fileData,
        }
    );
}

/**
 * Удаляем файл
 */
const deleteFile = (filename: string) => {
    return httpClient.delete(
        `/file?filename=${filename}`,
    );
}

export {
    login,
    logout,
    getFiles,
    uploadFile,
    downloadFile,
    updateFile,
    deleteFile
}
