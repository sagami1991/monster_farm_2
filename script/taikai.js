var battlemodeimage = "img/battlemode.png";

var rank_convert_fnc= {
    damage : function(value){
        if(value<10) return "Ｅ";
        else if(value<20) return "Ｄ";
        else if(value<30) return "Ｃ";
        else if(value<40) return "Ｂ";
        else if(value<50) return "Ａ";
        else return "Ｓ";
    },
    acc : function(value){
        if     (value<-14) return "Ｅ";
        else if(value< -4) return "Ｄ";
        else if(value< 1 ) return "Ｃ";
        else if(value< 5 ) return "Ｂ";
        else if(value< 15) return "Ａ";
        else               return "Ｓ";
    },
    type : function(value){
        if (value == 1) return "ちから";
        else    return "かしこさ";
    }
};
var Skill_rank_convert = function(damage,acc,type){
    this.damage = rank_convert_fnc.damage(damage);
    this.acc = rank_convert_fnc.acc(acc);
    this.type = rank_convert_fnc.type(type);
};

var Skill = function(name,guts,damage,acc,type,unknown,image,master){
    this.name =name;
    this.guts =guts;
    this.damage =damage;
    this.acc = acc;
    this.type = type;
    this.unknown = unknown;
    this.imagesrc = image;
    this.master = master;
    this.rank = new Skill_rank_convert(damage,acc,type);
};

var enemy_skill = {
    0: new Skill("石直球", 12, 12, -5, 1, 1, "img/enemy_skill/0.gif",0),
    1: new Skill("靭帯断裂", 20, 21, 13, 1, 0, "img/enemy_skill/1.gif",0),
    2: new Skill("レーザービーム", 23, 39, -5, 2, 0, "img/enemy_skill/2.gif",0),
    3: new Skill("スーパーシュート", 35, 45, -5, 1, 0, "img/enemy_skill/3.gif",0),
    4: new Skill("バブルこうせん", 40, 50, 5, 2, 0, "img/enemy_skill/4.gif",0),
    5: new Skill("ジャジャン拳", 37, 55, 7, 1, 0, "img/enemy_skill/5.gif",0)
};

var Enemy = function(name,enemystat,image){
    this.name =name;
    this.stat =enemystat;
    this.imagesrc = image;
};

var enemy = {
    0 : {
        0:new Enemy("オータ",[88, 103, 127, 152, 144, 77, 16, 6],"img/enemy/00.jpg"),
        1:new Enemy("ハヤタ",[156, 107, 94, 149, 133, 133, 16, 6],"img/enemy/01.jpg"),
        2:new Enemy("フクドメ",[121, 96, 150, 129, 86, 95, 16, 6],"img/enemy/02.jpg"),
        3:new Enemy("ドーバヤシ",[199, 158, 23, 55, 147, 81, 16, 6],"img/enemy/03.jpg"),
    },
    1 : {
        0:new Enemy("オーシマ",[215, 31, 168, 169, 114, 40, 14, 7],"img/enemy/10.jpg"),
        1:new Enemy("オーセラ",[123, 165, 158, 195, 111, 217, 14, 7],"img/enemy/11.jpg"),
        2:new Enemy("セペダ",[161, 188, 194, 215, 167, 202, 14, 7],"img/enemy/12.jpg"),
        3:new Enemy("エルドレッド",[275, 223, 45, 99, 49, 182, 14, 7],"img/enemy/13.jpg"),
    },
    2 : {
        0:new Enemy("キクチ",[111, 75, 293, 321, 369, 95, 12, 8],"img/enemy/20.jpg"),
        1:new Enemy("マル",[199, 295, 43, 366, 117, 117, 12, 8],"img/enemy/21.jpg"),
        2:new Enemy("カジタニ",[355, 308, 135, 195, 178, 199, 12, 8],"img/enemy/22.jpg"),
        3:new Enemy("トリタニ",[265, 275, 184, 266, 190, 309, 12, 8],"img/enemy/23.jpg"),
    },
    3 : {
        0:new Enemy("ムラタ",[290, 375, 311, 369, 357, 242, 10, 9],"img/enemy/30.jpg"),
        1:new Enemy("マートン",[225, 405, 213, 366, 310, 144, 10, 9],"img/enemy/31.jpg"),
        2:new Enemy("ワダ",[420, 456, 345, 391, 144, 190, 10, 9],"img/enemy/32.jpg"),
        3:new Enemy("ツツゴウ",[270, 246, 369, 491, 312, 189, 10, 9],"img/enemy/33.jpg"),
    },
    4 : {
        0:new Enemy("マエケン",[346, 338, 571, 515, 205, 157, 8, 10],"img/enemy/40.jpg"),
        1:new Enemy("バレンティン",[485, 611, 219, 174, 206, 321, 8, 10],"img/enemy/41.jpg"),
        2:new Enemy("スガノ",[404, 481, 527, 542, 199, 288, 8, 10],"img/enemy/42.jpg"),
        3:new Enemy("グリエル",[464, 607, 615, 351, 223, 333, 8, 10],"img/enemy/43.jpg"),
    },
    5 : {
        0:new Enemy("オスンファン",[595, 668, 285, 318, 258, 602, 7, 10],"img/enemy/50.jpg"),
        1:new Enemy("イワクマ",[705, 361, 561, 524, 466, 398, 7, 10],"img/enemy/51.jpg"),
        2:new Enemy("タナカ",[505, 431, 727, 710, 404, 271, 7, 10],"img/enemy/52.jpg"),
        3:new Enemy("ダルビッシュ",[751, 723, 251, 364, 701, 279, 7, 10],"img/enemy/53.jpg"),
    }
};

var Battle ={
    interval:null, //setintervalを止めるための変数
    total_time:0, //経過時間
    limit_time_max:null, //制限時間
    limit_time_now:null,//残り時間
    damage_tmp:null, //ダメージ値一時保存メモリ
    kiken_flag:null, //棄権する
    //敵情報
    enemy:{
        nowhp: null,
        nowhp_per:null,
        stat:null,
        acc:null,
        realacc: null,
        guts: null,
        name: null,
        image: new Image(),
        skill_Obj : null,
        gutsup_lasttime:null,
        atk_time:null,
        atk_flag:null,
        hit_flag:null,
        Input : function(stat,name,image){
            this.stat = stat;
            this.nowhp = stat[0];
            this.nowhp_per = this.nowhp / this.stat[0] * 100;
            this.guts = 50;
            this.name =name;
            this.image.src = image;
            this.skill_Obj = enemy_skill[Taikai.rank];
            //技画像読み込み
            this.skill_Obj.image = new Image();
            this.skill_Obj.image.src = this.skill_Obj.imagesrc;
            this.atk_flag=0;
            this.hit_flag=0;
        },
        Input2 : function(){
            this.acc = 4 * (this.stat[3] - Battle.myself.stat[4]) / 50 + 50;
            this.realacc = this.acc + (this.guts / this.stat[7]) - 
                                    (Battle.myself.guts / stat2[7]);

        }

    },
    //自分の情報
    myself:{
        nowhp: null,
        nowhp_per:null,
        stat:null,
        acc:null,
        realacc: null,
        guts: null,
        name: "なんJ民",
        image: new Image(),
        skill_Obj : null,
        gutsup_lasttime:null,
        atk_time:null,
        atk_flag:null,
        hit_flag:null,
        skill_number:null,
        Input : function(){
            this.stat =stat1;
            //ガッツ情報をステータス配列に追加
            this.stat.push(stat2[6]);
            this.stat.push(stat2[7]);
            this.nowhp = stat1[0];
            this.nowhp_per = this.nowhp / this.stat[0] * 100;
            this.guts = 50;
            this.name ="なんJ民";
            this.image.src = battlemodeimage;
            this.atk_flag=0;
            this.hit_flag=0;
            this.atk_time = 0;
        },
        Input2 : function(){
            this.acc = 4 * (this.stat[3] - Battle.enemy.stat[4]) / 50 + 50;
            this.realacc = this.acc + (this.guts / stat2[7]) - 
                                    (Battle.enemy.guts / Battle.enemy.stat[7]);
            this.image.src = battlemodeimage;
            this.skill_Obj = { //技オブジェクト入れる
                0: new Skill(waza[0][0],waza[0][1],waza[0][2],waza[0][3],waza[0][4],null,waza[0][6],waza[0][5]),
                1: new Skill(waza[1][0],waza[1][1],waza[1][2],waza[1][3],waza[1][4],null,waza[1][6],waza[1][5]),
                2: new Skill(waza[2][0],waza[2][1],waza[2][2],waza[2][3],waza[2][4],null,waza[2][6],waza[2][5]),
                3: new Skill(waza[3][0],waza[3][1],waza[3][2],waza[3][3],waza[3][4],null,waza[3][6],waza[3][5]),
                4: new Skill(waza[4][0],waza[4][1],waza[4][2],waza[4][3],waza[4][4],null,waza[4][6],waza[4][5])
            };
            //覚えている技のみ画像データ読み込ませる
            for (var i = 0; i < this.skill_Obj.length; i++) {
                if(waza[i][5]==1) this.skill_Obj[i].image.src =(waza[i][6]);
            }
        }
    },
    //ガッツ回復＆命中率再計算関数
    update_guts :function(my,you){
        if (this.total_time > Battle[my].gutsup_lasttime + Battle[my].stat[6] * 1000 / 30 &&
             Battle[my].atk_flag === 0) {
            Battle[my].guts ++;
            //命中率計算
            Battle[my].realacc = Battle[my].acc + (Battle[my].guts / Battle[my].stat[7]) - 
                                    (Battle[you].guts / Battle[you].stat[7]);
            Battle[my].guts = Math.min(99, Battle[my].guts);
            Battle[my].gutsup_lasttime = new Date().getTime();
        }
    },
    //敵用攻撃フラグ作成
    atk_flag_make : function(){
        if (Battle.enemy.atk_time + 1500 < Battle.total_time && //現在時間が、敵の攻撃を終えて1500ms経っていたら
            Battle.myself.atk_time + 500 < Battle.total_time && //自分が攻撃を終えてから500ms経っていたら
            Battle.enemy.guts > 40 && //敵のガッツが40以上なら
            Battle.myself.atk_flag === 0 && Battle.enemy.atk_flag === 0 &&//自分または相手が攻撃中でなければ
            Battle.enemy.skill_Obj.guts < Battle.enemy.guts //ガッツあれば
            ) { 
                Battle.enemy.atk_flag =1;//atkフラグを1に
        }
    },
    atk_start :function(my,you,skill_number,item){
        
        if (Battle[my].atk_flag == 1) { //atkフラグ1なら攻撃
            Battle[my].atk_flag =2;　//atkフラグを2に
            //atk_time設定 この時間終了まで攻撃画面
            Battle[my].atk_time = new Date().getTime() + 4000;
            //ひたすらダメージ計算
            var damage;
            var skill_Obj;
            if (my == "enemy") skill_Obj = Battle[my].skill_Obj;
            else               skill_Obj = Battle[my].skill_Obj[skill_number];
            damage = Battle[my].stat[skill_Obj.type] / 50; //技タイプのちからかかしこさの値÷50
            //かしこさか力多い方、敵のみ適用
            if (my == "enemy") damage = Math.max(Battle[my].stat[2], Battle[my].stat[1]) / 50 ;
            def = (2 * Battle[you].stat[5] + Battle[you].stat[skill_Obj.type]) / 150; //丈夫さ＋ちからorかしこさ
            def = Math.floor(def);
            damage = (damage + 1) * (damage - def + 10) / 30;
            damage = Math.max(damage, 0.2);
            damage = Math.min(damage, 15);
            damage = damage * skill_Obj.damage;
            damage = damage + damage * (Battle[my].guts - Battle[you].guts) / 200;
            damage = Math.ceil(damage);
            damage = Math.max(damage, 0);
            Battle.damage_tmp = damage;
            //ダメージ計算終了

            //命中率算出
            Battle[my].realacc += skill_Obj.acc;
            //ガッツ消費
            Battle[my].guts -= skill_Obj.guts;
            //画像描写
            document.getElementsByName('battle_image').item(item).src = skill_Obj.imagesrc;
            //技名描写
            document.getElementsByName("skill_name").item(item).innerHTML = skill_Obj.name;
            //技ボタン非表示
            document.getElementById("battle_skill").style.display = "none";
            //命中判定
            var rnd = Math.floor(Math.random() * 100);
            if (rnd < Battle[my].realacc) Battle[my].hit_flag =1;
            else Battle[my].hit_flag =0;
        }
            
    },
    //攻撃終了、ダメージ与える
    atk_end : function(my,you,item){
        if (Battle[my].atk_time < Battle.total_time && Battle[my].atk_flag == 2) { //atkflag2で攻撃終了してたら開始
            //atkflag0にする
            Battle[my].atk_flag = 0;
            //画像描写直す
            document.getElementsByName('battle_image').item(item).src = Battle[my].image.src;
            //全ボタン復活
            document.getElementById("battle_skill").style.display = "block";
            //技名表示削除
            document.getElementsByName("skill_name").item(item).innerHTML = "";
            //命中判定
            var log;
            if (Battle[my].hit_flag === 1) { //命中判定1の場合
                //ダメージ与える
                Battle[you].nowhp -= Battle.damage_tmp;
                Battle[you].nowhp = Math.max(0, Battle[you].nowhp); //0以下は0に
                //HP割合計算
                Battle[you].nowhp_per = Battle[you].nowhp / Battle[you].stat[0] * 100;
                //HP描写
                this.draw_hpbar(you);
                //ログ
                log = Battle[my].name + "は"+ Battle[you].name +"に" + Battle.damage_tmp + "のダメージを与えた。";
            }else if (Battle[my].hit_flag === 0) {
                log = Battle[my].name + "の攻撃ははずれた。";
            }
            //ログ表示
            document.getElementsByClassName("message_box").item(2).innerHTML = log;
        }
    },
    result_draw : function(canvasid,result,hp){ 
        var canvas = document.getElementById(canvasid);
        var ctx = canvas.getContext('2d');
        //win or lose の表示
        ctx.font = '50px mplus-1p-regular';
        ctx.lineWidth = 4;
        if(result=="win") ctx.strokeStyle = 'blue';
        else                ctx.strokeStyle = 'red';
        ctx.fillStyle = "white";
        ctx.strokeText(result, 70, 120);
        ctx.fillText(result, 70, 120);
        //HP割合表示
        ctx.strokeStyle = "rgba(102, 51, 0, 1)";
        ctx.font = '24px mplus-1p-regular';
        ctx.strokeText(hp, 40, 30);
        ctx.fillText(hp, 40, 30);



    },
    end :function(){
        if (this.limit_time_now < 0 && this.enemy.atk_flag + this.myself.atk_flag === 0 ||
            this.myself.nowhp === 0 || this.enemy.nowhp ===0 || this.kiken_flag == 1) {
            clearInterval(Battle.interval); //フレーム動作終了
            //atkフラグを0にする
            Battle.enemy.atk_flag =0;
            Battle.myself.atk_flag =0;
            //hp割合再計算
            Battle.enemy.nowhp_per = Battle.enemy.nowhp / Battle.enemy.stat[0] * 100;
            Battle.myself.nowhp_per = Battle.myself.nowhp / Battle.myself.stat[0] * 100;
            //ステータスウインドウ表示
            document.getElementById("battle_display").style.display="none";
            document.getElementsByClassName("battle_stat").item(0).style.display="block";
            //メッセージ保存
            var tmp = document.getElementsByClassName("message_box").item(2).innerHTML;

            //KOの場合
            if(this.myself.nowhp === 0 || this.enemy.nowhp ===0){
                document.getElementById("battle_result").innerHTML = "Ｋ.Ｏ.";
            //棄権の場合
            }else if(this.kiken_flag == 1){
                document.getElementById("battle_result").innerHTML = "棄権負け";
                tmp ="";
            }
            //タイムアップ
            else{
                document.getElementById("battle_result").innerHTML = "タイムアップ";
                tmp ="";
            }
            var str=[];
            str[0] = "HP：" + Battle.myself.nowhp_per.toFixed(2) + "％";
            str[1] = "HP：" + Battle.enemy.nowhp_per.toFixed(2) + "％";
            if (this.myself.nowhp_per > this.enemy.nowhp_per && this.kiken_flag === 0) {
                Taikai.win_count ++;
                //結果表示
                this.result_draw("myimage","win",str[0]);
                this.result_draw("enemyimage","lose",str[1]);
                tmp = tmp + "なんJ民は勝利した。";
            } else {
                Taikai.lose_count ++;
                Battle.result_draw("myimage","lose",str[0]);
                Battle.result_draw("enemyimage","win",str[1]);
                tmp = tmp + "なんJ民は敗北した。";
            }
            document.getElementsByClassName("message_box").item(2).innerHTML = tmp;
            //4回戦ったら、結果ボタンを表示、それ以外はnextボタン
            if (Taikai.round_count == 3){
                document.getElementById("result_button").style.display="block";
            }else{
                document.getElementById("next_battle").style.display="block";

            }
        }
    },
    //毎フレームの動作 30ms毎に実行
    update : function(){
        //現在の時刻取得
        Battle.total_time = new Date().getTime();
        //残り時間計算
        Battle.limit_time_now = (Battle.limit_time_max - new Date().getTime()) / 1000;
        //タイムアップorKO判定
        Battle.end();
        //敵の攻撃フラグ生成
        Battle.atk_flag_make();

        //攻撃処理
        Battle.atk_start("myself","enemy",Battle.myself.skill_number,0);
        Battle.atk_start("enemy","myself",null,1);

        //攻撃終了処理
        Battle.atk_end("myself","enemy",0);
        Battle.atk_end("enemy","myself",1);

        //もしガッツ回復条件満たしていればガッツ回復
        Battle.update_guts("myself","enemy");
        Battle.update_guts("enemy","myself");

        //情報描写
        document.getElementById("timecount").innerHTML = Math.ceil(Battle.limit_time_now);
        document.getElementsByName("acc").item(0).innerHTML = Math.ceil(Battle.myself.realacc) + "%";
        document.getElementsByName("acc").item(1).innerHTML = Math.ceil(Battle.enemy.realacc) + "%";
        document.getElementsByName("guts").item(0).innerHTML = Battle.myself.guts;
        document.getElementsByName("guts").item(1).innerHTML = Battle.enemy.guts;

    },
    atk_flag_set: function(skill_number){
        if(this.myself.guts > this.myself.skill_Obj[skill_number].guts){
            this.myself.atk_flag =1;
            this.myself.skill_number =skill_number;
        }else{
            document.getElementsByClassName("message_box").item(2).innerHTML = "やる気が足りないぞ";
        }
    },
    //棄権
    kiken: function(){
        this.kiken_flag = 1;
    },
    //技情報表示
    skill_info : function(propaty,number){
        element = document.getElementById("skill_info");
        element.innerHTML = this.myself.skill_Obj[number].name +
            "<br>タイプ："+ this.myself.skill_Obj[number].rank.type +
            "　消費：" + this.myself.skill_Obj[number].guts +
            "<br>威力：" + this.myself.skill_Obj[number].rank.damage +
            "　命中：" + this.myself.skill_Obj[number].rank.acc;
    },
    skill_info_kill : function(){
        document.getElementById("skill_info").innerHTML = "";
    },
    //hpバー描写
    draw_hpbar : function(propaty){
        var value = {
            myself : {
                item:0,
                nowhp: Battle.myself.nowhp,
                maxhp: Battle.myself.stat[0],
                image: Battle.myself.image
            },
            enemy : {
                item:1,
                nowhp: Battle.enemy.nowhp,
                maxhp: Battle.enemy.stat[0],
                image: Battle.enemy.image
            }
        };
        //hpバー描写
        context = document.getElementsByName('hp_bar').item(value[propaty].item).getContext('2d');
        //幅200pxで黒色描写
        context.fillStyle = "rgba(102, 51, 0, 1)";
        context.fillRect(9, 3, 202, 15);
        //幅：現在HP/最大HP * 200
        var hp_width = Math.ceil(value[propaty].nowhp / value[propaty].maxhp *200);
        context.fillStyle = "red";
        context.fillRect(10, 4, hp_width, 13);
        context.font = '14px mplus-1p-regular';
        context.lineWidth = 1.5;
        context.strokeStyle = "rgba(102, 51, 0, 1)";
        context.fillStyle = "white";
        context.strokeText("(" + value[propaty].nowhp + "/" + value[propaty].maxhp+ ")", 12, 15);
        context.fillText("(" + value[propaty].nowhp + "/" + value[propaty].maxhp + ")", 12, 15);
    },

    //戦闘のスタート
    start : function(){
        //ステータスウインドウ非表示
        document.getElementsByClassName("battle_stat").item(0).style.display="none";
        document.getElementById("battle_display").style.display="block";
        //スタートボタン非表示
        document.getElementById("battle_start").style.display="none";
        //棄権ボタンや技表示
        document.getElementById("battle_skill").style.display = "block";
        document.getElementById("bottom_info").style.display="block";
        //技名表示削除
        document.getElementsByName("skill_name").item(0).innerHTML = "";
        document.getElementsByName("skill_name").item(1).innerHTML = "";
        //棄権フラグリセット
        this.kiken_flag = 0;
        //hpバー描写
        this.draw_hpbar('enemy');
        this.draw_hpbar('myself');
        //戦闘画像描写
        document.getElementsByName('battle_image').item(0).src = this.myself.image.src;
        document.getElementsByName('battle_image').item(1).src = this.enemy.image.src;
        //ログ削除
        document.getElementsByClassName("message_box").item(2).innerHTML　="";
        //制限時間50秒
        this.limit_time_max = new Date().getTime() + 50000;
        //最後にガッツが上がった時間指定
        this.myself.gutsup_lasttime = new Date().getTime();
        this.enemy.gutsup_lasttime= new Date().getTime();
        //一番最初に敵が攻撃するまでの時間2秒
        this.enemy.atk_time = new Date().getTime() + 2000;
        //フレーム動作開始
        this.interval = setInterval(Battle.update, 30);

    }
};

var Taikai ={
    round_count : 0,
    rank : 0,
    lose_count : 0,
    win_count : 0,
    next : function(){
        this.round_count++;
        this.battle_before();
        document.getElementById('next_battle').style.display ="none"; //次へボタン削除
        //ログ
        var rest_match = 4 - this.round_count;
        document.getElementsByClassName("message_box").item(2).innerHTML = "残り"+rest_match+ "試合";
    },

    draw_statmeter : function(propaty){
        var value = {
            myself : {
                x2:215,
                element:"my_mertar",
                stat:stat1
            },
            enemy : {
                x2:5,
                element:"enemy_mertar",
                stat:enemy[this.rank][this.round_count].stat
            }
        };
        var context = document.getElementsByName(value[propaty].element);
        //それぞれのメーターの色
        var meter_color =["gold","red","rgba(0, 164, 0, 1)","rgba(192, 59, 179, 1)","aqua","blue"];
        for (i = 0; i < 6; i++) {
            context.item(i).getContext('2d').clearRect(0,0,context.item(i).width,context.item(i).height);
            //色を与え、ステータスの値の長さで描写する
            context.item(i).getContext('2d').fillStyle =  meter_color[i];
            if(propaty == 'myself') {
                context.item(i).getContext('2d').fillRect(240 - value[propaty].stat[i]/5, 2, value[propaty].stat[i] / 5, 13);
            }else{
                context.item(i).getContext('2d').fillRect(0, 2, value[propaty].stat[i] / 5, 13);
            }
            context.item(i).getContext('2d').fillStyle = "white";
            context.item(i).getContext('2d').strokeStyle = "rgba(102, 51, 0, 1)";
            context.item(i).getContext('2d').font = '14px mplus-1p-regular';
            context.item(i).getContext('2d').lineWidth = 3;
            context.item(i).getContext('2d').textBaseline = "top";
            context.item(i).getContext('2d').strokeText(value[propaty].stat[i],value[propaty].x2,0);
            context.item(i).getContext('2d').fillText(value[propaty].stat[i],value[propaty].x2,0);
        }
    },
    start_draw : function(canvasid,imgsrc,monstername){
        //画像描写
        var canvas = document.getElementById(canvasid);
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = imgsrc;
        ctx.drawImage(img, 0, 0,240,240);
        ctx.font = '24px mplus-1p-regular';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = "white";
        ctx.strokeText(monstername, 15, 230);
        ctx.fillText(monstername, 15, 230);
    },

    //画像予め読み込み用関数
    image_load_count : 0,
    loader : function(max_count){
        this.image_load_count++;
        if(this.image_load_count == max_count){
            console.log("All images loaded!");
            this.start_draw('myimage',Battle.myself.image.src,"なんJ民");
            this.start_draw('enemyimage', Battle.enemy.image.src, Battle.enemy.name);
            this.image_load_count = 0;
            document.getElementById("battle_start").style.display ="block";
        }
    },
    //画像予め読み込む
    read_image :function(){
        //読み込むリスト 自画像,敵画像,敵攻撃gif
        var src =[Battle.myself.image.src, Battle.enemy.image.src, Battle.enemy.skill_Obj.image.src];
        //覚えてる技のみ追加
        for (var i = 0; i < waza.length; i++) {
            if(waza[i][5]==1) src.push(waza[i][6]);
        }
        //urlセット
        var images = [];
        var cnt=0;
        for (i in src) {
            images[i] = new Image();
            images[i].src = src[i];
            cnt++;
        }
        //ロード
        for (i in images) {
            images[i].onload = function(){Taikai.loader(cnt);};
        }

    },
    battle_before : function(){
        //ステータスウインドウ表示、開始ボタン一時的に削除
        document.getElementById("battle_display").style.display="none";
        document.getElementsByClassName("battle_stat").item(0).style.display="block";
        document.getElementById("battle_start").style.display ="none";
        var round_count = this.round_count+1;
        document.getElementById("battle_result").innerHTML = round_count +"回戦";
        //nextボタンと終了ボタン非表示
        document.getElementById("end_battle").style.display="none";
        document.getElementById("next_battle").style.display="none";
        document.getElementById("result_button").style.display="none";
        //戦闘情報に代入
        enemyObj = enemy[this.rank][this.round_count];
        Battle.myself.Input();
        Battle.enemy.Input(enemyObj.stat, enemyObj.name, enemyObj.imagesrc);
        Battle.myself.Input2();
        Battle.enemy.Input2();
        //画像読み込み終了したら画像表示しボタン表示
        this.read_image();
        this.draw_statmeter('myself');
        this.draw_statmeter('enemy');

    },
    start : function(rank){
        this.rank =rank;
        this.lose_count = 0; //負けカウントリセット
        this.win_count = 0; //勝ちカウントリセット
        this.round_count = 0; //戦闘カウントリセット
        closewindow(); //ウインドウ1を閉じる
        openwindow2(1); //大会ウインドウを開く
        document.getElementsByClassName("message_box").item(2).innerHTML = ""; //ログ削除
        //覚えている技のみ開く
        for (var i = 0; i < 5; i++) {
            if (waza[i][5] === 1) document.getElementsByClassName("skill_button").item(i).style.display = "inline";
            else document.getElementsByClassName("skill_button").item(i).style.display = "none";
        }
        this.battle_before();

    },
    backhome :function(){
        closewindow2();
        document.getElementsByClassName("message_box").item(2).innerHTML = "大会から帰宅しました。";
        onajidousa();
    },
    endlog : function(){
        var tmplog =  this.win_count + "勝"+this.lose_count + "敗だった。";
        var prize= [];
        //優勝なら
        if (this.win_count == 4) {
            prize = [1000,1500,2500,4000,6000,10000];
            money += prize[this.rank];
            tmplog = tmplog + "賞金" + prize[this.rank] + "円を獲得した。";
            stress = stress - 50;
            hirou = hirou + 30;
            //ランクアップ処理
            if (this.rank +1 > monsterrank) {
                var rank_array = ["E","D","C","B","A","S"];
                monsterrank = this.rank +1;
                tmplog = tmplog + "ランクが" + rank_array[this.rank] +"ランクに上がった。";
                if(this.rank < 5) tmplog = tmplog + "新しい大会が開放された。";
                if(this.rank === 0 || this.rank == 1 || this.rank ==3 ) tmplog = tmplog + "新しい修行地が開放された。";
                //Eランクアンロック
                if(this.rank === 0 && unlock_flag.food0 === 0){
                    unlock_flag.food0 = 1;
                    tmplog = tmplog + "新しい毎月の食事が追加された。";
                }
                //Dランクアンロック
                if(this.rank == 1 && unlock_flag.food1 === 0){
                    unlock_flag.food1 = 1;
                    unlock_flag.item0 = 1;
                    tmplog = tmplog + "新しいアイテムがアンロックされた。新しい毎月の食事が追加された。";
                }
                //Cランクアンロック
                if(this.rank == 2 && unlock_flag.food2 === 0){
                    unlock_flag.food2 = 1;
                    unlock_flag.item1 = 1;
                    tmplog = tmplog + "新しいアイテムがアンロックされた。新しい毎月の食事が追加された。";
                }

                //Sランクアンロック
                if(this.rank ==5) {
                    if(unlock_flag.saisei === 0){
                        unlock_flag.saisei = 1;
                        tmplog = tmplog + "再生場がアンロックされた。";
                    }
                    if(unlock_flag.hidden_stat === 0){
                        unlock_flag.hidden_stat = 1;
                        tmplog = tmplog + "隠しステータスが見れるようになった。";
                    }
                }
            }
        //2位なら
        }else if (this.win_count == 3){
            prize = [500,750,1200,2000,3000,5000];
            money += prize[this.rank];
            tmplog = tmplog + "賞金" + prize[this.rank] + "円を獲得した。";
            stress = stress - 50;
            hirou = hirou + 30;
        //それ以外
        }else {
            stress = stress - 30;
            hirou = hirou + 50;
        }
        moneycount(0);
        jumyou = jumyou - 3;
        //ログ表示
        document.getElementsByClassName("message_box").item(2).innerHTML = tmplog;
        //帰宅ボタン表示
        document.getElementById("result_button").style.display="none";
        document.getElementById("end_battle").style.display="block";

    }
};