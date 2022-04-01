/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AppContext = createContext();

const initialState = {
  isLoggedIn: false,
};

export default function StateProvider({ children }) {
  const [appData, setAppData] = useState(initialState);
  const [showItemForm, setItemFormShow] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [list, setList] = useState([]);
  const paths = ["/login", "/register"];
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function handleSetCookie(data) {
    setCookie("user", data, { path: "/" });
  }

  function handleRemoveCookie() {
    removeCookie("user");
  }

  const toggleShow = () => {
    setItemFormShow(!showItemForm);
  };

  const addListItem = (item) => {
    let lastIndex = list.length;
    item.index = lastIndex;
    setList([...list, item]);
  };

  const handleGetTodo=()=>{
    fetch(
      `https://user-manager-three.vercel.app/api/todo?userId=${cookies.user.id}`
    )
      .then((res) => res.json())
      .then((result) => {
        if(result.error){
          console.log("Error fetching todos",result.message);
          return true;
        }
        setList(result.body);
      })
      .catch((err) => {
        console.log("this error occurred when fetching todos", err);
      });
    
  }

  const editItem = () => {
    handleGetTodo();
  };

  useEffect(() => {
    if (appData.isLoggedIn) {
      handleGetTodo();
    }
  }, [appData]);

  return (
    <AppContext.Provider
      value={{
        state: appData,
        setState: setAppData,
        showItemForm,
        toggleShow,
        cookies,
        handleSetCookie,
        handleRemoveCookie,
        paths,
        itemToEdit,
        setItemToEdit,
        list,
        setList,
        addListItem,
        editItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
