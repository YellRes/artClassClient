import instance from "../../utils/axios";

export const createUserCourse = async (params) => {
    return instance.post('/course/create', params);
}

export const getCourses = async () => {
    return instance.get('course/list');
}
