describe("World", function() {
    beforeEach(function() {
        world = new World(30,30);
    });
    it("should be able to add cells to given coordinates", function() {
        cell1 = new Cell('test1', 0,0);
        cell1.isAlive = true;
        cell2 = new Cell('test2', 1,1);
        cell3 = new Cell('test3', 1,2);
        cell3.isAlive = true;

        world.addCell(cell1);
        world.addCell(cell2);
        world.addCell(cell3);

        expect(world.grid[0][0]).toEqual(cell1);
        expect(world.grid[1][1]).toEqual(cell2);
        expect(world.grid[1][2]).toEqual(cell3);
    });
    it("should be able to calculate neighborhood of the given cell", function() {
        // 1st the easy one...
        cell1 = new Cell('test1', 1,1);
        var neighborhood = world.getNeighborhood(cell1);
        expect(neighborhood).toEqual([[0,0], [1,0],[ 2,0], [0,1], [2,1], [0,2], [1,2], [2,2]]);
        // ...and then the edge cases 
        cell2 = new Cell('test1', 0,0); // upper-left corner
        var neighborhood = world.getNeighborhood(cell2);
        expect(neighborhood).toEqual([[29,29], [0,29],[ 1,29], [29,0], [1,0], [29,1], [0,1], [1,1]]);
    });
    it("should be able to update all the cells", function() {
        // TBD 2
    });

});
