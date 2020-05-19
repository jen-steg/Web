<h1>Categories</h1>
<nav>
  <ul>
    <!-- display links for all categories -->
    <?php foreach($categories as $category) : ?>
    <li>
      <a href="?category_id=<?php echo $category['categoryID']; ?>">
        <?php echo $category['categoryName']; ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ul>
</nav>
© 2020 GitHub, Inc.

