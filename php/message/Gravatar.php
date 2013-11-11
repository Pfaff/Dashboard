<?php

require_once('../config/config.php');
require_once('../lib/RestServer.php');

class Gravatar {

    /**
     * Returns the photo url by the given e-mail.
     * @return string
     */
    public static function main() {
        return md5(strtolower(trim($_REQUEST['email']))). "?d=" . urlencode(DEFAULT_PHOTO_LOCATION);
    }
}


$rest = new RestServer('Gravatar');
$rest->handle();
