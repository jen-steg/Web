<?php
//get tasklist array from POST
$task_list = filter_input(INPUT_POST, 'tasklist', 
        FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
if ($task_list === NULL) {
    $task_list = array();
    
    // add some hard-coded starting values to make testing easier
    $task_list[] = 'Write chapter';
    $task_list[] = 'Edit chapter';
    $task_list[] = 'Proofread chapter';
} // end if

//get action variable from POST
$action = filter_input(INPUT_POST, 'action');

//initialize error messages array
$errors = array();

//process
switch( $action ) {
    case 'Add Task': // add a task
        $new_task = filter_input(INPUT_POST, 'newtask');
        if (empty($new_task)) {
            $errors[] = 'The new task cannot be empty.';
        } // end if
        else {
            array_unshift($task_list, $new_task); // adds new item to the top of the list
        } // end else
        break; // exit case 'Add Task'
    
    case 'Remove Task': // remove task you addded to task field
        $task_index = filter_input(INPUT_POST, 'taskid', FILTER_VALIDATE_INT);
        array_shift($task_list); // remove the item from the top of the list
        
        break; // exit case 'Remove Task'
        
    case 'Delete Task': // delete a task
        $task_index = filter_input(INPUT_POST, 'taskid', FILTER_VALIDATE_INT);
        if ($task_index === NULL || $task_index === FALSE) {
            $errors[] = 'The task cannot be deleted.';
        } // end if
        else {
            unset($task_list[$task_index]);
            $task_list = array_values($task_list);
        } // end else
        break; // exit case 'Delete Task'

    case 'Modify Task': // modify a task
        $task_index = filter_input(INPUT_POST, 'taskid', FILTER_VALIDATE_INT);
        if($task_index === NULL || $task_index === FALSE){
            $errors[] = 'The task cannot be modified.';
        } // end if
        else{
            $task_to_modify= $task_list[$task_index];
        } // end else
        break; // exit case 'Modify Task'
        
    case 'Save Changes': // save changes 
        $i = filter_input(INPUT_POST, 'modifiedtaskid', FILTER_VALIDATE_INT);
        $modified_task = filter_input(INPUT_POST, 'modifiedtaskid');
        if(empty($modified_task)){
            $errors[]= 'The modified task cannot be empty.';
        } // end if
        else if($i === NULL || $i === FALSE){
            $errors[]='The task cannot be modified.';
        } // end elif
        else{
            $task_list[$i] = $modified_task;
            $modified_task ='';
        } // end else
        break; // exit case 'Save Changes'
        
    case 'Cancel Changes': // cancel changes
        $modified_task='';
        break; // exit case 'Cancel Changes'
    
    case 'Promote Task': // promote a task
        $task_index = filter_input(INPUT_POST, 
                'modifiedtaskid', FILTER_VALIDATE_INT);
        if($task_index === NULL || $task_index === FALSE){
            $errors[] = 'The task cannot be promoted.';
        } // end if
        else if($task_index == 0){
            $errors[] = 'The first task cannot be promoted.';
        } // end elif
        else{
            // get the index values
            $task_value= $task_list[$task_index];
            $previous_task_value = $task_list[$task_index - 1];
            
            // swap the index values to swap their positions
            $task_list[$task_index -1] = $task_value;
            $task_list[$task_index] = $previous_task_value;
        } // end else
        break; // exit case 'Promote Task'
    
    case 'Sort Tasks': // sort task_list array in alphabetic order
        sort($task_list, SORT_ASC);
        break; // exit case 'Sort Tasks'
    
} // end switch

include('task_list.php');
?>