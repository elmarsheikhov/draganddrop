import React from "react";
import "./Home.css";
const Home = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [state, setState] = React.useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      teams: [
        "Real Madrid",
        "Barcelona",
        "Valencia",
        "Sevilla",
        "Manchester City",
        "Milan",
        "PSG",
        "Borussia Dortmund",
        "Arsenal",
        "Karabakh",
        "Chelsea",
        "Manchester United",
        "Osasuna",
        "Tottenham",
        "Liverpool",
        "Fiorentina",
      ],
      group_A: [],
      group_B: [],
      group_C: [],
      group_D: [],
    }
  );

  // const [dragging, setDragging] = React.useState(false);
  // const [draggedItem, setDraggedItem] = React.useState(null);

  const handleDragStart = (e, item) => {
    // setDragging(true);
    // setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event, groupKey) => {
    event.preventDefault();
    // setDragging(false);
    // setDraggedItem(null);
    const droppedItem = event.dataTransfer.getData("text/plain");
    if (state[groupKey].length < 4) {
      setState({
        [groupKey]: [...state[groupKey], droppedItem],
        teams: state.teams.filter((team) => team !== droppedItem),
      });
    } else {
      setShowAlert(true);
    }
  };

  // console.log(state);

  return (
    <div className="main">
      <h1>Champions League</h1>

      <div className=" container">
        <div className="left_block">
          <div className="clubs">
            <span>Teams</span>
            {state.teams.map((item, key) => (
              <div
                key={key}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="right_block">
          {Object.keys(state).map((groupKey) => {
            if (groupKey !== "teams") {
              return (
                <div
                  className="groups"
                  key={groupKey}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, groupKey)}
                >
                  <span>{groupKey.toUpperCase()}</span>
                  {state[groupKey].map((item, key) => (
                    <div key={key}>{item}</div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
