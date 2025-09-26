import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();

  const [isUser, setIsUser] = useState();
  const [isPartner, setIsPartner] = useState();

  const [user, setUser] = useState();
  const [partner, setPartner] = useState();
  const [isNavbar, setIsNavbar] = useState(false);

  const [partnerId, setPartnerId] = useState(null);
  const value = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    address,
    setAddress,
    phone,
    setPhone,
    isPartner,
    setIsPartner,
    isUser,
    setIsUser,
    partner,
    setPartner,
    user,
    setUser,
    partnerId,
    isNavbar,
    setIsNavbar,
    setPartnerId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
