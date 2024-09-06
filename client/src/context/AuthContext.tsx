import { createContext, useContext, useEffect, useState } from "react";

interface IContext {
	children: React.ReactNode;
}

interface IUser {
	id: string;
	role: "admin" | "user";
}

interface IAuthContext {
	accessToken: string | null;
	setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
	user: IUser | null;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
	setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
	isLoggedin: boolean;
}

const AuthContext = createContext<IAuthContext>({
	accessToken: null,
	setAccessToken: () => {},
	user: null,
	setUser: () => {},
	setIsLoggedin: () => {},
	isLoggedin: false,
});
const AuthContextProvider: React.FC<IContext> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<null | string>(null);
	const [user, setUser] = useState<IUser | null>(() => {
		const stringUser = localStorage.getItem("user");
		return stringUser ? JSON.parse(stringUser) : null;
	});
	const [isLoggedin, setIsLoggedin] = useState<boolean>(!!user);

	useEffect(() => {
		setIsLoggedin(!!user);
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				setAccessToken,
				user,
				setUser,
				setIsLoggedin,
				isLoggedin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => {
	return useContext(AuthContext);
};
