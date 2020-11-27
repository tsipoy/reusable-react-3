// import React, { useState, useReducer } from 'react'
// import ReactDOM from 'react-dom';
// import friendlyWords from 'friendly-words'
// let backgrounds = [
//   'Noble',
//   'Urchin',
//   'Folk Hero',
//   'Acolyte',
//   'Criminal',
//   'Hermit',
//   'Guild Artisan',
//   'Sage',
// ]
// function randomBackground() {
//   return backgrounds[Math.floor(Math.random() * backgrounds.length)]
// }
// function randomName() {
//   let array = friendlyWords.predicates
//   let string = array[Math.floor(Math.random() * array.length)]
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }
// // 1. Replace the useStates with a useReducer
// // 2. Move our useReducer into a custom hook
// function useCharacterSheetState() {
//   let [state, dispatch] = useReducer((state, action) => {
//     switch(action.type) {
//       case "SET_BACKGROUND": {
//         return { ...state, background: action.value, error: null }
//       }
//       case "NONEXISTENT_BACKGROUND": {
//         return { ...state, error: 'This background does NOT exist.' }
//       }
//       case "TOGGLE_DARK_MODE": {
//         return { ...state, darkMode: !state.darkMode }
//       }
//       case "INPUT_NAME": {
//         if (action.value.length > 15) {
//           return { ...state, name: action.name, error: 'Name is WAY too long, bucko' }
//         }
//         return { ...state, name: action.value }
//       }
//       case "DISMISS_ERROR": {
//         return { ...state, error: null }
//       }
//       case "RANDOMIZE_VALS": {
//         return { ...state, name: randomName(), background: randomBackground() }
//       }
//     }
//   }, {
//     darkMode: false,
//     name: '',
//     background: '',
//     error: null
//   })
//   return [state, dispatch]
// }
// export default function App() {
//   //let [darkMode, setDarkMode] = useState(false)
//   //let [name, setName] = useState('')
//   //let [background, setBackground] = useState('')
//   //let [error, setError] = useState(null)
//   let [{ darkMode, name, background, error }, dispatch] = useCharacterSheetState()
//   function handleBackgroundSelect(event) {
//     let value = event.target.value
//     // setBackground(value)
//     dispatch({ type: "SET_BACKGROUND", value })
//     if (!backgrounds.includes(value)) {
//       // setError('This background does NOT exist.')
//       dispatch({ type: "NONEXISTENT_BACKGROUND" })
//     }
//   }
//   return (
//     <>
//       <div className={`App ${darkMode ? 'darkmode' : ''}`}>
//         <button
//           onClick={() => {
//             // setDarkMode(!darkMode)
//             dispatch({ type: "TOGGLE_DARK_MODE" })
//           }}
//         >
//           Dark Mode {darkMode ? 'ON' : 'OFF'}
//         </button>{' '}
//         <br />
//         <input
//           type="text"
//           placeholder="Type your name"
//           value={name}
//           onChange={(event) => {
//             dispatch({ type: "INPUT_NAME", value: event.target.value })
//           }}
//         />
//         <select value={background} onChange={handleBackgroundSelect}>
//           {backgrounds.map((b) => {
//             return <option key={`bg-${b}`}>{b}</option>
//           })}
//         </select>
//         {error && (
//           <div className="error">
//             {error}
//             <button
//               onClick={() => {
//                 // setError(null)
//                 dispatch({ type: "DISMISS_ERROR" })
//               }}
//             >
//               Dismiss
//             </button>
//           </div>
//         )}
//         <div className="sheet">
//           <h3>Name: {name}</h3>
//           <h3>Background: {background}</h3>
//         </div>
//         <button
//           onClick={() => {
//             dispatch({ type: "RANDOMIZE_VALS" })
//             // setName(randomName())
//             // setBackground(randomBackground())
//           }}
//         >
//           Do it all for me instead
//         </button>
//       </div>
//     </>
//   )
// }
// ReactDOM.render(<App />, document.getElementById('root'));

import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import friendlyWords from "friendly-words";

// 1. Replace the useStates with a useReducer
// 2. Move our useReducer into a custom hook

let backgrounds = [
  "Noble",
  "Urchin",
  "Folk Hero",
  "Acolyte",
  "Criminal",
  "Hermit",
  "Guild Artisan",
  "Sage",
];
function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}
function randomName() {
  let array = friendlyWords.predicates;
  let string = array[Math.floor(Math.random() * array.length)];
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function useCharacterSheet() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "DARK_MODE":
          return { ...state, darkMode: !state.darkMode };
          break;
        case "SET_NAME":
          return { ...state, name: action.name };
          break;
        case "SET_ERROR":
          return { ...state, error: action.error };
          break;
        case "SET_BACKGROUND":
          return { ...state, background: action.value };
          break;
        case "RANDOMISE_VAL":
          return { ...state, name: randomName(), background: randomBackground() }
        default:
          return state;
      }
    },
    {
      darkMode: false,
      name: "",
      background: "",
      error: null,
    }
  );
  return [state, dispatch];
}

export default function App() {
  const [state, dispatch] = useCharacterSheet();
  const { darkMode, name, background, error } = state;

  const switchMode = () => {
    dispatch({ type: "DARK_MODE" });
  };

  function handleBackgroundSelect(event) {
    let value = event.target.value;
    dispatch({ type: "SET_BACKGROUND", value });
    if (!backgrounds.includes(value)) {
      dispatch({ type: "SET_ERROR", error: "This background does NOT exist." });
      // setError('This background does NOT exist.')
    } else {
      dispatch({ type: "SET_ERROR", error: null });
      // setError(null)
    }
  }

  return (
    <>
      <div className={`App ${darkMode ? "darkmode" : ""}`}>
        <button onClick={switchMode}>
          Dark Mode {darkMode ? "ON" : "OFF"}
        </button>{" "}
        <br />
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(event) => {
            dispatch({ type: "SET_NAME", name: event.target.value });
            if (event.target.value.length > 15) {
              dispatch({
                type: "SET_ERROR",
                error: "Name is WAY too long, bucko.",
              });
            }
          }}
        />
        <select value={background} onChange={handleBackgroundSelect}>
          {backgrounds.map((b) => {
            return <option key={`bg-${b}`}>{b}</option>;
          })}
        </select>
        {error && (
          <div className="error">
            {error}
            <button
              onClick={() => {
                dispatch({ type: "SET_ERROR", error: null });
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="sheet">
          <h3>Name: {name}</h3>
          <h3>Background: {background}</h3>
        </div>
        <button onClick={() => {
          dispatch({ type: "RANDOMISE_VAL" })}
        } 
        // setName(randomName())      
        // setBackground(randomBackground())
        >
          Do it all for me instead
        </button>
      </div>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

// useAuth HOOK that you can reuse in your futur projects :wink:

// import React, { useEffect, useReducer, useState } from 'react';
// import ReactDOM from 'react-dom';
// /*
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json))
// */
// function useAuth(ENDPOINT_URL) {
//     let [state, dispatch] = a((state, action) => {
//     switch(action.type) {
//       case 'LOADING': {
//         return { ...state, loading: true }
//       }
//       case 'RESOLVED': {
//         return {
//           ...state,
//           loading: false,
//           response: action.response,
//           error: null
//         }
//       }
//       case 'ERROR': {
//         return {
//           ...state,
//           loading: false,
//           response: null,
//           error: action.error
//         }
//       }
//       default:
//         return state
//     }
//   }, {
//     loading: false,
//     response: null,
//     error: null
//   })
//   useEffect(() => {
//     let isCurrent = true
//     dispatch({ type: "LOADING" })
//     fetch(ENDPOINT_URL)
//       .then(response => response.json())
//       .then(json => {
//         if (isCurrent) {
//           dispatch({ type: "RESOLVED", response: json })
//         }
//       }).catch(error => {
//         dispatch({ type: "ERROR", error })
//       })
//     return () => {
//       isCurrent = false
//     }
//   }, [])
//   return [state.loading, state.response, state.error]
// }
// const App = () => {
//   let [ loading, response, error ] = useAuth('https://jsonplaceholder.typicode.com/todos/1')
//   return (
//     <section>
//       <h2>Get User Data</h2>
//       <div className="user">
//         { loading && <div>Loading...</div> }
//         { error && <div className="error">ERROR OH NO</div> }
//         { response && <>
//           User ID: {response.id} <br />
//           User Title: {response.title}
//         </>}
//       </div>
//     </section>
//   )
// }
// ReactDOM.render(<App />, document.getElementById('root'));
