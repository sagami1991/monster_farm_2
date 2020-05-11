<?php
	//データベース接続
	$host_name= '';	$dmname= "";
	$dsn = '';
	$user = '';	$password = '';

	//接続工程
	$link = mysql_connect($host_name, $user, $password);
	if (!$link) {die('接続失敗です。'.mysql_error());}
	$db_selected = mysql_select_db($dmname, $link); //
	if (!$db_selected){	die('データベース選択失敗です。'.mysql_error());}
	mysql_set_charset('utf8');

	$rank = array("-","Ｅ","Ｄ","Ｃ","Ｂ","Ａ","Ｓ");
	$result_flag = mysql_query("SELECT * FROM user_data ORDER BY sum_stat DESC LIMIT 100");
	$count = 0;
	$str_array = array();
	$tmp ="";
	while ($row = mysql_fetch_assoc($result_flag)) {
		$week = $row['day'] % 48 % 4 + 1;
    	$month = ($row['day'] - $week + 1) % 48 /  4 + 1;
    	$year = ($row['day'] - (4 * ($month - 1)) - $week + 1) / 48 -2000;

    	//歳計算
	 	$week_t = $row['tosi'] % 48 % 4;
        $month_t = ($row['tosi'] - $week_t) % 48 /  4;
        $year_t = ($row['tosi'] - (4 * ($month_t)) - $week_t) / 48;
        $count++;

		$tmp = $tmp.'
                    <div class="rankbox rankbox_margin">
                        <div style="text-align:center;">'.$count.'位　'.htmlspecialchars($row['name']).'</div>
                        <div style="margin:0 auto; width:100px;" >
                            <img src="'.$row['imgsrc'].'" width="100px" height="100px">
                        </div>
                        <div class="rankbox_stat">
                        <table style="border-collapse: 0px;border-spacing: 0px;border: 0px;">
                        <tbody>
                        <tr><td width="50px">ライフ</td><td>'.$row['stat0'].'</td></tr>
                        <tr><td>ちから</td><td>'.$row['stat1'].'</td></tr> 
                        <tr><td>かしこさ</td><td>'.$row['stat2'].'</td></tr> 
                        <tr><td>命中</td><td>'.$row['stat3'].'</td></tr> 
                        <tr><td>回避</td><td>'.$row['stat4'].'</td></tr> 
                        <tr><td>丈夫さ</td><td>'.$row['stat5'].'</td></tr> 
                        </tbody>
                        </table>
                        </div>
                        <div style="margin-left:3px;margin-top:25px">
                        '.$year_t.'歳'.$month_t.'ヶ月 ランク'.$rank[$row['monsterrank']].'<br>所持金 '.$row['money'].'円<br>プレイ年数　'.$year.'年
                        </div>
                	</div>';
        if($count % 8 == 0){
        	array_push($str_array, $tmp); //str配列に追加
        	$tmp = "";
    	}
	}
	array_push($str_array, $tmp);
	echo json_encode($str_array);
	$close_flag = mysql_close($link);
?>