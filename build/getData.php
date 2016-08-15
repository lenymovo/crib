<?php

  define('MYSQL_SERVER', 'localhost');
  define('MYSQL_USER', 'root');
  define('MYSQL_PASSWORD', '');
  define('MYSQL_DB', 'html');

  function db_connect(){
    $link = mysqli_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB)
    or die("Error: ".mysqli_error($link));
    if(!mysqli_set_charset($link, "utf8")){
      printf("Error: ".mysqli_error($link));
    }
    return $link;
  }

  $link = db_connect();
  $db_data = array();

  $result = mysqli_query($link, $sql);

  if(!$result) die(mysqli_error($link));
  $n = mysqli_num_rows($result);

  for($i = 0; $i < $n; $i++)
    $db_data[] = mysqli_fetch_assoc($result);

  return $db_data;
  mysqli_close($link);

?>