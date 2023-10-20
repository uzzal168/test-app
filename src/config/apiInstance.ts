import { getItem } from "@/services/localStorage.service";
import { ACCESS_TOKEN } from "./constants";
import { ToastService } from "@/utils/toast.service";
import { useContext } from 'react';


const apiUrl = 'https://eservice.vemate.com/api/v1';

const createApiInstance = () => {

    const accessToken = getItem(ACCESS_TOKEN) || null

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? `Token ${accessToken}` : ""
    };

    return {
        get: (endpoint: string) => {
            return fetch(`${apiUrl}/${endpoint}`, {
                method: 'GET',
                headers,
            }).then((response) => response.json()).catch(() => ToastService.error('Something went wrong'));
        },

        post: (endpoint: string, data: any) => {
            return fetch(`${apiUrl}/${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            }).then((response) => response.json()).catch(() => ToastService.error('Something went wrong'));
        },

        put: (endpoint: string, data: any) => {
            return fetch(`${apiUrl}/${endpoint}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(data),
            }).then((response) => response.json()).catch(() => ToastService.error('Something went wrong'));
        },

    };
}

export default createApiInstance