import { Container, Row, Col, Toast, Form, Button } from "react-bootstrap";
import { AppContext } from "./StateProvider";
import { useCookies } from "react-cookie";
import { useContext, useState, useEffect, useRef } from "react";

function AddItemForm() {
  const {
    showItemForm,
    toggleShow,
    itemToEdit,
    setItemToEdit,
    addListItem,
    editItem,
  } = useContext(AppContext);

  //Current form value state
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [editMode, setEditMode] = useState(false);
  const [descInputError, setDescInputError] = useState("");
  const [cookies] = useCookies(["user"]);

  const titleRef = useRef();
  const qtyRef = useRef();
  const descRef = useRef();

  // Handle item to edit with use effect
  useEffect(() => {
    if (Object.keys(itemToEdit).length) {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setEditMode(true);
    }
  }, [itemToEdit]);

  const submitHandler = (e) => {
    //Gaurd for inputs
    e.preventDefault();

    // Edit item
    if (editMode) {
      let updatedTodo = {
        id: itemToEdit.itemID, //required
        completed: itemToEdit.completed, //required
        description: descRef.current.value,
      };

      fetch(`https://user-manager-three.vercel.app/api/todo/update`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      })
        .then((res) => res.json())
        .then(async (result) => {
          if(result.error){
            return alert(result.message);
          }
          setItemToEdit({});
          await editItem();
          await setEditMode(false);
          await toggleShow();
          
        })
        .catch((err) => {
          console.log("this error occurred", err);
        });

      //Reset form
      setTitle();
      setQuantity();
      setDescription();
      return true;
    }


    if (titleRef.current.value.trim().length < 3) {
      setDescInputError(`Todo title must be 3 letter above`);
      return false;
    }

    let newtodo = {
      userId: cookies.user.id, //required
      completed: false, //required
      title: titleRef.current.value, //required
    };

    if (descRef.current.value && descRef.current.value.trim()) {
      newtodo.description = descRef.current.value;
    }
    if (parseInt(qtyRef.current.value)) {
      newtodo.order = qtyRef.current.value;
    }

    // console.log(newtodo);

    fetch(`https://user-manager-three.vercel.app/api/todo/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newtodo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        addListItem({ ...newtodo });
        toggleShow();
        //Reset form
        setTitle();
        setQuantity();
        setDescription();
      })
      .catch((err) => {
        console.log("this error occurred", err);
        alert(err.message);
      });
  };

  return (
    <Container className="mt-5">
      <Row
        id="addItem"
        className="d-flex justify-content-center align-items-center mt-5"
        noGutters
      >
        <Col sm={8}>
          <Toast
            className="myForm mt-5"
            show={showItemForm}
            onClose={toggleShow}
          >
            <Toast.Header>
              <h2>
                <strong className="mr-auto">Add TODO</strong>
              </h2>
              <hr />
            </Toast.Header>

            <Toast.Body>
              <Form onSubmit={submitHandler}>
                <Form.Row>
                  <Form.Group as={Col} md={6} sm={12}>
                    <Form.Label>Item Title</Form.Label>
                    
                    {!(editMode) && (
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      id="title"
                      name="title"
                      required
                      autoComplete="off"
                      value={title}
                      ref={titleRef}
                    />
                    )}
                    
                    {(editMode) && (
                    <Form.Control
                      type="text"
                      id="title"
                      name="title"
                      plaintext
                      readOnly
                      defaultValue={title}
                      ref={titleRef}
                    />
                    )}
                  </Form.Group>
                  {!(editMode) && (
                  <Form.Group as={Col} md={6} sm={12}>
                  
                    <Form.Label>Order</Form.Label>
                    <Form.Control
                      placeholder="e.g 2"
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      ref={qtyRef}
                    />
                  </Form.Group>
                  )}
                </Form.Row>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Cooking for the week"
                    id="description"
                    name="description"
                    defaultValue={description}
                    ref={descRef}
                  />
                </Form.Group>
                <span id="descriptionError" className="error">
                  {descInputError}
                </span>
                <Button variant="success" type="submit">
                  <i className="fas fa-plus icon" arial-hidden="true"></i>
                </Button>
              </Form>
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
}

export default AddItemForm;
