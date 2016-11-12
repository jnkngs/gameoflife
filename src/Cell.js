function Cell(id, x,y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.isAlive = false;
    this.nextState = 'dead';

    this.neighbors = [];
    this.setNeighbor = function(neighbor) {
        if(neighbor.isAlive === true) {
            this.neighbors.push(neighbor);
        }
    };
    this.toggleState = function() {
        this.isAlive = !this.isAlive;
    }
    this.tick = function() {
        if(this.neighbors.length < 2) {
            this.nextState = 'dead';
        }
        else if(this.neighbors.length > 3 ) {
            this.nextState = 'dead';
        }
        else if(this.neighbors.length >= 2 && this.neighbors.length <= 3) {
            this.nextState = 'alive';
        }
    }
};