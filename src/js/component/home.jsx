import React, { useState } from "react";




//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDo, setToDo] = useState([]);
	return (

		<div className="container">
			<h1>My To Do List</h1>

			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {

							if (e.key === "Enter") {

								setToDo(toDo.concat(inputValue));
								setInputValue("");
							}
						}}
						placeholder="What do you need to do?">
					</input>
				</li>
				{toDo.map((item, index) => (
					<li>
						{item}<i class="fas fa-times"
							onClick={() =>
								setToDo(toDo.filter(
									(t, currentIndex) =>
										index != currentIndex
								)
								)
							}></i>
					</li>
				))}

			</ul>
			<div>{toDo.length} item left</div>
		</div>

	);
};

export default Home;
