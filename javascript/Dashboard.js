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
     * 1.000 = 1 second.
     */
    updateContentInterval   :   3000,

    /**
     * Interval used to update the graph.
     * 1.000 = 1 second.
     */
    updateGraphInterval     :   10000,

    /**
     * Interval used to update switching between the graphs.
     * 1.000 = 1 second.
     */
    graphSwitchInterval     :   10000,

    /**
     * Interval used to update switching between the blocks.
     * 1.000 = 1 second.
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
     * Defines the time difference in points on the graph. - 3.600 = 1 hour.
     */
    graphEpochDifference    :   3600
};