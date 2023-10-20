import createApiInstance from "@/config/apiInstance";
import { USER_MODULE } from "@/config/constants";

const api = createApiInstance();

export const ProfileService = {
    getUserProfile: () =>
        api.get(`${USER_MODULE}/profile/`),
    updateUserProfile: (payload: any) =>
        api.put(`${USER_MODULE}/profile/`, payload),
}
