import axios from 'axios';

const instance = axios.create({
    headers: {
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/**
 * Simple GET request using HTTP.
 * @param url addition to the base domain url to send the getRequest to.
 * @returns server's response object if response.ok, else returns void.
 * Response.ok: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
 */
export const httpGet = async (url: string, token?: string): Promise<any> => {
    if (token) instance.defaults.headers['Authorization'] = `Bearer ${token}`;

    return instance.get(`http://${url}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }

            throw new Error(`httpGet: Response status code: ${response.status} not OK.`);
        })
        .catch((err) => {
            console.error("Error in httpGet:", err);
            throw err;
        });
}

/**
 * Simple GET request using HTTPS.
 * @param url addition to the base domain url to send the getRequest to.
 * @returns server's response object if response.ok, else returns void.
 * Response.ok: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
 */
export const httpsGet = async (url: string, token?: string): Promise<void | object | any> => {
    if (token) instance.defaults.headers['Authorization'] = `Bearer ${token}`;

    return instance.get(`https://${url}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }

            throw new Error(`httpsGet: Response status code: ${response.status} not OK.`);
        })
        .catch((err) => {
            console.error("Error in httpsGet:", err);
            throw err;
        });
}

/**
 * Simple POST Request.
 * @param url The url to send the post request to.
 * @param payload The data to send to the server.
 * @returns server's response object if response.ok, else returns void.
 */
export const httpsPost = async (url: string, payload: any, token?: string): Promise<any> => {
    if (token) instance.defaults.headers['Authorization'] = `Bearer ${token}`;

    return instance.post(`https://${url}`, payload)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }

            throw new Error(`httpsPost: Response status code: ${response.status} not OK.`);
        })
        .catch((err) => {
            console.error("Error in httpsPost:", err);
            throw err;
        });
}