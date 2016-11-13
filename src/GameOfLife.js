function getCoordinates(cellId) {
    return cellId.split('_')[1].split('-');
}

$(document).ready(function() {
    // create the game world and it's reprensentation
    var world = new World(30,30);
    for (var y = 0; y < 30; y++) {
        for(var x = 0; x < 30; x++) {
            var cellId = 'cell_' + x + '-' +y; 
            var cell = $("<div>", {'class': 'dead-cell', 'id': cellId});
            $("#gameworld").append(cell);
            var cell = new Cell(cellId, x,y)
            world.addCell(cell);
            cell.setNeighborCells( world.getNeighborhood(cell) );
        }
    }

    var ticker;
    var tickCount = 0;
    // button handlers
    $("#start").click(function() {
        if( $("#start").html() == "Start" ) {
            $("#start").html('Stop');
            ticker = setInterval(function(){ 
                tickCount++;
                // handle current cell state
                world.processTick();
                var aliveCells = world.getCellsByCurrentState(true);
                var deadCells = world.getCellsByCurrentState(false);
                
                aliveCells.forEach(function(cell) {
                    var cellSelector = '#' + cell.id;
                    if ($(cellSelector).hasClass('dead-cell') ) {
                        $(cellSelector).removeClass('dead-cell')
                        $(cellSelector).addClass('live-cell')
                    }
                }, this);
                deadCells.forEach(function(cell) {
                    var cellSelector = '#' + cell.id;
                    if ($(cellSelector).hasClass('live-cell') ) {
                        $(cellSelector).removeClass('live-cell')
                        $(cellSelector).addClass('dead-cell')
                    }
                }, this);
                // Set cells for the next generation
                world.reconfigureAll();
                document.getElementById("ticks").innerHTML = tickCount;
             }, 500);

        } 
        else {
            $("#start").html('Start');
            clearInterval(ticker);
        }
    });
    $(".dead-cell, .live-cell").click(function()  {
        var cellCoordinates = getCoordinates( $(this).attr('id') );
        if ($(this).hasClass( "dead-cell") ) {
            $(this).removeClass('dead-cell');
            $(this).addClass("live-cell");
        }
        else if ($(this).hasClass("live-cell") ) {
            $(this).removeClass('live-cell');
            $(this).addClass("dead-cell");
        }
        world.toggleCell(cellCoordinates[0], cellCoordinates[1]);
    });
});

