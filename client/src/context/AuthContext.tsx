import { createContext, useContext } from "react";

interface IContext {
	children: React.ReactNode;
}

const AuthContext = createContext(null);
const AuthContextProvider: React.FC<IContext> = ({ children }) => {
	return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => {
	return useContext(AuthContext);
};
