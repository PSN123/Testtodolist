import React, { useState, useEffect } from 'react'
import './Style.css'

//Getting data from local storage
const getData = () => {
    const list = localStorage.getItem("Items");
    if (list) {
        return JSON.parse(list);
    }
}

const Main = () => {


    const [input, setInput] = useState("");
    const [items, setItems] = useState(getData());
    const [editItems, setEditItems] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    //Adding items 
    const additem = (e) => {
        if (!input) {
            alert("Plz fill data")
        } else if (input && toggleButton) {
            setItems(
                items.map((currentElement) => {
                    if (currentElement.id === editItems) {
                        return { ...currentElement, name: input }
                    }
                    return currentElement;

                })

            );
            setInput("");
            setEditItems(null);
            setToggleButton(false);


        } else {
            const myNewInput = {
                id: new Date().getTime().toString(),
                name: input
            }
            setItems([...items, myNewInput])
            setInput('');
        }
    }

   const Handle=(event)=>{
       if(event.key === 'Enter'){
       additem();
       }
   } 

    // Edit Items 
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInput(item_todo_edited.name);
        setEditItems(index);
        setToggleButton(true);
    };

    // Deleting items

    const deleteItem = (index) => {
        const updatedItem = items.filter((currentElement) => {
            return currentElement.id !== index;
        });
        setItems(updatedItem);
    }

    //   Adding Items to LocalStorage 
    useEffect(() => {
        localStorage.setItem("Items", JSON.stringify(items))
    }, [items])

    return (
        <>
        <h1 className="heading">Todo-List</h1>
            <div className="Maindiv">
                <div className="In">
                    <input type="text" className="InputStyle" placeholder="Write your list"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={Handle}
                    />
                    {toggleButton ? (
                        <i className="fas fa-edit addbutton" onClick={additem}></i>)
                        : (
                            <i className="fas fa-plus addbutton" onClick={additem}></i>
                        )}

                    <div className="showItems">
                        {
                            items.map((current) => {
                                return (
                                    <>
                                        <div className="eachItem" key={current.id}>
                                            <h6>{current.name}</h6>
                                            <i className="fas fa-edit edit" onClick={() => editItem(current.id)}></i>
                                            <i className="fas fa-trash delete" onClick={() => deleteItem(current.id)}></i>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default Main
