var day = 96000,
    money = 5000,
    jumyou = 350,
    tosi = 0,
    saidaijumyou = jumyou,
    hirou = 0,
    stress = 0,
    stat1 = [110, 100, 120, 140, 150, 130],
    stat2 = [3, 3, 3, 4, 4, 4, 12, 8], //能力上昇適正 ガッツ回復,相手用ガッツ?
    pieak = 1,
    itemcount = 0,
    monsterrank = 0,
    end_flag =0;
    //waza =[名前,消費ガッツ,威力,命中,タイプ,習得判定,戦闘gif]
    waza = [
        ["肘", 15, 12, -5, 1, 1, "img/my_skill/0.gif"],
        ["ジャンパイア", 22, 20, 0, 1, 0, "img/my_skill/1.gif"],
        ["ゲッツー崩し", 28, 35, -4, 2, 0, "img/my_skill/2.gif"],
        ["ドームラン", 32, 36, -9, 1, 0, "img/my_skill/3.gif"],
        ["atomic bom", 50, 46, 5, 2, 0, "img/my_skill/4.gif"]
    ];
var unlock_flag = {
    saisei:0,
    hidden_stat:0,
    food0 :0,
    food1 :0,
    food2 :0,
    item0 :0,
    item1 :0,

};

function daycount() { 
    var week = day % 48 % 4 + 1,
        month = (day - week + 1) % 48 /  4 + 1,
        year = (day - (4 * (month - 1)) - week + 1) / 48,
        daydata_box = document.getElementsByClassName("daydata_box").item(0);
    daydata_box.innerHTML = year + "年<br>" + month + "月" + week + "週";
    return week;
}


function statview() {
    //ステータスが0以下なら0にする
    for (var i = 0; i < 6; i++) stat1[i] = Math.max(stat1[i], 0);
}

function moneycount(ryoukin) {
    money = money - ryoukin;
    document.getElementsByClassName("money_box").item(0).innerHTML  = money + "円";
}

//月初めに毎月のエサウインドウ表示
function food_display() {
        //ウインドウ表示
        openwindow(6);
        //食事リストアンロック判定
        dinner_list();
        //閉じるボタンを削除
        document.getElementsByClassName("exit_button").item(0).style.display = "none";
        //説明表示
        document.getElementsByClassName("message_box").item(1).innerHTML = "今月のなんJ民のエサを決めるンゴ";
}

//月初め食事
function dinner(number) {
    var stress_value =[4,-2,-3,-5,-6,-13];//食事によってのストレス減少
    var price =[10,50,100,150,300,500];

    if (money < price[number]) {
        document.getElementsByClassName("message_box").item(0).innerHTML = "お金がないぞ";
    } else {
        stress += stress_value[number];
        moneycount(price[number]);
        //画面閉じる
        closewindow();
        //閉じるボタンを再表示
        document.getElementsByClassName("exit_button").item(0).style.display = "block";
        koruto();
        if (hirou < 0) hirou = 0;
        if (stress < 0) stress = 0;
    }
}

//アイテム使用
function use_item(item_name){
    //アイテム効果
    var item_effect = {
        //疲れを28マイナスし、0より小さければ0に
        oil : function() {hirou = Math.max(hirou - 28, 0);},
        kusa : function() {stress = stress * 0.5;}
    };
    //ログ
    var log = {
        oil : "なんJ民はオランジーナを飲んだ。疲れがとれた。",
        kusa : "なんJ民はきゅうりを食べた。ストレスが減った。"
    };

    if (money <= 200) {
        document.getElementsByClassName("message_box").item(0).innerHTML = "お金がないぞ";
    } else if (itemcount == 1) {
        document.getElementsByClassName("message_box").item(0).innerHTML = "もうお腹いっぱいだぞ";
    } else {
        item_effect[item_name]();
        moneycount(200);
        document.getElementsByClassName("message_box").item(2).innerHTML = log[item_name];
        itemcount = 1;
    }
    //画面閉じる
    closewindow();
}

function jumyoukeisan() {
    var taityou = hirou + stress * 2;
    if (taityou < 70) jumyou = jumyou - 1;
    else if (taityou < 105) jumyou = jumyou - 2;
    else if (taityou < 140) jumyou = jumyou - 3;
    else if (taityou < 174) jumyou = jumyou - 4;
    else if (taityou < 210) jumyou = jumyou - 5;
    else if (taityou < 245) jumyou = jumyou - 6;
    else if (taityou < 270) jumyou = jumyou - 7;
    else jumyou = jumyou - 8;
}

function pieakkeisan() {
    if (jumyou > saidaijumyou * 0.90) pieak = 1;
    else if (jumyou >= saidaijumyou * 0.80) pieak = 2;
    else if (jumyou >= saidaijumyou * 0.65) pieak = 3;
    else if (jumyou >= saidaijumyou * 0.50) pieak = 4;
    else if (jumyou >= saidaijumyou * 0.40) pieak = 5;
    else if (jumyou >= saidaijumyou * 0.35) pieak = 6;
    else if (jumyou >= saidaijumyou * 0.25) pieak = 7;
    else if (jumyou >= saidaijumyou * 0.20) pieak = 8;
    else if (jumyou >= saidaijumyou * 0.15) pieak = 9;
    else if (jumyou >= 0) pieak = 10;
}

function koruto() {
    var advice = "",
        week = day % 48 % 4 + 1;
    if (hirou < 1) {
        advice = "なんJ民はすごく元気だぞ";
        document.getElementById("gazou").src = "img/nanjmin3.gif";
    } else if (hirou < 20) {
        advice = "なんJ民は元気だぞ";
        document.getElementById("gazou").src = "img/nanjmin3.gif";
    } else if (hirou < 40) {
        advice = "なんJ民は元気みたいだぞ";
        document.getElementById("gazou").src = "img/nanjmin1.gif";
    } else if (hirou < 60) {
        advice = "なんJ民はちょっと、疲れているみたいだぞ";
        document.getElementById("gazou").src = "img/nanjmin2.gif";
    } else if (hirou < 80) {
        advice = "なんJ民はだいぶ疲れているみたいだぞ、休ませてあげたほうがいいぞ";
        document.getElementById("gazou").src = "img/nanjmin2.gif";
    } else {
        advice = "なんJ民は無理をさせすぎたかな？だぞ";
        document.getElementById("gazou").src = "img/nanjmin4.gif";
    }

    //月初ストレス報告
    if (week == 1 && stress > 19) advice = advice + " ストレスたまってるみたいだぞ、気をつけてあげないとだぞ";
    //ピーク報告
    if (pieak == 5) advice = advice + " なんJ民は今が伸び頃みたいだぞ";
    //寿命報告
    if (jumyou <= 30 && jumyou > 10) advice = advice + " なんJ民は今年引退を考えたほうがいいぞ";
    else if (jumyou <= 5) advice = advice + " なんJ民が戦力外リストに入ってたぞ";

    //死亡処理
    if (jumyou < 0) {
        endfarm();
        document.getElementById("gazou").src = "img/sinda.png";
        advice = "寿命が尽きてなんてJ民が死んだぞ";
    }
    //破産処理
    if (money <= 0) {
        endfarm();
        document.getElementById("gazou").src = "img/hasan.png";
        advice = "お金が尽きて破産したぞ";
    }

    document.getElementsByClassName("message_box").item(0).innerHTML =  advice;
}

//破産または死亡時の動作
function endfarm(){
    end_flag = 1; //エンドフラグを1にする
    delete_menu(); //メニューを消す
    //ステータスボタンと復活ボタンのみ表示
    document.getElementsByClassName("breed_menu cercle").item(5).style.display = "block";
    document.getElementById("rebirth").style.display = "block";
}

//毎週ルーティン関数
function onajidousa() {
    closewindow();
    if (hirou < 0) hirou = 0;
    if (stress < 0) stress = 0;
    for (var i = 0; i < 6; i++) stat1[i] = Math.min(999, stat1[i]); //カンスト
    itemcount = 0;
    tosi += 1;
    day += 1;
    jumyoukeisan();
    statview();
    pieakkeisan();
    if (daycount() == 1) food_display(); //もし週初めなら餌ウインドウ表示
    else koruto();
}

//休養
function kyuuyou() {
    //成長段階によってストレス、疲労値の減り幅が異なる
    var hirou_rnd = [0,4,6,8,10,12,12,8,8,6,4],
    hirou_value=[0,36,38,40,42,44,44,40,32,32,32],
    stress_rnd=[0,4,4,6,4,4,4,6,4,4,2],
    stress_value=[0,5,5,5,7,9,9,5,5,5,5];

    var rnd = Math.floor(Math.random() * hirou_rnd[pieak]);
    hirou = hirou - hirou_value[pieak] - rnd;
    rnd = Math.floor(Math.random() * stress_rnd[pieak]);
    stress = stress - stress_value[pieak] - rnd;
    
    if (hirou < 0) hirou = 0;
    if (stress < 0) stress = 0;

    document.getElementsByClassName("message_box").item(2).innerHTML = "休んでストレス、疲労値が減りました。";
    onajidousa();
}

function keitore(i) {
    var mainstat,
        mainstatmax = [
            [],
            [3, 4, 5, 5, 7, 6, 5, 5, 4, 3],
            [3, 5, 6, 7, 9, 8, 7, 6, 5, 3],
            [4, 6, 8, 9, 11, 10, 9, 8, 6, 4],
            [5, 7, 10, 11, 14, 13, 11, 10, 7, 5],
            [6, 9, 12, 14, 17, 16, 14, 12, 9, 6]
        ],
        rnd = Math.floor(Math.random() * 4);
    mainstat = mainstatmax[stat2[i]][pieak - 1];
    mainstat = mainstat - rnd;
    mainstat = Math.max(mainstat, 1);
    mainstat = Math.min(mainstat, 15);
    return mainstat;
}


function juutore(main, sub) {
    var mainstat,
        mainstatmax = [
            [],
            [4, 6, 7, 8, 10, 9, 8, 7, 6, 4],
            [5, 7, 9, 11, 14, 13, 11, 9, 7, 5],
            [6, 9, 12, 14, 17, 16, 14, 12, 9, 6],
            [8, 11, 15, 18, 20, 20, 18, 15, 11, 8],
            [9, 14, 18, 20, 20, 20, 20, 18, 14, 9]
        ],
        substat,
        substatmax = [
            [],
            [2, 2, 3, 3, 4, 4, 3, 3, 2, 2],
            [2, 3, 4, 4, 5, 5, 4, 4, 3, 2],
            [3, 4, 5, 6, 7, 6, 6, 5, 4, 3],
            [3, 5, 6, 7, 9, 8, 7, 6, 5, 3],
            [4, 5, 7, 8, 10, 10, 8, 7, 5, 4]
        ],
        downstat,
        rnd;
    mainstat = mainstatmax[stat2[main]][pieak - 1];
    substat = substatmax[stat2[sub]][pieak - 1];
    
    //４パターンの乱数によって上がり幅異なる
    var mainstat_rnd =[3,2,1,0],
        substat_rnd =[2,1,0,3],
        downstat_rnd=[2,3,2,3];
    rnd = Math.floor(Math.random() * 4);
    mainstat = mainstat - mainstat_rnd[rnd];
    substat = substat - substat_rnd[rnd];
    downstat = downstat_rnd[rnd];
    
    if (mainstat > 20)  mainstat = 20; 
    if (substat < 2) substat = 2;
    return [mainstat, substat, downstat];
}

function trayning_kei(number) {
    var stat_type= [1,3,2,4,0,5],
        log = ["「ちから」","「命中」","「かしこさ」","「回避」","「ライフ」","「丈夫さ」"];
    //stat_typeに合わせた能力がkeitoreの返り値（上昇値）分上がる
    var upstat = keitore(stat_type[number]);
    stat1[stat_type[number]] += upstat;
    hirou += 10; stress += 5;
    document.getElementsByClassName("message_box").item(2).innerHTML = log[number]+"が" + upstat + "上がりました";
    onajidousa();
}

function trayning_juu(number) {
    var stat_type= [[1,0,4],[4,2,1],[2,3,5],[5,0,2]];
    var log= [["「ちから」が","「ライフ」が","「回避」が"],["「回避」が","「かしこさ」が","「ちから」が"],
                ["「かしこさ」が","「命中」が","「丈夫さ」が"],["「丈夫さ」が","「ライフ」が","「かしこさ」が"]];
    var upstat;
    //プールバグ用if文
    if(number == 3) upstat = juutore(stat_type[number][1], stat_type[number][0]);
    else upstat = juutore(stat_type[number][0], stat_type[number][1]);
    
    stat1[stat_type[number][0]] += upstat[0]; //メインステ
    stat1[stat_type[number][1]] += upstat[1]; //サブステ
    stat1[stat_type[number][2]] -= upstat[2]; //下がるステ

    hirou += 15;stress += 12;
    
    document.getElementsByClassName("message_box").item(2).innerHTML = 
        log[number][0] + upstat[0] + "上がりました。" +
        log[number][1] + upstat[1] + "上がりました。" +
        log[number][2] + upstat[2] + "下がりました";
    onajidousa();
}

//修行

var Syugyou ={
    count :0,
    location_number : 0,
    need_stat_type:0,
    need_stat_value:0,
    upstat_type : 0,
    upstat_value : [0,0],
    location_name:["中国","韓国","キューバ","北朝鮮"],
    location_img:["img/china.png","img/korean.png","img/kyuba.png","img/north.png"],
    //ステ上昇関数
    upstat_func : function(main){
        //mainstatitiran = [適正による上昇値][ピークによる上昇値]
        var mainstatitiran = [
        [],
        [0, 4, 5, 7, 7, 9, 8, 7, 7, 5, 4],
        [0, 5, 6, 8, 8, 11, 10, 9, 8, 6, 5],
        [0, 5, 7, 9, 9, 12, 11, 10, 9, 7, 5],
        [0, 6, 8, 10, 10, 14, 13, 11, 10, 8, 6],
        [0, 7, 9, 12, 12, 17, 15, 13, 12, 9, 7]
        ],
        substatmax = [0, 3, 4, 5, 5, 6, 6, 5, 5, 4, 3];//ピークによる上昇値

        //メインステ上昇最大値
        var mainstat = mainstatitiran[stat2[main]][pieak];
        var substat = substatmax[pieak];
        var rnd = Math.floor(Math.random() * 5);
        mainstat -= rnd;
        mainstat = Math.max(mainstat, 2);
        substat -= rnd;
        substat = Math.max(substat, 1);
        return [mainstat, substat];
    },

    run : function(){
        var str="";
        var need_stat = [[200, 1], [280, 2], [400, 1], [500, 2]];
        Syugyou.count ++; 

        //技を覚える
        var rnd = Math.floor(Math.random() * 100); //確率乱数
        //25%かつ、その技を覚えていないかつ、必要ステを満たしている
        if (rnd < 25 && waza[Syugyou.location_number + 1][5] === 0 &&
        stat1[Syugyou.need_stat_type] >= Syugyou.need_stat_value) {
            str = "新しい技を覚えました。";
            waza[Syugyou.location_number + 1][5] = 1;
        }

        //ステータス上昇値[メインステ,ライフ] upstat_func(メインステの適正)
        pieakkeisan();
        var upstat_value = this.upstat_func(stat2[Syugyou.upstat_type]);
        stat1[Syugyou.upstat_type] += upstat_value[0]; //メインステ上昇
        stat1[0] += upstat_value[1]; //ライフ上昇
        
        //ログ
        var log = ["「命中」が", "「かしこさ」が", "「ちから」が", "「丈夫さ」が"];
        str = str + log[Syugyou.location_number] + upstat_value[0] + "上がりました。" +
        "「ライフ」が" + upstat_value[1] + "上がりました。";
        document.getElementsByClassName("message_box").item(2).innerHTML =　str;

        hirou += 18; stress += 7;

        //カウント4回なら終わる、それ以外は歳と日付回す
        if (Syugyou.count == 4) {
            closewindow2();
            onajidousa();
            document.getElementsByClassName("message_box").item(2).innerHTML = str + "修行地から帰宅しました。";
        }
        else {tosi ++; day ++;}
    },
    start: function(number){
        var upstat_type = [3, 2, 1, 5]; //上がる能力値
        var need_stat = [[200, 1], [280, 2], [400, 1], [500, 2]]; //必要ステ
        if (money <= 1500) {
            document.getElementsByClassName("message_box").item(0).innerHTML = "お金がないぞ";
        } else {
            closewindow(); //ウインドウ1を閉じる
            openwindow2(0); //修行ウインドウを開く
            moneycount(1500);
            Syugyou.count = 0; //カウントリセット
            Syugyou.location_number = number; //修行地セット
            Syugyou.upstat_type = upstat_type[number]; //上昇ステセット
            Syugyou.need_stat_type = need_stat[number][1]; //必要ステセット
            Syugyou.need_stat_value = need_stat[number][0]; //必要ステセット
            document.getElementsByName("syugyou").item(0).innerHTML = "修行地 "+this.location_name[number];
            document.getElementsByName("syugyou").item(1).src = this.location_img[number];
            document.getElementsByClassName("message_box").item(2).innerHTML = "修行地に到着しました";
        }
    }
};

function reset() {
    if(money === 0) moneycount(-5000);
    jumyou = 350;
    saidaijumyou = jumyou;
    tosi = 0;
    hirou = 0;
    stress = 0;
    stat1 = [110, 100, 120, 140, 150, 130];
    stat2 = [3, 3, 3, 4, 4, 4, 12, 8];
    itemcount = 0;
    monsterrank = 0;
    end_flag =0;
    battlemodeimage = "img/battlemode.png";
    //技習得をリセット
    for (var i = 1; i < waza.length; i++) {
        waza[i][5] = 0;
    }
    //メニューボタンを戻す
    var length = document.getElementsByClassName("breed_menu cercle").length;
    for (i = 0; i < length; i++) {
        document.getElementsByClassName("breed_menu cercle").item(i).style.display = "block";
    }
    //復活ボタンを隠す
    document.getElementById("rebirth").style.display = "none";
    koruto();
    pieakkeisan();
}

window.onload = function () {
    daycount(); //日付表示
    moneycount(0); //所持金表示
    koruto(); //アドバイス表示
};

