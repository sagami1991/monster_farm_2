
var Summon = {
    imgsrc : null,
    stat1 : [],
    stat2 : [],
    display : function(){
        document.getElementById('syoukanowari').style.display = "none";
        document.getElementById("saiseigazou").src = "";
        document.getElementById('hyouji').innerHTML = "";
        for (var i = 0; i < 8; i++) {
            document.getElementsByName("para").item(i).innerHTML = "";
            document.getElementsByName('tekisei').item(i).innerHTML = "";
        }

    }

};

function syoukanowari() {
    for (var i = 0; i < 6; i++) {
        stat1[i] = Summon.stat1[i];
        stat2[i] = Summon.stat2[i];
    }
    stat2[6] = Summon.stat2[6];
    jumyou = Summon.stat2[7];
    saidaijumyou = jumyou;
    battlemodeimage = Summon.imgsrc;
    waza[1][5] = 0;
    waza[2][5] = 0;
    waza[3][5] = 0;
    waza[4][5] = 0;
    hirou = 0;
    tosi = 0;
    stress = 0;
    monsterrank = 0;
    koruto();
    statview();
    pieakkeisan();
    closewindow2();
}

function loadImg() {
    
    var xhr = new XMLHttpRequest(),
        statcreat = [],
        tekiseisuuji = [],
        stattekisei = [],
        firstword,
        hoseistat,
        i,
        rnd,
        len,
        imgUrl =  document.getElementById('gazouurl').value;
        xhr.open('GET', imgUrl, true);
        xhr.responseType = "arraybuffer";
        xhr.send();
        xhr.onerror = function (e) {
            Summon.display();
            document.getElementById('hyouji').innerHTML = "画像じゃないぞ";
        };
        xhr.onload = function (e) {
            var bytes = new Uint8Array(this.response),
                binaryData = "";
            for (i = 0, len = bytes.byteLength; i < len; i = i + 1) {
                binaryData += bytes[i].toString(16);
            }
            firstword = binaryData.substring(0, 4);
            //画像形式の確認
            if ( (firstword === "ffd8"  || firstword === "8950" ||
                 firstword === "4749" || firstword === "424d") && 
                 bytes.byteLength < 200000 ) {
                for (i = 0; i < 6; i = i + 1) {
                    hoseistat = binaryData.split("c").length - 1;
                    hoseistat = hoseistat % 20;
                    statcreat[i] = binaryData.split(i).length - 1;
                    if (statcreat[i] % 20 < 3) {
                        stattekisei[i] = "Ｅ";
                        tekiseisuuji[i] = 1;
                        hoseistat = 50 + hoseistat;
                    } else if (statcreat[i] % 20 < 8) {
                        stattekisei[i] = "Ｄ";
                        tekiseisuuji[i] = 2;
                        hoseistat = 70 + hoseistat;
                    } else if (statcreat[i] % 20 < 15) {
                        stattekisei[i] = "Ｃ";
                        tekiseisuuji[i] = 3;
                        hoseistat = 100 + hoseistat;
                    } else if (statcreat[i] % 20 < 19) {
                        stattekisei[i] = "Ｂ";
                        tekiseisuuji[i] = 4;
                        hoseistat = 140 + hoseistat;
                    } else {
                        stattekisei[i] = "Ａ";
                        tekiseisuuji[i] = 5;
                        hoseistat = 180 + hoseistat;
                    }
                    Summon.stat1[i] = hoseistat;
                    Summon.stat2[i] = tekiseisuuji[i];
                    document.getElementsByName("para").item(i).innerHTML = hoseistat;
                    document.getElementsByName('tekisei').item(i).innerHTML = stattekisei[i];
                }
                statcreat[6] = binaryData.split(6).length - 1;
                statcreat[7] = binaryData.split("a").length - 1;
                Summon.stat2[6] = statcreat[6] % 13 + 7;
                Summon.stat2[66] = 30 / Summon.stat2[6];
                Summon.stat2[66] = Summon.stat2[66].toFixed(2);
                document.getElementsByName('para').item(6).innerHTML =
                Summon.stat2[66] + "<br>(上昇/秒)";
                document.getElementsByName('para').item(7).innerHTML = statcreat[6] % 20 * 10 + 250;
                Summon.stat2[7] = statcreat[6] % 20 * 10 + 250;
                document.getElementById('syoukanowari').style.display = "block";
                document.getElementById('hyouji').innerHTML = "召喚したぞ";
                document.getElementById("saiseigazou").src = imgUrl;
                Summon.imgsrc = imgUrl;
                console.log(bytes.byteLength + "byte");
            } else if(bytes.byteLength >= 200000){
                document.getElementById('hyouji').innerHTML = "画像は200キロバイト以下にしてほしいぞ";
                document.getElementById('syoukanowari').style.display = "none";
            } else {
                document.getElementById('hyouji').innerHTML = "画像じゃないぞ";
                document.getElementById('syoukanowari').style.display = "none";
            }
        };
}