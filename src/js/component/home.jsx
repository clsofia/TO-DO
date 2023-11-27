import React, { useState, useEffect } from "react";




//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDo, setToDo] = useState([]);
	const Url = 'https://playground.4geeks.com/apis/fake/todos/user/clsofia'
	useEffect(() => {
		createUser()
		fetch(Url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				}
			})
			.then(data => {
				//here is where your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
				if (data) {
					setToDo(data)
				}
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, []
	)

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			const item = { "label": inputValue, "done": false }
			const newList = toDo.concat(item)
			setToDo(newList);
			setInputValue("");
			updateServer(newList)
		}
	}

	const handleClick = (index) => {
		const newList = toDo.filter(
			(t, currentIndex) =>
				index != currentIndex)
		setToDo(newList)
		updateServer(newList)
	}

	const updateServer = (item) => {

		fetch(Url, {
			method: "PUT",
			body: JSON.stringify(item),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is where your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});

	}

	const createUser = () => {
		fetch(Url, {
			method: "POST",
			body: JSON.stringify(toDo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is where your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});

	}


	return (

		<div className="container">
			<h1>My To Do List</h1>

			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={handleKeyPress}
						placeholder="What do you need to do?">
					</input>
				</li>
				{toDo.map((item, index) => (
					<li>
						{item.label}<i class="fas fa-times"
							onClick={() => handleClick(index)}></i>
					</li>
				))}

			</ul>
			<div>{toDo.length} item left</div>
		</div>

	);
};

export default Home;
