<?PHP
// Read and write operations on data
// Two GET parameters are required: action and object.
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

function delete_object($object, $params)
{}
function edit_object($object, $params)
{}

function create_object($object, $params)
{
    switch ( $object ):
        case 'project':
            // Update the project list.
            $file = array(
                'name' => 'project-list',
                'dir' => 'data/',
                'ext' => '.json');
            $file['path'] = $file['dir'] . $file['name'] . $file['ext'];
            $data = json_decode(file_get_contents($file['path']));
            if ( $data === FALSE ) die("JSON from " . $file['name'] . " could not be decoded");
            $data->$params['slug'] = $params['name'];
            file_put_contents($file['path'], json_encode($data));

            // Create the project detail file.
            mkdir('data/projects/' . $params['slug'], 0777);
            file_put_contents('data/projects/' . $params['slug'] . '/project.json', json_encode($params));
            break;

        default:
            die("Invalid object $object");
    endswitch;

}
