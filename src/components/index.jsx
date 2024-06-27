import accordionData from "./data";
import './styles.css';
import { useState } from "react";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMulti, setEnableMulti] = useState(false);
  const [multi, setMulti] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId===selected?null:getCurrentId);
  }

  function handleMultiSelection(getCurrentId){
       let cpyMulti = [...multi];
       const findIndexOfCurrentId = cpyMulti.indexOf(getCurrentId)

       console.log(findIndexOfCurrentId);
       if(findIndexOfCurrentId === -1) cpyMulti.push(getCurrentId)
        else cpyMulti.splice(findIndexOfCurrentId,1)

        setMulti(cpyMulti);
        console.log(cpyMulti);
        
  }

  return (
    <div className="wrapper">
        <button onClick={()=>setEnableMulti(!enableMulti)}>Enable Multi Selection</button>
      <div className="acccordion">
        {accordionData && accordionData.length > 0 ? (
          accordionData.map((dataItem) => (
            <div className="item">
              <div
                onClick={enableMulti? ()=> handleMultiSelection(dataItem.id):
                    ()=> handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h2>{dataItem.title}</h2>
              </div>
              {/* <span>+</span> */} 
              {
                enableMulti?
                multi.indexOf(dataItem.id)!==-1 && (
                    <div className="content">{dataItem.content}</div>
                )
                : selected === dataItem.id && (
                    <div className="content">
                      <h3>{dataItem.content}</h3>
                    </div>
                )
              }
              {/* {selected === dataItem.id ? (
                <div className="content">
                  <h3>{dataItem.content}</h3>
                </div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
