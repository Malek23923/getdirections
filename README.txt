getdirections module for Drupal 6.x

If you have any questions or suggestions please contact me at
http://drupal.org/user/52366

This module provides a form to make a google directions map.

Installation
Upload the whole getdirections directory into sites/all/modules/ or
sites/all/<domain>/modules/ for multisite setups.

Login to Drupal site as a user with administrative rights and go to
Administer > Site building > Modules. Scroll down to Other modules section, you
should now see Getdirections module listed there. Tick it and save configuration. 

After installation go to Administer > Site configuration > Get directions and
select your preferences and Save Configuration.

If you have the gmap module installed and configured, getdirections will
use its configuration as a starting point.

Also remember to go to Administer > User management > Permissions and
set up permissions according to your needs.

If you have the locations module installed you can make use of any nodes
containing location information.

For instance, if you want to "preload" the getdirections form with information 
about the destination use a URL in this format:

/getdirections/location/to/99

Where '99' is the vid of the location.
The user will only have to fill in the starting point.

To do it the other way around use
/getdirections/location/from/99

