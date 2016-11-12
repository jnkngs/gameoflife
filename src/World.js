function get2DArray(size) {
    size = size > 0 ? size : 0;
    var arr = [];

    while(size--) {
        arr.push([]);
    }

    return arr;
}

function World(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.grid = get2DArray(sizeY);

    this.addCell = function (cell) {
        this.grid[cell.x][cell.y] = cell;
    };
    this.toggleCell = function(x,y) {
        this.grid[x][y].toggleState();
    };
    this.getCellsByNextState = function(nextState) {
        var results = [];
        var me = this;
        me.grid.forEach(function(row){
           results.push.apply( results, row.filter(function(cell) {return cell.nextState===nextState}));
        }); 
        return results;

    };
    this.processTick = function() {
        var cell;
        var me = this;
        me.grid.forEach(function(row) {
            row.forEach(function(cell) {
                // get neighbor coordinates
                cell.neighborCells.forEach(function(coordinates) {
                    cell.setAliveNeighbor(  me.grid[coordinates[0]][coordinates[1]] );
                });
                cell.tick();
            });
        });
    };
    this.reconfigureAll = function() {
        this.grid.forEach(function(row) {
            row.forEach(function(cell) {
                cell.reconfigure();
            });
        });
    };
    this.getNeighborhood = function(cell) {
        function _calcCoordinates(delta) {
            var sum = [];
            sum[0] = cell.x + delta[0];
            if(sum[0] < 0) {
                sum[0] = this.sizeX -1;
            }
            else if(sum[0] == this.sizeX) {
                sum[0] = 0;
            }
            sum[1] = cell.y + delta[1];
            if(sum[1] < 0) {
                sum[1] = this.sizeY -1;
            }
            else if(sum[1] == this.sizeY ) {
                sum[1] = 0;
            }
            return sum;
        }       
        return ( [[-1,-1], [0,-1], [1,-1], [-1,0], [1,0], [-1,1], [0,1], [1,1] ].map(_calcCoordinates.bind(this)) );
    };
};