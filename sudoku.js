document.addEventListener('DOMContentLoaded', createGrid);


function createGrid(){

    for(let i = 0; i < 9; i++){
        const new_tr = document.createElement('tr');
        new_tr.classList.add('row');
        for(let j = 0; j < 9; j++){
            const new_td = document.createElement('td');
            new_td.classList.add('cell');
            const new_input = document.createElement('input');
            new_input.classList.add('input');
            new_input.setAttribute('type', 'text');
            new_input.setAttribute('maxlength', '1');
            new_input.setAttribute('onkeypress', 'return validKey(event)');
            new_input.setAttribute('size', '1');

            if(j % 3 === 0){
                new_td.style.borderLeft = '3px solid black';
            }
            if(i % 3 === 0){
                new_td.style.borderTop = '3px solid black';
            }
            new_td.appendChild(new_input);
            new_tr.appendChild(new_td);
        }
        document.getElementById('grid').appendChild(new_tr);
    }
    
}
// resolver el sudoku 
document.getElementById('solve').addEventListener('click', solve);
// resetear el sudoku
document.getElementById('reset').addEventListener('click', reset);

function reset(){
    window.location.reload();
}

function solve(){
    const grid = document.getElementById('grid');
    const cells = grid.getElementsByClassName('input');
    var matrix = [];

    for(let i = 0; i < 9; i++){
        var vec = [];

        for(let j = 0; j < 9; j++){
            var elem = cells[i*9+j].value;
            if(elem  === ''){
                vec.push(0);
            }else{
                vec.push(elem);
            }
        }
        matrix.push(vec);
    }

    if(sudokuVacio(matrix) || inputRepetido(matrix)){
        alert('Ingrese un sudoku valido');
    }else{
        backtrack(matrix);
        
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){

            if(cells[i*9 + j].value === ''){
                cells[i*9+j].style.color = '#C2EABD';
            }
            cells[i*9 + j].value = matrix[i][j];
            cells[i*9 + j].setAttribute('readonly', 'true');
        }
    }
    }
}

function sudokuVacio(matrix){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(matrix[i][j] != 0){
                return false;
            }
        }
    }
    return true;
}

function inputRepetido(grid){

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(grid[i][j] !== 0){
                    if(repetido(grid, i,j,grid[i][j])){
                        return true;
                    }
            }
        }
    }
    return false;
}

function repetido(grid,x,y,k){
for (let i = 0; i < 9; i++) {
    
    if(grid[i][y] === k && i !== x){
      return true;
    }
}
for (let j = 0; j < 9; j++) {
    if(grid[x][j] === k && j !== y){
      return true;
    }
}
for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(x / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(y / 3) + i % 3;
    if (grid[m][n] === k && (x !== m && n !== y)) {
      return true;
    }
}
return false;
}


function numPosible(grid,x,y,k){
        
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(x / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(y / 3) + i % 3;
        if (grid[x][i] == k || grid[i][y] == k || grid[m][n] == k) {
          return false;
        }
    }
    return true;
}


function sudokuSolver(grid){
    
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9;j++){
            if(grid[i][j] === 0){

                for(let k = 1; k <= 9; k++){
                    if(numPosible(grid,i,j,k)){
                        grid[i][j] = k;
                        if(sudokuSolver(grid)){
                            return true;
                        }else{
                            grid[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function backtrack(grid){
    sudokuSolver(grid);
}

