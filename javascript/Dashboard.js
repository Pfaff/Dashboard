var Dashboard = {
    /**
     * URL's to the locations of the information; including their desired methods.
     */
    url_ProjectInfo             :       '../dashboard/php/projectinfo/ProjectInfo.php',
    method_ProjectInfo          :       'main',
    url_UserAmountHistory       :       '../dashboard/php/projectinfo/UserAmountHistory.php',
    method_UserAmountHistory    :       'main',
    url_CpuLoadHistory          :       '../dashboard/php/projectinfo/CpuLoadHistory.php',
    method_CpuLoadHistory       :       'main',
    url_Message                 :       '../dashboard/php/message/Message.php',
    method_MessageGet           :       'getMessages',
    method_MessageRemove        :       'removeMessage',
    method_MessagePost          :       'postMessage',
    url_EmployeeInfo            :       '../dashboard/php/message/Employee.php',
    method_EmployeeInfo         :       'main',
    url_Gravatar                :       '../dashboard/php/message/Gravatar.php',
    method_Gravatar             :       'main',

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
    updateGraphInterval     :   25000,

    /**
     * Interval used to update switching between the graphs.
     * 1.000 = 1 second.
     */
    graphSwitchInterval     :   25000,

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
     * Defines the time difference in points on the graphs. - 3.600 = 1 hour.
     */
    ua_GraphEpochDifference    :   3600,
    cl_GraphEpochDifference    :   600,

    /**
     * Time between the messages.
     */
    switchMessageInterval   :   12500,

    /**
     * Time between getting the messages.
     */
    getMessagesInterval     :   12501
};