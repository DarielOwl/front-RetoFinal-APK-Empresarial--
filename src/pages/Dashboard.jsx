import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AppContext} from './../components/StateProvider';

import ViewShoppingList from "../components/viewShoppingList";
import AddItemForm from "../components/addItemForm";


function Dashboard() {
  const history =useHistory();
  const { state } = useContext(AppContext);
  return (
    <main className="dashboard">
       {!state.isLoggedIn? history.replace("/home"):""}
      <AddItemForm />
      <ViewShoppingList />
    </main>
  );
}

export default Dashboard;
