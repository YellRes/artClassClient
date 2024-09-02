import { instance } from '../../utils/index';

export const login = async (params) => {
    return instance.post('/login', params)
}

// export default axios;