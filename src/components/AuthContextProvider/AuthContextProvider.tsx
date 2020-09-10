import React, {useState} from "react";

export const AuthContext = React.createContext({
  val: ["", 0],
  toggleAuth: undefined as any,
});
let AuthContextProvider = (props: any) => {
  let type = sessionStorage.getItem("type") || "";
  let id = Number(sessionStorage.getItem("id") || 0);
  let [val, setVal] = useState([type, id]);
  return (
      <AuthContext.Provider
          value={{
            val,
            toggleAuth: (prop: Array<string | number>) => {
              setVal(prop);
              alert(`Logged in as ${prop[0]} with id ${prop[1]}`);
              sessionStorage.setItem("type", String(prop[0]));
              sessionStorage.setItem("id", String(prop[1]));
            },
          }}
      >
        {props.children}
      </AuthContext.Provider>
  );
};
export default AuthContextProvider;
