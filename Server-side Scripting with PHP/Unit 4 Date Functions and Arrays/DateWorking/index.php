<?php
//set default value
$message = '';

//get value from POST array
$action = filter_input(INPUT_POST, 'action');
if ($action === NULL) {
    $action =  'start_app';
}

//process
switch ($action) {
    case 'start_app':

        // set default invoice date 1 month prior to current date
        $interval = new DateInterval('P1M');
        $default_date = new DateTime();
        $default_date->sub($interval);
        $invoice_date_s = $default_date->format('n/j/Y');

        // set default due date 2 months after current date
        $interval = new DateInterval('P2M');
        $default_date = new DateTime();
        $default_date->add($interval);
        $due_date_s = $default_date->format('n/j/Y');

        $message = 'Enter two dates and click on the Submit button.';
        break;
    case 'process_data':
        $invoice_date_s = filter_input(INPUT_POST, 'invoice_date');
        $due_date_s = filter_input(INPUT_POST, 'due_date');

        // make sure the user enters both dates
        if(empty($invoice_date_s)||empty($due_date_s)){
            $message = "Error. Please enter two dates.";
            break;
        } // end if
        
        // convert date strings to DateTime objects
        // and use a try/catch to make sure the dates are valid
        try{
           $invoice_date_object = new DateTime($invoice_date_s); 
           $due_date_object = new DateTime($due_date_s);
        } // end try
        catch (Exception $ex) {
           $message ='Error. Both dates must be in a valid format.';
           break; 
        } // end catch
        
        // make sure the due date is after the invoice date
        if($due_date_object < $invoice_date_object){
            $message ='Error. Make sure invoice date is before due date.'; 
            break;
        } // end if
        
        // format both dates
        $format_date_string = 'F d, Y'; //base format string for all dates
        $invoice_date_f = $invoice_date_object->format($format_date_string);
        $due_date_f = $due_date_object->format($format_date_string); 
        
        // get the current date and time and format it
        $current_date_object = new DateTime('',(new DateTimeZone('EST'))); // variable of now is instantiation of DateTime
        $current_date_f = $current_date_object->format($format_date_string);
        $current_time_f = $current_date_object->format('H:i:s a');
        
        // get the amount of time between the current date and the due date
        // and format the due date message
        $date_time_span = $current_date_object->diff($due_date_object);
        
        // current date is after the due date
        if($due_date_object < $current_date_f){ 
            $due_date_message = $date_time_span->format
                    ('This invoice is %y years, %m months, and %d days overdue.');
        } // end if
        else{ //current date is before due date
            $due_date_message = $date_time_span->format
                    ('This invoice is due in %y years, %m months, and %d days.');
        } // end else
        break;
}
include 'date_tester.php';
?>