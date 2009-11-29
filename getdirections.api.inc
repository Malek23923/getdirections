<?php
// $Id$
// $Name$

/**
 * @file
 * Get directions API
 */

/**
 * API Function to generate a url path for use by other modules/themes.
 *
 * Example Usage:
 * $path = getdirections_location_path('to', $vid);
 * $url = l(t('Get directions'), $path);
 *
 * @param $direction
 *   Required. The direction the supplied input applies to. Must be either 'to' or 'from'
 * @param $vid
 *   Required. The vid of the location node
 * @return
 *   Returns a path relative to the drupal root.
 */
function getdirections_location_path($direction, $vid) {
  if (module_exists('location') && is_numeric($vid) && ($direction == 'to' || $direction == 'from')) {
    return "getdirections/location/$direction/$vid";
  }
}

/**
 * API Function to generate a url path for use by other modules/themes.
 *
 * Example Usage:
 * $path = getdirections_locations_path($fromvid, $tovid);
 * $url = l(t('Get directions'), $path);
 *
 * @param $fromvid
 *   Required. The vid  of the location node of the starting point
 * @param $tovid
 *   Required. The vid of the location node of the destination
 * @return
 *   Returns a path relative to the drupal root.
 */
function getdirections_locations_path($fromvid, $tovid) {
  if (module_exists('location') && is_numeric($fromvid) && is_numeric($tovid)) {
    return "getdirections/locations/$fromvid/$tovid";
  }
}

/**
 * API Function to setup a map with two points
 *
 * @param $fromlocs
 *   Required. The string to display for From.
 * @param $fromlatlon
 *   Required. The location point for From. In decimal latitude,longitude
 * @param $tolocs
 *   Required. The string to display for To.
 * @param $tolatlon
 *   Required. The location point for To. In decimal latitude,longitude
 * @return
 *   Returns the themed map.
 */
function getdirections_locations_bylatlon($fromlocs, $fromlatlon, $tolocs, $tolatlon) {
  return getdirections_locations($fromlocs, $fromlatlon, $tolocs, $tolatlon);
}
