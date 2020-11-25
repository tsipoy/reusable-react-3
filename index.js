import React, { useState, useRef, forwardRef, useEffect, createElement } from 'react';
import ReactDOM from 'react-dom';

let initialState = { count: 0, cake: true }

let actions = [
	{ type: 'ADD', by: 2 },
	{ type: 'MINUS', by: 4 },
	{ type: 'ADD', by: 10 },
	{ type: 'EAT_CAKE' }
]
function reducer(state, action) {
	switch(action.type) {
		case "ADD":
			return {...state, count: state.count + action.by};
			break;
		case "MINUS":
			return {...state, count:state.count - action.by};
			break;
		case "EAT_CAKE":
			return {...state, cake: false};
			break;
			default:
				return state;
	}
}
  console.log(actions.reduce(reducer, initialState))

// Overall, you want to be able to switch between forms.
// 1) Turn the Login/Signup forms into controlled components
// 2) Make just one form show up at a time
// 3) Make the buttons toggle which component is rendered
// 4) Forward the ref from the ToggleableForm to the components
// 5) Make a form's first input toggled when it is active using a side effect

const App = () => {
	let data = [
		{ name: 'Log in', component: LoginForm },
		{ name: 'Sign up', component: SignupForm },
	];
	return (
		<section>
			<h2>Log in / Sign up</h2>
			<ToggleableForm options={data} />
		</section>
	);
};

const ToggleableForm = ({ options }) => {
	// const currentForm = 1; // Change this to 1 to get the Signup form to show up
	const [currentForm, setCurrentForm] = useState(0);
	let focusRef = useRef(null);

	// function toggleForm(index) {
	// 	setCurrentForm(index)
	// }

	return (
		<>
			{options.map((el, index) => {
				return <ButtonToggle 
						key={`button${index}`} 
						toggleForm={() => setCurrentForm(index)} index={index}>{el.name}</ButtonToggle>;
			})}
			<FormToggle currentIndex={currentForm}>
				{options.map((el, index) => {
					return (
						<div key={`form${index}`}>
							{createElement(el.component, {
								ref: focusRef
								/* Hmm, what should go here?*/
							})}
						</div>
					);
				})}
			</FormToggle>
		</>
	);
};

const ButtonToggle = ({ children, toggleRef, toggleForm, index }) => {
	return (
		<button
			onClick={() => {
				toggleForm()
				// Hmm, things should happen here
			}}
		>
			{children}
		</button>
	);
};

const FormToggle = ({ children, currentIndex }) => {
	if (Array.isArray(children)) {
		return <div>{children[currentIndex]}</div>;
		// Remember, `children` is an array when there's multiple!
		// So, if you want to show all the forms, you just put
		// `children`.
		// What would you do if you just wanted to show one?
	}
	return null;
};

const LoginForm = forwardRef((props, ref) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		ref.current.focus()
	}, [])

	return (
		<>
			<input 
				type="text" 
				ref={ref}
				value={username}
				onChange={(e) => setUsername(e.target.value)} 
				placeholder="Username" 
			/>
			<input 
				type="password" 
				value={password}
				onChange={(e) => setPassword(e.target.value)} 
				placeholder="Password" 
			/>
			<button>Submit</button>
		</>
	);
});

const SignupForm = forwardRef((props, ref) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		ref.current.focus()
	}, [])

	return (
		<>
			<input 
				type="email" 
				ref={ref}
				value={email} 
				onChange={(e) => setEmail(e.target.value)} 
				placeholder="Email" 
			/>
			<input 
				type="text" 
				value={username} 
				onChange={(e) => setUsername(e.target.value)} 
				placeholder="Username" 
			/>
			<input 
				type="password" 
				value={password} 
				onChange={(e) => setPassword(e.target.value)} 
				placeholder="Password" 
			/>
			<button>Submit</button>
		</>
	);
});



ReactDOM.render(<App />, document.getElementById('root'));
