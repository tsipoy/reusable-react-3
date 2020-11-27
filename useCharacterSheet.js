// import { useReducer } from "./index";

// export default function useCharacterSheet() {
    
//   const [state, dispatch] = useReducer(
//     (state, action) => {
//       switch (action.type) {
//         case "DARK_MODE":
//           return { ...state, darkMode: !state.darkMode };
//           break;
//         case "SET_NAME":
//           return { ...state, name: action.name };
//           break;
//         case "SET_ERROR":
//           return { ...state, error: action.error };
//           break;
//         case "SET_BACKGROUND":
//           return { ...state, background: action.value };
//           break;
//         case "RANDOMISE_VAL":
//             return{ ...state, name: randomName(), background: randomBackground()}
//         default:
//           return state;
//       }
//     },
//     {
//       darkMode: false,
//       name: "",
//       background: "",
//       error: null,
//     }
//   );
//   return [state, dispatch];
// }
