<?php
// Start session management with a persistent cookie
$lifetime = 60 * 60 * 24 * 365; // one year
session_set_cookie_params($lifetime,'/');
session_start();

$id = session_id();

// get the array of tasks from the session
if(!isset($_SESSION['tasklist'])){
     $task_list = $_SESSION['tasklist'];
} // end if
else{
    $task_list = array();
} // end else

// get action variable from POST
$action = filter_input(INPUT_POST, 'action');

// initialize error messages array
$errors = array();

// process
switch( $action ) {
    case 'add':
        $new_task = filter_input(INPUT_POST, 'newtask');
        if (empty($new_task)) {
            $errors[] = 'The new task cannot be empty.';
        } else {
            $task_list[] = $new_task;
        }
        break;
    case 'delete':
        $task_index = filter_input(INPUT_POST, 'taskid', FILTER_VALIDATE_INT);
       if ($task_index === NULL || $task_index === FALSE) {
            $errors[] = 'The task cannot be deleted.';
        } // end if
        else {
            unset($task_list[$task_index]);
            $task_list = array_values($task_list);
        } // end else
        break; // exit case 'Delete Task'
} // end switch

// set the task array in the session
$_SESSION['tasklist'] = $task_list;

include('task_list.php');
?>