import { createContext, useContext, useState } from "react";
import { AuthContext } from "../context/auth";

export const useAuth = () => {
    return useContext(AuthContext);
};

