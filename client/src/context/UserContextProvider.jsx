import { useState } from "react";
import UserContext from "./UserContext";

export const UserContextProvider = ({children}) => {
    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(storedUser));

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};