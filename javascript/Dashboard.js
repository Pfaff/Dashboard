var Dashboard = {
    /**
     * URL's to the locations of the information; including their desired methods.
     */
    url_ProjectInfo             :       '../dashboard/php/widget/projectinfo/ProjectInfo.php',
    method_ProjectInfo          :       'main',
    url_UserAmountHistory       :       '../dashboard/php/widget/projectinfo/UserAmountHistory.php',
    method_UserAmountHistory    :       'main',
    url_CpuLoadHistory          :       '../dashboard/php/widget/projectinfo/CpuLoadHistory.php',
    method_CpuLoadHistory       :       'main',
    url_Message                 :       '../dashboard/php/widget/message/Message.php',
    method_MessageGet           :       'getMessages',
    method_MessageRemove        :       'removeMessage',
    method_MessagePost          :       'postMessage',
    url_EmployeeInfo            :       '../dashboard/php/widget/message/Employee.php',
    method_EmployeeInfo         :       'main',
    url_Gravatar                :       '../dashboard/php/widget/message/Gravatar.php',
    method_Gravatar             :       'main',
    url_News                    :       '../dashboard/php/widget/news/News.php',
    method_News                 :       'main',
    url_Agenda                  :       '../dashboard/php/widget/agenda/Agenda.php',
    method_Agenda               :       'main',
    url_Mantis                  :       '../dashboard/php/widget/mantisstats/MantisStatsProxy.php',

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
    projectInfoUpdateContentInterval   :   30000,

    /**
     * Interval used to update switching between the blocks.
     * 1.000 = 1 second.
     */
    projectInfoBlockSwitchInterval     :   15000,

    /**
     * Interval used to update the graph.
     * 1.000 = 1 second.
     */
    projectInfoUpdateGraphInterval     :   25000,

    /**
     * Interval used to update switching between the graphs.
     * 1.000 = 1 second.
     */
    projectInfoGraphSwitchInterval     :   25000,

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
    switchMessageInterval   :   7500,

    /**
     * Time between getting the messages.
     */
    getMessagesInterval     :   3000,

    /**
     * Amount of news articles in the news widget.
     */
    newsArticles    :   4,

    /**
     * Interval for gathering new news.
     */
    getNewNewsInterval      :      120000,

    /**
     * Interval for getting new agenda items.
     */
    getNewAgendaItemsInterval   :       1800000,  // 30 Minutes

    /**
     * Interval for switching between the agenda items.
     */
    switchAgendaItemInterval    :       4500,

    /**
     * Interval between updating the news articles.
     */
    updateNewsArticlesInterval      :       8000,

    /**
     * Interval between updating the mantis stats chart.
     */
    updateMantisStatsChartInterval  :       60000
};