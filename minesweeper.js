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
		this.numSurrounding = create2DArray(this.rows, this.cols, 0);

		this.fillBoard();
		this.createBoardObject();
	}

	createBoardObject() {
		const container = document.getElementById(this.divID);
		container.innerHTML = ""; // Clear any existing content

		for (let r = 0; r < this.rows; r++) {
			const rowDiv = document.createElement("div");
			rowDiv.classList.add("row");

			for (let c = 0; c < this.cols; c++) {
				const cellDiv = document.createElement("div");
				cellDiv.classList.add("cell");

				cellDiv.setAttribute("data-row", r);
				cellDiv.setAttribute("data-col", c);

				// Add click event listener
				cellDiv.addEventListener("click", () => {
					this.cellClicked(cellDiv, r, c);
				});

				rowDiv.appendChild(cellDiv);
			}

			container.appendChild(rowDiv);
		}
	}

	cellClicked(cellDiv, r, c) {
		const numberToDisplay = this.numSurrounding[r][c];
		cellDiv.innerHTML = numberToDisplay;
        cellDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';

        if (numberToDisplay === 0) {
            cellDiv.style.color = 'rgba(0, 0, 0, 0)';
        } else if (numberToDisplay === 1) {
            cellDiv.style.color = 'rgb(8, 0, 61)';  // Color for number 1
        } else if (numberToDisplay === 2) {
            cellDiv.style.color = 'rgb(0, 84, 6)';  // Color for number 2
        } else if (numberToDisplay === 3) {
            cellDiv.style.color = 'rgb(0, 0, 0)';  // Color for number 3
        } else if (numberToDisplay === 4) {
            cellDiv.style.color = 'rgb(0, 0, 0)';  // Color for number 4
        } else if (numberToDisplay === 5) {
            cellDiv.style.color = 'rgb(0, 0, 0)';  // Color for number 5
        } else if (numberToDisplay === 6) {
            cellDiv.style.color = 'rgb(0, 0, 0)';  // Color for number 6
        } else if (numberToDisplay === 7) {
            cellDiv.style.color = 'rgb(0, 0, 0)';  // Color for number 7
        } else if (numberToDisplay === 8) {
            cellDiv.style.color = 'rgb(0, 0, 0)';  // Color for number 8
        } else {
            cellDiv.style.color = 'white';  // Color for other numbers
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

		console.log(count);
		return count;
	}

	print() {
		for (const element of this.mines) {
			console.log(element.toString());
		}
		for (const element of this.numSurrounding) {
			console.log(element.toString());
		}
	}
}

function create2DArray(rows, cols, initialValue = 0) {
	return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}
