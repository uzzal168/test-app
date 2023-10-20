import createApiInstance from "@/config/apiInstance";
import { USER_MODULE } from "@/config/constants";

const api = createApiInstance();

export const AuthService = {
    signin: (payload: any) =>
        api.post(`${USER_MODULE}/signin/`, payload),
}
