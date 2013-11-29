<?php

require_once 'C:/xampp/php/zend/library/Zend/Loader.php';
Zend_Loader::loadClass('Zend_Gdata');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_Calendar');
require_once('../../lib/RestServer.php');
require_once('../../config/config.php');

class Agenda {

    /**
     * Calls the functions to return the events of all calendars in a specific time period.
     * @return array
     */
    public static function main() {
        $events = array();

        $client = self::authenticate();
        $service = new Zend_Gdata_Calendar($client);
        $calIds = self::getCalendarIds($service);
        for($i = 0; $i < count($calIds); $i++) {
            $query = self::buildQueryForGetEvents($service, $calIds[$i]);
            $calEvents = self::getEvents($service, $query);
            for($x = 0; $x < count($calEvents); $x++) {
                array_push($events, $calEvents[$x]);
            }
        }

        return $events;
    }

    /**
     * Used to authenticate with Google.
     * @return mixed
     */
    private static function authenticate() {
        $user = GOOGLE_USER;
        $pass = GOOGLE_PASS;
        $service = Zend_Gdata_Calendar::AUTH_SERVICE_NAME;

        $client = Zend_Gdata_ClientLogin::getHttpClient($user, $pass, $service);

        return $client;
    }

    /**
     * Gets the ID's of all calendars.
     * @param $service
     * @return array|null
     */
    private static function getCalendarIds($service) {
        try {
            $calFeed = $service->getCalendarListFeed();

            $calIds = array();
            foreach ($calFeed as $calendar) {
                $calenderId = (string) $calendar->id;
                array_push($calIds, str_replace("http://www.google.com/calendar/feeds/default/", "", $calenderId));
            }

            return $calIds;

        } catch (Zend_Gdata_App_Exception $e) { echo "Error: " . $e->getMessage(); }

        return null;
    }

    /**
     * Builds the query for the event-getter.
     * StartMin is inclusive, StartMax is exclusive.
     * @param $service
     * @param $calId
     * @return mixed
     */
    private static function buildQueryForGetEvents($service, $calId) {
        $currentDate = date('Y-m-d');
        $query = $service->newEventQuery();
        $query->setUser($calId);
        $query->setVisibility('private');
        $query->setProjection('full');
        $query->setOrderby('starttime');
        $query->setStartMin($currentDate);
        $query->setStartMax(date('Y-m-d', strtotime($currentDate. ' + 15 days')));

        return $query;
    }

    private static function getEvents($service, $query) {
        try {
            $eventFeed = $service->getCalendarEventFeed($query);
            $events = array();

            foreach ($eventFeed as $event) {
                $title = $event->title->text;
                $agenda = $event->who[0]->valueString;
                $date = substr($event->when[0]->startTime, 0, 10);

                    $row = array(   "title" => $title,
                                    "agenda" => $agenda,
                                    "date" => ($date . ' 23:59:00')
                    );

                    array_push($events, $row);
            }

            return $events;
        } catch (Zend_Gdata_App_Exception $e) {
            echo "Error: " . $e->getMessage();
        }

        return null;
    }
}

$rest = new RestServer('Agenda');
$rest->handle();