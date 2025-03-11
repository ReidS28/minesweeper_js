class Minesweeper {
	constructor(divID, rows, cols, percent) {
		if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
			throw new TypeError("rows and cols must be integers.");
		}

		if (typeof percent !== "number" || percent < 0 || percent > 1) {
			throw new RangeError("percent must be a number between 0 and 1.");
		}

		this.divID = divID;
		this.rows = rows;
		this.cols = cols;
		this.numMines = Math.floor(this.rows * this.cols * percent);
		this.mines = create2DArray(this.rows, this.cols, false);
		this.flags = create2DArray(this.rows, this.cols, false);
		this.uncovered = create2DArray(this.rows, this.cols, false);
		this.numSurrounding = create2DArray(this.rows, this.cols, 0);

		this.fillBoard();
		this.createBoardObject();
	}

	createBoardObject() {
		const container = document.getElementById(this.divID);
	
		// Set dynamic grid size based on rows/cols
		container.style.setProperty('--rows', this.rows);
		container.style.setProperty('--cols', this.cols);
	
		container.innerHTML = "";
	
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				const cellDiv = document.createElement("div");
				cellDiv.classList.add("cell");
	
				cellDiv.setAttribute("data-row", r);
				cellDiv.setAttribute("data-col", c);
	
				// Add click event listener
				cellDiv.addEventListener("click", () => {
					this.uncoverCell(r, c);
				});
	
				container.appendChild(cellDiv);
			}
		}
	}	

	uncoverCell(r, c) {
		if (this.uncovered[r][c]) return; // Prevent uncovering already uncovered cells
	
		this.uncovered[r][c] = true;
		const cellDiv = document.querySelector(
			`[data-row="${r}"][data-col="${c}"]`
		);
	
		const numberToDisplay = this.numSurrounding[r][c];
		cellDiv.innerHTML = numberToDisplay;
	
		// Add pop effect
		cellDiv.classList.add('pop');
		setTimeout(() => cellDiv.classList.remove('pop'), 200); // Remove after animation
	
		// Make cell transparent
		cellDiv.style.backgroundColor = "rgba(0, 0, 0, 0)";
	
		const colors = {
			"-1": "#f01313",
			0: "rgba(0, 0, 0, 0)",
			1: "#221ddb",
			2: "#017d00",
			3: "#fa0103",
			4: "#1f0eb3",
			5: "#820200",
			6: "#00807f",
			7: "#9403fc",
			8: "#c90caa",
		};
	
		cellDiv.style.color = colors[numberToDisplay] || "white";
	
		if (numberToDisplay === -1) {
			cellDiv.innerHTML = "💣";
		}
	
		// If tile is 0, uncover all surrounding cells
		//if (numberToDisplay == 0) {
		if (true) {
			for (let row = r - 1; row <= r + 1; row++) {
				for (let col = c - 1; col <= c + 1; col++) {
					if (
						row >= 0 &&
						row < this.rows &&
						col >= 0 &&
						col < this.cols &&
						!(row == r && col == c)
					) {
						setTimeout(() => this.uncoverCell(row, col), 40);
					}
				}
			}
		}
	}
	

	fillBoard() {
		this.mines = create2DArray(this.rows, this.cols, false);
		for (let i = 0; i < this.numMines; i++) {
			for (let i = 0; i < 10; i++) {
				let row = Math.floor(Math.random() * this.rows);
				let col = Math.floor(Math.random() * this.cols);
				if (!this.mines[row][col]) {
					this.mines[row][col] = true;
					break;
				}
			}
		}
	}

	fillnumSurrounding() {
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				if (!this.mines[r][c]) {
					this.numSurrounding[r][c] = this.getNumSurrounding(r, c);
				} else {
					this.numSurrounding[r][c] = -1;
				}
			}
		}
	}

	getNumSurrounding(row, col) {
		if (this.mines[row][col]) {
			throw new RangeError("Selected tile is a mine");
		}

		let count = 0;
		for (let r = row - 1; r <= row + 1; r++) {
			for (let c = col - 1; c <= col + 1; c++) {
				if (
					r >= 0 &&
					r < this.rows && // Row is within bounds
					c >= 0 &&
					c < this.cols && // Column is within bounds
					this.mines[r][c] // Check for mine
				) {
					count++;
				}
			}
		}

		return count;
	}
}

function create2DArray(rows, cols, initialValue = 0) {
	return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}
