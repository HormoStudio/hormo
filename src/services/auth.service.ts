import { IService, observable, Order, pick, Service, wired } from "react-soa";
import { persisted } from "react-soa/dist/snapshot";
import { NetworkingService } from 'services/networking.service';

interface IUser {
    id: string;
    mobile: string;
    name: string;
    partyType: number;
}

@Service
@Order(-4800)
export class AuthService extends IService {
    @wired networking = pick(NetworkingService);
    @persisted @observable user: IUser = null;
    @persisted accessToken: string = null;

    hasAuthorized() {
        return !!this.user;
    }

    async applicationLoaded() {
        try {
            this.user = await this.authorize();
        } catch (e) {
            this.user = null;
            this.accessToken = null;
        }
        this.registerHTTPMiddleware(this.accessToken);
    }

    get defaultHeaders() {
        return {
            'Token': this.accessToken ? this.accessToken : ''
        }
    }

    login = async (email: string, password: string) => {
		// change the type of response REQUEST<{...HERE...}>
		// change the parameters
        const response = await this.networking.REQUEST<{
            token: string;
        }>({
            url: '/api/login',
            method: 'POST',
            headers: {
                ...this.defaultHeaders,
            },
            payload: {
                email,
                password,
            },
        });
        const {token} = response.payload;
        this.accessToken = token;
        const user = await this.authorize();
        this.registerHTTPMiddleware(token);
        this.user = user;
    };

    async logout() {
        this.user = null;
        this.accessToken = null;
        this.registerHTTPMiddleware(null);
    }

    authorize = async () => {
		// get the user information here
        const response = await this.networking.REQUEST<IUser>({
            url: '/identity/info',
            method: 'GET',
            headers: {
                ...this.defaultHeaders,
            },
        });
        return response.payload;
    };

    registerHTTPMiddleware = (token: string = null) => {
        this.networking.MIDDLEWARE('auth', (request) => ({
            ...request,
            headers: {
                ...this.defaultHeaders,
                'Token': token ? token : '',
                ...request.headers,
            },
        }));
	};
}
