describe("Cell", function() {
    beforeEach(function() {
        cellUnderTest = new Cell('dummy', 1,1);
    });
    it("Any live cell with fewer than two live neighbors dies", function() {
        cellUnderTest.isAlive = true;
        
        neighbor1 = new Cell('neighbor1', 0, 0);
        neighbor1.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor1);

        cellUnderTest.tick();    // progress one game tick
        expect(cellUnderTest.nextState).toEqual('dead');
    });
    it("Any live cell with two or three live neighbors lives on to the next generation", function() {
        cellUnderTest.isAlive = true;

        neighbor1 = new Cell('neighbor1', 0, 0);
        neighbor1.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor1);

        neighbor2 = new Cell('neighbor2', 0,1);
        neighbor2.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor2);

        cellUnderTest.tick();
        expect(cellUnderTest.nextState).toEqual('alive');

    });
    it("Any live cell with more than three live neighbors dies", function() {
        cellUnderTest.isAlive = true;

        neighbor1 = new Cell('neighbor1', 0, 0);
        neighbor1.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor1);

        neighbor2 = new Cell('neighbor2', 1, 0);
        neighbor2.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor2);

        neighbor3 = new Cell('neighbor3', 2, 0);
        neighbor3.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor3);

        neighbor4 = new Cell('neighbor4', 0, 1);
        neighbor4.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor4);

        cellUnderTest.tick();
        expect(cellUnderTest.nextState).toEqual('dead');
    });
    it("Any dead cell with exactly three live neighbors becomes a live cell", function() {
        cellUnderTest.isAlive = false;

        neighbor1 = new Cell('neighbor1', 0, 0);
        neighbor1.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor1);

        neighbor2 = new Cell('neighbor2', 1, 0);
        neighbor2.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor2);

        neighbor3 = new Cell('neighbor3', 2, 0);
        neighbor3.isAlive = true;
        cellUnderTest.setAliveNeighbor(neighbor3);

        cellUnderTest.tick();
        expect(cellUnderTest.nextState).toEqual('alive');
    });
});
