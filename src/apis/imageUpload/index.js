import instance from "../../utils/axios";

export const imageUpload = async (params) => instance.post('/images/upload', params);

export const getAllImages = async () => {
    return instance.get('/images');
}

export const getImageList = async () => {
    return instance.get('/images/list');
}
