import React from "react";
import { ClipLoader } from "react-spinners";

interface Iloader {
	size?: number;
}

const Loader: React.FC<Iloader> = ({ size = 15 }) => {
	return <ClipLoader color={"242424"} size={size} />;
};

export default Loader;
