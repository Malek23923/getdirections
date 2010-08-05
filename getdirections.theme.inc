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
        'nid' => 0,
        'type' => '',
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
    'getdirections_show_locations_via' => array(
      'arguments' => array(
        'width' => '',
        'height' => '',
        'locs' => NULL,
      ),
    ),
    'getdirections_direction_form' => array(
      'arguments' => array('form' => NULL),
    ),
  );
}

/**
 * Theme to use for when one or no locations are supplied.
 *
 */
function theme_getdirections_show($form, $width, $height, $nid, $type) {
  $output = '';
  $getdirections_returnlink = variable_get('getdirections_returnlink', array(
    'page_enable' => 0,
    'page_link' => t('Return to page'),
    'user_enable' => 0,
    'user_link' => t('Return to page'),
  ));
  if ($getdirections_returnlink['page_enable'] && $nid > 0 && $type == 'node') {
    $link = l($getdirections_returnlink['page_link'], 'node/' . $nid);
    $output .= '<div class="getdirections_returnlink">'. $link .'</div>';
  }
  elseif ($getdirections_returnlink['user_enable'] && $nid > 0 && $type == 'user') {
    $link = l($getdirections_returnlink['page_link'], 'user/' . $nid);
    $output .= '<div class="getdirections_returnlink">'. $link .'</div>';
  }

  $output .= $form;
  $header = array();

  $rows[] = array(
    array(
      'data' => '<div id="getdirections_map_canvas" style="width: '. $width .'; height: '. $height .'" ></div>',
      'valign' => 'top',
      'align' => 'center',
      'class' => 'getdirections-map',
    ),
    array(
      'data' => '<div id="getdirections_directions"></div>',
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
  $output .= "<div class='getdirections_display'><label>". t('From') .":</label> ". $fromlocs ."</div>";
  $output .= "<div class='getdirections_display'><label>". t('To') .":</label> ". $tolocs ."</div>";

  $header = array();

  $rows[] = array(
    array(
      'data' => '<div id="getdirections_map_canvas" style="width: '. $width .'; height: '. $height .'" ></div>',
      'valign' => 'top',
      'align' => 'center',
      'class' => 'getdirections-map',
    ),
    array(
      'data' => '<div id="getdirections_directions"></div>',
      'valign' => 'top' ,
      'align' => 'left',
      'class' => 'getdirections-list',
    ),
  );
  $output .= '<div class="getdirections">'. theme('table', $header, $rows) .'</div>';
  return $output;
}

/**
 * Theme to use for when both locations are supplied with waypoints.
 *
 */
function theme_getdirections_show_locations_via($width, $height, $locs) {
  $output = "";
  foreach ($locs AS $key => $loc) {
    if ($key == 0) {
      $label = t('From');
    }
    elseif ($key == count($locs)-1) {
      $label = t('To');
    }
    else {
      $label = t('Via');
    }
    $output .= "<div class='getdirections_display'><label>". $label .":</label> ". $loc ."</div>";
  }

  $header = array();

  $rows[] = array(
    array(
      'data' => '<div id="getdirections_map_canvas" style="width: '. $width .'; height: '. $height .'" ></div>',
      'valign' => 'top',
      'align' => 'center',
      'class' => 'getdirections-map',
    ),
    array(
      'data' => '<div id="getdirections_directions"></div>',
      'valign' => 'top' ,
      'align' => 'left',
      'class' => 'getdirections-list',
    ),
  );
  $output .= '<div class="getdirections">'. theme('table', $header, $rows) .'</div>';
  return $output;
}


function theme_getdirections_direction_form($form) {
  // if you want to do fancy things with the form, do it here ;-)
  if (isset($form['mto'])) {
    $form['mto']['#prefix'] = '<div class="container-inline getdirections_display">';
    $form['mto']['#suffix'] = '</div>';
  }
  if (isset($form['mfrom'])) {
    $form['mfrom']['#prefix'] = '<div class="container-inline getdirections_display">';
    $form['mfrom']['#suffix'] = '</div>';
  }
  if (isset($form['travelmode'])) {
    $form['travelmode']['#prefix'] = '<div class="container-inline getdirections_display">';
    $form['travelmode']['#suffix'] = '</div>';
  }
  if (isset($form['travelextras'])) {
    $form['travelextras']['#prefix'] = '<div class="container-inline getdirections_display">';
    $form['travelextras']['#suffix'] = '</div>';
  }
  if (isset($form['country_from'])) {
    $form['country_from']['#prefix'] = '<div class="container-inline getdirections_display">';
    $form['country_from']['#suffix'] = '</div>';
  }
  if (isset($form['country_to'])) {
    $form['country_to']['#prefix'] = '<div class="container-inline getdirections_display">';
    $form['country_to']['#suffix'] = '</div>';
  }

  $output = '';
  $output .= drupal_render($form);
  return $output;
}
