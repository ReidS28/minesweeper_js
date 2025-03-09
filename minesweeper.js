class Minesweeper {
	constructor(rows, cols, percent) {
		if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
			throw new TypeError("rows and cols must be integers.");
		}

		if (typeof percent !== "number" || percent < 0 || percent > 1) {
			throw new RangeError("percent must be a number between 0 and 1.");
		}

		this.rows = rows;
		this.cols = cols;
		this.numMines = Math.floor((this.rows * this.cols) * percent);
        this.mines = create2DArray(this.rows, this.cols, false);
        this.flags = create2DArray(this.rows, this.cols, false);
        this.numSurrounding = create2DArray(this.rows, this.cols, 0);

        this.fillBoard();

	}

    fillBoard(){
        this.mines = create2DArray(this.rows, this.cols, false);
        for (let i = 0; i < this.numMines; i++){
            for (let i = 0; i < 10; i++){
                let row = Math.floor(Math.random() * this.rows);
                let col = Math.floor(Math.random() * this.cols);
                if(!this.mines[row][col]){
                    this.mines[row][col] = true;
                    break;
                }
            }
        }
    }   

    fillnumSurrounding(){
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                if (!this.mines[r][c]) {
                    this.numSurrounding[r][c] = this.getNumSurrounding(r, c);
                } else {
                    this.numSurrounding[r][c] = -1;
                }
            }
        }
    }

    getNumSurrounding(row, col){
        if (this.mines[row][col]){
            throw new RangeError("selected tile is a mine");
        } 
        let count = 0;
        for(let r = row - 1; r <= row + 1; r++){
            for(let c = row - 1; c <= row + 1; c++){
                try{
                    if(this.mines[r][c]) count++;
                }catch(err){
                }
            }
        }
        console.log(count);
        return count;
    }
}

function create2DArray(rows, cols, initialValue = 0) {
    return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}