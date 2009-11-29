<?php
// $Id$
// $Name$

/**
 * @file
 * getdirections module theming
 */


/**
 * Implementation of hook_theme().
 *
 * This lets us tell Drupal about our theme functions and their arguments.
 */
function getdirections_theme() {
  return array(
    'getdirections_show' => array(
      'arguments' => array(
        'form' => array(),
        'width' => '',
        'height' => '',
      ),
    ),
    'getdirections_show_locations' => array(
      'arguments' => array(
        'width' => '',
        'height' => '',
        'fromlocs' => '',
        'tolocs' => '',
      ),
    ),
  );
}

/**
 * Theme to use for when one or no locations are supplied.
 *
 */
function theme_getdirections_show($form, $width, $height) {
  $output = $form;
  $header = array();

  $rows[] = array(
    array(
      'data' => '<div id="getdirections_map_canvas" style="width: '. $width .'; height: '. $height .'" ></div>',
      'valign' => 'top',
      'align' => 'center',
      'class' => 'getdirections-map',
    ),
    array(
      'data' => '<div id="getdirections_directions"></div><div id="getdirections_test"></div>',
      'valign' => 'top' ,
      'align' => 'left',
      'class' => 'getdirections-list',
    ),
  );
  $output .= '<div class="getdirections">'. theme('table', $header, $rows) .'</div>';
  return $output;
}

/**
 * Theme to use for when both locations are supplied.
 *
 */
function theme_getdirections_show_locations($width, $height, $fromlocs, $tolocs) {
  $output = "";
  $output .= "<div class='getdirections_display'><b>". t('From') .":</b> ". $fromlocs ."</div>";
  $output .= "<div class='getdirections_display'><b>". t('To') .":</b> ". $tolocs ."</div>";

  $header = array();

  $rows[] = array(
    array(
      'data' => '<div id="getdirections_map_canvas" style="width: '. $width .'; height: '. $height .'" ></div>',
      'valign' => 'top',
      'align' => 'center',
      'class' => 'getdirections-map',
    ),
    array(
      'data' => '<div id="getdirections_directions"></div><div id="getdirections_test"></div>',
      'valign' => 'top' ,
      'align' => 'left',
      'class' => 'getdirections-list',
    ),
  );
  $output .= '<div class="getdirections">'. theme('table', $header, $rows) .'</div>';
  return $output;
}

