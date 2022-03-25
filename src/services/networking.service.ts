import {Name, Order, Service} from 'react-soa';
import {HttpRequest, HttpResponse, NetworkingLayer} from 'netlayer';

@Service
@Order(-5000)
export class NetworkingService extends NetworkingLayer {
    baseUrl = 'http://localhost:5000/api';
    timeout = 5000;
    internetDelay = 40;
    defaultDriver = async (request: HttpRequest): Promise<HttpResponse> => {
        let payload = request.payload;
        const headers = request.headers;
        if (headers['content-type'] === 'multipart/form-data') {
            delete headers['content-type'];
        } else if (!headers['content-type']) {
            headers['content-type'] = 'application/json';
            payload = JSON.stringify(request.payload);
        }
        if (request.method === 'DELETE' || request.method === 'GET') {
            payload = undefined;
        }
        const response = await fetch(this.baseUrl + request.url, {
            method: request.method,
            headers,
            redirect: 'follow',
            body: payload,
        });
        const obj = {
            status: response.status,
            statusText: response.statusText,
            payload: await response.json(),
        };
        if (response.status >= 400) {
            throw obj;
        }
        return obj;
    };
    driver = this.defaultDriver;
}
