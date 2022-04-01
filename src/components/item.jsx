import { useContext } from "react";
import Button from "./button";
import { AppContext } from "./StateProvider";

function Item({ itemID, title, description, completed, toggleInput }) {
  /**This manages the status of an item whether active or done mode.
   * 0 is done; 1 is active */
  // const [completed, setcompleted] = useState(completed);
  // const [itemClass, setItemClass] = useState("item");


  const { setItemToEdit, editItem } = useContext(AppContext);

  const handlecompleted = () => {
    let updatedTodo = {
      id: itemID, //required
      completed: true, //required
    };

    fetch(`https://user-manager-three.vercel.app/api/todo/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }
        editItem();
      })
      .catch((err) => {
        console.log("this error occurred when marking todo as done", err);
      });
  };

  const handleEdit = () => {
    setItemToEdit({ itemID, title, description, completed });
    toggleInput();
  };

  return (
    <div className={(completed)?"item-muted":"item"}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="quantity">{completed ? "Completed" : "Pending"}</p>
      </div>
      <div>
        {completed && (
          <div>
            <Button
              value="Edit"
              btnDisabbled="disabled"
              id={`btnEdit${itemID}`}
            />
            <Button
              value="Done"
              btnDisabbled="disabled"
              id={`btnDone${itemID}`}
            />
          </div>
        )}

        {!completed && (
          <div>
            <Button
              value="Edit"
              handleClick={handleEdit}
              id={`btnEdit${itemID}`}
            />
            <Button
              value="Done"
              handleClick={handlecompleted}
              id={`btnDone${itemID}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Item;
