<?php
require_once('database.php');

// Get IDs
$name = filter_input(INPUT_POST, 'name');

// Validate inputs
if ($name == null){
    $error = "Invalid category data. Try again.";
    include('error.php');
} else { //Add the category to the database
    require_once('database.php');
    
    $query = 'INSERT INTO categories(categoryName)
              VALUES (:name)';
    $statement = $db->prepare($query);
    $statement->bindValue(':name', $name);
    $success = $statement->execute();
    $statement->closeCursor(); 
    
   // Display the Category List page
    include('category_list.php');
}
?>



