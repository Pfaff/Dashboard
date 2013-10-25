var Dashboard = {
    /**
     * Defines the amount of SOM servers.
     */
    amountOfSOMServers      :   7,

    /**
     * Defines the maximum amount of different amounts to show in the graph.
     */
    maxAmountOfUserAmountsToShow    :  10,

    /**
     * Interval used to update the content.
     */
    updateContentInterval   :   3000,

    /**
     * Interval used to update the graph.
     */
    updateGraphInterval     :   900000,

    /**
     * Interval used to update switching between the blocks.
     */
    blockSwitchInterval     :   15000,

    /**
     * Defines those who are on the same server.
     * Currently it's as follows:
     * Atvo 1 - Som 1
     * Atvo 2 - Som 2 / 7
     * Atvo 3 - Som 3 / 5
     * Atvo 4 - Som 4 / 6
     */
    sameServer              :   [2, 3, 4],

    /**
     * Defines the time difference in points on the graph.
     */
    graphEpochDifference    :   3600
};