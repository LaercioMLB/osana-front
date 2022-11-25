import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export const UserContext = createContext([{}, () => {}]);

export function UserContextProvider(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    isGestor: false,
    user: {}
  });

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
  };

  async function buscarDadosUsuario(){
    console.log("atualizado dados do usuario")
    await api.get(`/users/filterByUsername?username=${localStorage.getItem('username').replace(" ", "%20")}`, config)
      .then((response) => setUserData({ isGestor: response.data.roles[0].authority === 'ROLE_GESTOR', user: response.data }))
      .catch((error) => {
          if (error.response.status === 403){
            localStorage.clear()
            setUserData({
              isGestor: false,
              user: {}
            })
            navigate("/login")
          }else{
            toast.error(error.response.data.message)
          }
        }
      );
  }

  useEffect(()=>{
    if (localStorage.getItem('username')){
      buscarDadosUsuario();
    }
  },[])

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      <ToastContainer />
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
