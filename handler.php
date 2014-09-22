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

function slugify($text)
{ 
  // replace non letter or digits by -
  $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

  // trim
  $text = trim($text, '-');

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // lowercase
  $text = strtolower($text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  if (empty($text))
  {
    return 'n-a';
  }

  return $text;
}

function delete_object($object, $params)
{
    switch ( $object ):
        case 'project':
            // Update the project list.
            $file = array(
                'name' => 'list',
                'dir' => 'data/' . $object . '/',
                'ext' => '.json');
            $file['path'] = $file['dir'] . $file['name'] . $file['ext'];
            $data = json_decode(file_get_contents($file['path']));
            if ( $data === FALSE ) die("JSON from " . $file['name'] . " could not be decoded");
            unset($data->$params['slug']);
            file_put_contents($file['path'], json_encode($data));

            // Remove the project dir and its innards
            // Deletes all top-level project json files. Will eventually need to do the same for project subdirs.
            array_map('unlink', glob('data/project/' . $params['slug'] . '/*.json'));
            rmdir('data/project/' . $params['slug']);
            break;
        default:
            break;
    endswitch;
}
function edit_object($object, $params)
{}

function create_object($object, $params)
{
    switch ( $object ):
        case 'project':
            // UPDATE: project list
            // Update the project list.
            $file = array(
                'name' => 'list',
                'dir' => 'data/' . $object . '/',
                'ext' => '.json');
            $file['path'] = $file['dir'] . $file['name'] . $file['ext'];
            $data = json_decode(file_get_contents($file['path']));
            if ( $data === FALSE ) die("JSON from " . $file['name'] . " could not be decoded");
            $slug = slugify($params['name']);
            $data->$slug = $params['name'];
            file_put_contents($file['path'], json_encode($data));

            // CREATE: project
            // Create empty fields for the other attributes we'll need.
            $model = json_decode(file_get_contents('data/models/' . $object . '.json'));
            $data->params = $model;

            // Create the project detail file.
            mkdir('data/project/' . $slug, 0777);
            file_put_contents('data/project/' . $slug . '/project.json', json_encode($data->params));
            break;

        default:
            die("Invalid object $object");
    endswitch;

}
