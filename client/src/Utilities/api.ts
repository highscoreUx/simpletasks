import axios from "axios";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const api = axios.create({ baseURL: baseUrl });

export const signUpUser = async (obj: object) => {
	try {
		const { data } = await api.post("/auth/signup", obj);
		return data;
	} catch (error: any) {
		throw new Error(error?.response?.data?.msg);
	}
};

export const loginUser = async (obj: object) => {
	try {
		const { data } = await api.post("/auth/login", obj);
		return data;
	} catch (error: any) {
		throw new Error(error?.response?.data?.msg);
	}
};
