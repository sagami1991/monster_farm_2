<?php

$my_name = $_GET['name'];
$my_id = $_GET['id'];
if ($my_name == "" || $my_id == ""){
	if($my_name == "") {
		$array_data = array('flag'=> 0);
		echo json_encode($array_data);
	}else {
		$array_data = array('flag'=> 1);
		echo json_encode($array_data);
	}
}else {
	//データベース接続
	$host_name= 'localhost';	$dmname= "mf2";
	$dsn = '';
	$user = '';	$password = '';

	$host_name= '';	$dmname= "";
	$dsn = '';
	$user = '';	$password = '';

	//接続工程
	$link = mysql_connect($host_name, $user, $password);
	if (!$link) {die('接続失敗です。'.mysql_error());}
	$db_selected = mysql_select_db($dmname, $link); //
	if (!$db_selected){	die('データベース選択失敗です。'.mysql_error());}
	mysql_set_charset('utf8');


	//　キーの名前
	$sql = "DESCRIBE user_data";
	$result_flag = mysql_query($sql);
	$key_array = array();
	for ($i=0; $i < mysql_num_rows($result_flag); $i++) { 
		array_push($key_array, mysql_result($result_flag, $i));
	}

	//post配列
	$post_array = array();
	for ($i=0; $i <count($key_array) ; $i++) { 
		$temp = $_GET[$key_array[$i]];
		array_push($post_array,$temp);
	}
	$sql = "REPLACE INTO user_data VALUES ('" . implode( "','", $post_array) . "')";
	$result_flag = mysql_query($sql);

	if (!$result_flag) {
		$array_data = array('flag'=> 2);
		echo json_encode($array_data);
	}else{
		$array_data = array('flag'=> 3);
		echo json_encode($array_data);
	}
	
	$close_flag = mysql_close($link);

}


?>