<?PHP
// Read and write operations on data
// Two parameters are required: action and object.
// We don't do as much sanitation on this data because it's running on an internal server.

// Accepted action values:
// create, edit, delete

// Accepted object values:
// project
foreach ( $_GET as $key => $value ):
    // All var names will be lowercase.
    $key = strtolower($key);
    $$key = $value;
endforeach;

if ( !isset($action) ) die("An action must be passed.");
if ( in_array($action, array('create', 'edit', 'delete')) === FALSE ) die("Invalid action specified.");

switch ( $action ):
    case 'create':
        create_object($object, $_GET);
        break;
    case 'edit':
        edit_object($object, $_GET);
        break;
    case 'delete':
        delete_object($object, $_GET);
        break;
    default:
        die("Invalid action.");
endswitch;

function create_object($object, $params)
{
    switch ( $object ):
        case 'project':
            // Update the project list.
            file_get_contents('data/project-list.json');
            
            // Create the project detail file.
        default:
            die("Invalid object.");
    endswitch;

}
