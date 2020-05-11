

//ポップアップウインドウを開く
function openwindow(number){
	var elements = document.getElementsByClassName("explain_window").item(0);
	elements.style.display = "block";
	var length = document.getElementsByClassName("breed_menu cercle").length;
	//元画面のボタンを隠す
	for (var i = 0; i < length; i++) {
		document.getElementsByClassName("breed_menu cercle").item(i).style.display = "none";
	}

	//引数のメニュー開く
	length = document.getElementsByClassName("window_block").length;
	for (i = 0; i < length; i++) {
		elements = document.getElementsByClassName("window_block").item(i);
		if(i == number) { elements.style.display = "block";}
		else {elements.style.display = "none";}
	}
}

//ポップアップウインドウを閉じる
function closewindow(){
	elements = document.getElementsByClassName("explain_window").item(0);
	elements.style.display = "none";
	//元画面のボタンを戻す
	var length = document.getElementsByClassName("breed_menu cercle").length;
	for (var i = 0; i < length; i++) {
		document.getElementsByClassName("breed_menu cercle").item(i).style.display = "block";
	}
	//もしエンドフラグ1なら、ボタン消してステータスのみ表示
	if(end_flag ==1) endfarm();
}

//ポップアップウインドウ2を開く
function openwindow2(number){
	var elements = document.getElementsByClassName("window2").item(0);
	elements.style.display = "block";
	//引数のメニュー開く
	var length = document.getElementsByClassName("window_block2").length;
	for (i = 0; i < length; i++) {
		elements = document.getElementsByClassName("window_block2").item(i);
		if(i == number) { elements.style.display = "block";}
		else {elements.style.display = "none";}
	}
}

//ポップアップウインドウ2を閉じる
function closewindow2(){
	elements = document.getElementsByClassName("window2").item(0);
	elements.style.display = "none";
}

//ファイルウインドウを開く
function open_file_window(number){
	//引数の画面開く
	var length = document.getElementsByName("file_window").length;
	for (i = 0; i < length; i++) {
		elements = document.getElementsByName("file_window").item(i);
		if(i == number) { elements.style.display = "block";}
		else {elements.style.display = "none";}
	}

	//アンロックflagによって再生場表示するか
	if(unlock_flag.saisei == 1) {
		document.getElementsByName("summon_factory").item(0).innerHTML = "工房";
		document.getElementsByName("summon_factory").item(1).style.display = "block";
    }else{ 
    	document.getElementsByName("summon_factory").item(0).innerHTML = "工房(LOCK)";
		document.getElementsByName("summon_factory").item(1).style.display = "none";
	}
}

//セーブかロードのログ削除
function file_log_kill(idname){
	document.getElementById(idname).innerHTML ="";

}

//ステータスを表示する
function status_view(){
	//歳計算
	 var week = tosi % 48 % 4,
        month = (tosi - week) % 48 /  4,
        year = (tosi - (4 * (month)) - week) / 48;
    //歳とランク表示
    rank_str =["無し","E","D","C","B","A","S"];
    document.getElementById("tosi").innerHTML =
    year + "歳 " + month + "ヶ月　" + "ランク " + rank_str[monsterrank];

    //メインステータス表示
    for (var i = 0; i < 6; i++) document.getElementsByName("status").item(i).innerHTML =  stat1[i];
    //メーター表示
    var context = document.getElementsByName("mertar");
    //それぞれのメーターの色
    var meter_color =["gold","red","rgba(0, 164, 0, 1)","rgba(192, 59, 179, 1)","aqua","blue"];
    for (i = 0; i < 6; i++) {
        //まず背景色で塗りつぶす
        context.item(i).getContext('2d').fillStyle =  "rgba(255, 255, 224, 1)";
        context.item(i).getContext('2d').fillRect(0, 2, 250, 13);
        //色を与え、ステータスの値の長さで描写する
        context.item(i).getContext('2d').fillStyle =  meter_color[i];
        context.item(i).getContext('2d').fillRect(0, 2, stat1[i] / 5, 13);
    }   
    //もしflag1なら隠しステータスボタン表示
    if(unlock_flag.hidden_stat == 1) document.getElementById("hidden_stat_button").style.display = "block";
    else document.getElementById("hidden_stat_button").style.display = "none";
}

function open_hidden_stat(){
	//隠しステータス表示
	var dankai = ["1段階","2段階","3段階","4段階","ピーク","準ピーク","5段階","6段階","7段階","8段階"]; //成長段階表示表
	var tekisei = ["","Ｅ","Ｄ","Ｃ","Ｂ","Ａ"];
	var elements = document.getElementsByClassName("status_table").item(1);
	elements.rows[0].cells[1].innerHTML =jumyou +"週"; //残り寿命
	elements.rows[1].cells[1].innerHTML =hirou + stress * 2; //体調値
	elements.rows[2].cells[1].innerHTML =hirou; //疲労値
	elements.rows[3].cells[1].innerHTML =stress; //ストレス値
	elements.rows[4].cells[1].innerHTML =dankai[pieak-1]; //成長段階
	elements.rows[5].cells[1].innerHTML = (30 / stat2[6]).toFixed(1) + "上昇/秒"; //成長段階

	elements = document.getElementsByClassName("status_table").item(2);
	for (var i = 0; i < 6; i++) {
		elements.rows[i].cells[1].innerHTML = tekisei[stat2[i]];
	}
}

//説明表示
function setumei(propaty) {
    document.getElementsByClassName("message_box").item(1).innerHTML = Explain[propaty];
}
//説明クラス
var Explain = {
	0: "鍛えて強くなるンゴ",
	1: "修行して新技覚えるンゴ",
	2: "体調管理も大事なことのひとつンゴ",
	3: "優勝して賞金もらうンゴ",
	4: "アイテムを使うンゴ",
	7: "ちからが少し上がる、疲労小",
	8: "命中が少し上がる、疲労小",
    9: "かしこさが少し上がる、疲労小",
    10: "回避が少し上がる、疲労小",
    11: "ライフが少し上がる、疲労小",
    12: "丈夫さが少し上がる、疲労小",
    13: "ちからとライフが上がる、疲労大",
    14: "回避とかしこさが上がる、疲労大",
    15: "かしこさと命中が上がる、疲労大",
    16: "丈夫さとライフが上がる、疲労大",
	saisei:  "なんJ民を召喚するンゴ",
	file : "セーブロードができて、みんなのデータも見れるンゴ",
	rebirth : "人生やり直すンゴ、でもお金やアンロックされたものは保持されるンゴ"
};

//説明表示を消す
function setumeidelete() {
    document.getElementsByClassName("message_box").item(1).innerHTML = "";
}

//育成画面のボタンを消す
function delete_menu(){
	var length = document.getElementsByClassName("breed_menu cercle").length;
	for (var i = 0; i < length; i++) {
		document.getElementsByClassName("breed_menu cercle").item(i).style.display = "none";
	}
}

//修行ウインドウを開く
function open_syugyou(){
	var syugyoulist = document.getElementById("syugyouwindow"),
		//覚える技はsyugyou[i]=waza[i+1]とする
		//syugyou=[[場所,上がる能力,必要ステ最低値,必要ステ(1がちから、2がかしこさ)]]
        syugyou = [
            ['<div onclick="Syugyou.start(0)" class="syugyomenu cercle">中国</div>', "命中", 200, 1],
            ['<div onclick="Syugyou.start(1)" class="syugyomenu cercle">韓国</div>', "かしこさ", 280, 2],
            ['<div onclick="Syugyou.start(2)" class="syugyomenu cercle">キューバ</div>', "ちから", 400, 1],
            ['<div onclick="Syugyou.start(3)" class="syugyomenu cercle">北朝鮮</div>', "丈夫さ", 500, 2]
        ];
    //モンスターランクによっての修行地数 [無し,E,D,C,B,A,S]
  	var syugyouti=[1,2,3,3,4,4,4];
  	//修行地数分テーブル作成
    for (var i = 0; i < syugyouti[monsterrank]; i++) {
    	syugyoulist.rows[i+1].cells[0].innerHTML = syugyou[i][0];//修行地入れる
    	syugyoulist.rows[i+1].cells[1].innerHTML = syugyou[i][1];//上がる能力
    	//コメント挿入
    	//もし技覚えていたら,得るものは何もない
        if (waza[i+1][5] == 1) { 
            syugyoulist.rows[i+1].cells[2].innerHTML = "得るものは何もないぞ";
        //もし必要ステータス足りなかったら、君の実力じゃムリ
        } else if (syugyou[i][2] > stat1[syugyou[i][3]]) {
            syugyoulist.rows[i+1].cells[2].innerHTML = "お前の実力じゃムリだぞ";
        //それ以外なら、君にピッタリ
        } else {
            syugyoulist.rows[i+1].cells[2].innerHTML = "なにか覚える技があるみたいだぞ";
        }
    }
}

//大会画面開く
function open_taikai(){
	var tbody = document.getElementById("taikai_list_tbody");
	var str;
	for (var i = 0; i < 6; i++) {
		var rank = 5-i;
		if(i >= 5 - monsterrank) str = '<div  onclick="Taikai.start('+ rank + ');" class="syugyomenu cercle" style="margin:auto;">出場する</div>';
		else str = "実力が足りないンゴ";
		tbody.rows[i].cells[1].innerHTML = str;
	}
}

//食事リストの魚、ニク、ビタミンもどきをアンロックフラグによって開く
var Dinner_Obj = {
	0 : {
		real_number : 3,
		flag : "food0",
		name : "ｽｰﾊﾟｰｶｯﾌﾟ",
		price : 150,
		info : "普通にうまい、ストレスが少し解消される"
	},
	1 : {
		real_number : 4,
		flag : "food1",
		name : "プロテイン",
		price : 300,
		info : "自信がつき、ストレスがそこそこ解消される"
	},
	2 : {
		real_number : 5,
		flag : "food2",
		name : "ステロイド",
		price : 500,
		info : "気分がよくなり、かなりストレスが解消される"
	}
};
function dinner_list(){
	var tbody = document.getElementById("dinner_tbody");
	for (var i = 0; i < 3; i++) {
		if(unlock_flag[Dinner_Obj[i].flag] == 1){
			tbody.rows[i+3].cells[0].innerHTML =
				'<div onclick="dinner('+Dinner_Obj[i].real_number+')" class="syugyomenu cercle">'+
				Dinner_Obj[i].name + '</div>';
			tbody.rows[i+3].cells[1].innerHTML = Dinner_Obj[i].price+ "円";
			tbody.rows[i+3].cells[2].innerHTML = Dinner_Obj[i].info;
		}else{
			tbody.rows[i+3].cells[0].innerHTML ="LOCK";
			tbody.rows[i+3].cells[1].innerHTML ="";
			tbody.rows[i+3].cells[2].innerHTML ="";
		}
	}
}


//アイテムリストをアンロックフラグによって開く
var Item_Obj = {
	oil : {
		flag : "item0",
		name : "オランジーナ",
		price : 200,
		info : "うまい、疲れがとれる"
	},
	kusa : {
		flag : "item1",
		name : "きゅうり",
		price : 200,
		info : "落ち着く、ストレスが解消される"
	}
};
function open_item_list(){
	var tbody = document.getElementById("itemlist_tbody");
	var item = ["oil","kusa"];
	for (var i = 0; i < item.length; i++) {
		if(unlock_flag[Item_Obj[item[i]].flag] == 1){
			tbody.rows[i].cells[0].innerHTML =
			'<div class="syugyomenu cercle" onclick="use_item(\''+item[i]+'\')">'+Item_Obj[item[i]].name+'</div>';
			tbody.rows[i].cells[1].innerHTML = Item_Obj[item[i]].price+ "円";
			tbody.rows[i].cells[2].innerHTML = Item_Obj[item[i]].info;
		}else{
			tbody.rows[i].cells[0].innerHTML ="LOCK";
			tbody.rows[i].cells[1].innerHTML ="";
			tbody.rows[i].cells[2].innerHTML ="";
		}
	}
}

//技リスト開く
function open_skill_list () {
	//タイプ、1ならちから、2ならかしこさ
	var skill_type=["","ちから","かしこさ"];
	var tbody = document.getElementById("skill_tbody");

	//ダメージをランク表記に直す関数
	var	damage_rank = function(value){
		if(value<10) return "Ｅ";
		else if(value<20) return "Ｄ";
		else if(value<30) return "Ｃ";
		else if(value<40) return "Ｂ";
		else if(value<50) return "Ａ";
		else return "Ｓ";
	};
	//命中をランク表記に直す関数
	var	acc_rank = function(value){
		if     (value<-14) return "Ｅ";
		else if(value< -4) return "Ｄ";
		else if(value< 1 ) return "Ｃ";
		else if(value< 5 ) return "Ｂ";
		else if(value< 15) return "Ａ";
		else 			   return "Ｓ";
	};
	//技表示
	for (var i = 0; i < 5; i ++) {
		//もし技覚えていたら（waza[i][5]が習得判定）
		if (waza[i][5] == 1) {
			tbody.rows[i].cells[0].innerHTML = waza[i][0];
			tbody.rows[i].cells[1].innerHTML = skill_type[waza[i][4]];
			tbody.rows[i].cells[2].innerHTML = waza[i][1];
			tbody.rows[i].cells[3].innerHTML = damage_rank(waza[i][2]);
			tbody.rows[i].cells[4].innerHTML = acc_rank(waza[i][3]);
		} 
	}
}
