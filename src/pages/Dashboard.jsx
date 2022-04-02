import AddCliente from "../components/AddClient";
import AddProveedor from "../components/AddProveedor";
import ViewShoppingList from "../components/viewShoppingList";

function Dashboard() {
  return (
    <main className="dashboard">
      <AddCliente/>
      <AddProveedor/>
      <ViewShoppingList />

    </main>
  );
}

export default Dashboard;


//      