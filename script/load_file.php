<?php

$my_id = $_GET['id'];
if($my_id == "") {
	$array_data = array('flag'=> 0);
	echo json_encode($array_data);
}else {
	//データベース接続
	$host_name= '';	$dmname= "";
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

	//idで検索
	$sql = "SELECT * FROM user_data WHERE id = '$my_id'";
	$result_flag = mysql_query($sql);

	//失敗したらフラグ0
	if (!$result_flag) {
		$array_data = array('flag'=> 0);
	}else{
		$array_data = mysql_fetch_array($result_flag,MYSQL_ASSOC);
		if($array_data == array()){
			$array_data = array('flag'=> 0);
		}
	}
	echo json_encode($array_data);

	$close_flag = mysql_close($link);

}


?>