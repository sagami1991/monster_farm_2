//セーブ
function save_file(){
	 var my_name = document.forms.save_form.my_name.value;
	 var my_id = document.forms.save_form.my_id.value;
	 $.getJSON('script/file.php',
	 {
	 	id : my_id,
	 	name : my_name,
	 	date : new Date().toLocaleString(),
	 	imgsrc : battlemodeimage,
	 	day : day,
	 	money : money,
	 	saidaijumyou : saidaijumyou,
	 	jumyou : jumyou,
	 	tosi : tosi,
	 	hirou : hirou,
	 	stress : stress,
	 	stat0 : stat1[0],
	 	stat1 : stat1[1],
	 	stat2 : stat1[2],
	 	stat3 : stat1[3],
	 	stat4 : stat1[4],
	 	stat5 : stat1[5],
	 	sum_stat : stat1[0]+stat1[1]+stat1[2]+stat1[3]+stat1[4]+stat1[5],
	 	tekisei0 : stat2[0],
	 	tekisei1 : stat2[1],
	 	tekisei2 : stat2[2],
	 	tekisei3 : stat2[3],
	 	tekisei4 : stat2[4],
	 	tekisei5 : stat2[5],
	 	my_guts : stat2[6],
	 	you_guts : stat2[7],
	 	pieak : pieak,
	 	itemcount : itemcount,
	 	monsterrank : monsterrank,
	 	unlock_saisei : unlock_flag.saisei,
	 	unlock_hidden_stat : unlock_flag.hidden_stat,
	 	unlock_food0 : unlock_flag.food0,
	 	unlock_food1 : unlock_flag.food1,
	 	unlock_food2 : unlock_flag.food2,
	 	unlock_item0 : unlock_flag.item0,
	 	unlock_item1 : unlock_flag.item1,
	 	skill_master0 : waza[0][5],
	 	skill_master1 : waza[1][5],
	 	skill_master2 : waza[2][5],
	 	skill_master3 : waza[3][5],
	 	skill_master4 : waza[4][5]
	 },saved_file)
	 .success(function(json) {
	 	console.log("成功");
	 })
	 .error(function(jqXHR, textStatus, errorThrown) {
	 	console.log("エラー：" + textStatus);
	 	console.log("テキスト：" + jqXHR.responseText);
	 })
	 .complete(function() {
	 	console.log("完了");
	 });
	}

function saved_file(result){
	if(result.flag === 0) {
		$('#save_frame').html("名前がないぞ");
	}else if(result.flag == 1){
		$('#save_frame').html("IDがないぞ");
	}else if(result.flag == 2){
		$('#save_frame').html("セーブに失敗しました");
	}else if(result.flag == 3){
		$('#save_frame').html("セーブしました");
		document.forms.save_form.my_id.readOnly = true;
	}else{
		$('#save_frame').html("セーブに失敗しました");
	}
}

//ロード
function read_file(){
	var my_id = document.forms.load_form.my_id.value;
	$.getJSON('script/load_file.php',{id:my_id},road_file);
}

function road_file(result){
	if(result.flag === 0) {
		$('#load_frame').html("ロードできませんでした");
		console.log(result);
	}else{
	 	battlemodeimage = result.imgsrc;
	 	day = Number(result.day);
	 	money = Number(result.money);
	 	saidaijumyou = Number(result.saidaijumyou);
	 	jumyou = Number(result.jumyou);
	 	tosi = Number(result.tosi);
	 	hirou = Number(result.hirou);
	 	stress = Number(result.stress);
	 	stat1[0] = Number(result.stat0);
	 	stat1[1] = Number(result.stat1);
	 	stat1[2] = Number(result.stat2);
	 	stat1[3] = Number(result.stat3);
	 	stat1[4] = Number(result.stat4);
	 	stat1[5] = Number(result.stat5);
	 	stat2[0] = Number(result.tekisei0);
	 	stat2[1] = Number(result.tekisei1);
	 	stat2[2] = Number(result.tekisei2);
	 	stat2[3] = Number(result.tekisei3);
	 	stat2[4] = Number(result.tekisei4);
	 	stat2[5] = Number(result.tekisei5);
	 	stat2[6] = Number(result.my_guts);
	 	stat2[7] = Number(result.you_guts);
	 	pieak = Number(result.pieak);
	 	itemcount = Number(result.itemcount);
	 	monsterrank = Number(result.monsterrank);
	 	unlock_flag.saisei = Number(result.unlock_saisei);
	 	unlock_flag.hidden_stat = Number(result.unlock_hidden_stat);
	 	unlock_flag.food0 = Number(result.unlock_food0);
	 	unlock_flag.food1 = Number(result.unlock_food1);
	 	unlock_flag.food2 = Number(result.unlock_food2);
	 	unlock_flag.item0 = Number(result.unlock_item0);
	 	unlock_flag.item1 = Number(result.unlock_item1);
	 	waza[0][5] = Number(result.skill_master0);
	 	waza[1][5] = Number(result.skill_master1);
	 	waza[2][5] = Number(result.skill_master2);
	 	waza[3][5] = Number(result.skill_master3);
	 	waza[4][5] = Number(result.skill_master4);
	 	daycount(); //日付表示
    	moneycount(0); //所持金表示
    	koruto();
	 	$('#load_frame').html("ロードしました");
	 	document.forms.save_form.my_id.value = result.id;
	 	document.forms.save_form.my_id.readOnly = true;
	}
}

//ランキング
function load_ranking(){
	$.getJSON('script/ranking.php',{},input_ranking).success(function(json) {
	 	console.log("成功");
	 })
	 .error(function(jqXHR, textStatus, errorThrown) {
	 	console.log("エラー：" + textStatus);
	 	console.log("テキスト：" + jqXHR.responseText);
	 })
	 .complete(function() {
	 	console.log("完了");
	 });
}
function input_ranking(result){
	Ranking.page_array = result;
	Ranking.start_fnc();
}

var Ranking = {
	page_array : null,
	nowpage : null,
	page_length :null,
	next_elm : null,
	back_elm : null,
	start_fnc : function(){
		this.nowpage = 1;
		this.page_length = this.page_array.length;
		this.next_elm = document.getElementsByName("rank_button").item(1);
		this.back_elm = document.getElementsByName("rank_button").item(0);
		//前へボタン削除
		this.back_elm.style.display = "none";
		//もし配列長さ1なら次へボタン削除
		if(this.page_array.length == 1) this.next_elm.style.display = "none";
		else this.next_elm.style.display = "block";
		//表示
		$('#rank_window').html(this.page_array[this.nowpage-1]);
	},
	next_fnc : function(flag){
		//frag =1 の場合進む、0の場合戻る
		if(flag == 1) this.nowpage += 1;
		else		  this.nowpage -= 1;

		//前ボタンの表示判定
		if (this.nowpage==1) this.back_elm.style.display = "none";
		else this.back_elm.style.display = "block";
		//次ボタンの表示判定
		if (this.nowpage==this.page_length) this.next_elm.style.display = "none";
		else this.next_elm.style.display = "block";

		$('#rank_window').html(this.page_array[this.nowpage-1]);
	}
};