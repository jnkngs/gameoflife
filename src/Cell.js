function Cell(id, x,y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.isAlive = false;
    this.nextState = 'dead';

    this.aliveNeighbors = [];
    this.neighborCells = [];

    this.setAliveNeighbor = function(neighbor) {
        if(neighbor.isAlive === true) {
            this.aliveNeighbors.push(neighbor);
        }
    };
    this.setNeighborCells = function(coordinates) {
        this.neighborCells = coordinates;
    };
    
    this.toggleState = function() {
        this.isAlive = !this.isAlive;
    }
    this.tick = function() {
        if(this.aliveNeighbors.length < 2) {
            this.nextState = 'dead';
        }
        else if(this.aliveNeighbors.length > 3 ) {
            this.nextState = 'dead';
        }
        else if(this.aliveNeighbors.length >= 2 && this.aliveNeighbors.length <= 3) {
            this.nextState = 'alive';
        }
        this.aliveNeighbors = [];
    };
    this.reconfigure = function() {
        if(this.nextState === 'alive') {
            this.isAlive = true;
        }
        else if (this.nextState === 'dead') {
            this.isAlive = false;
        }
        this.nextState = '';
    };
};