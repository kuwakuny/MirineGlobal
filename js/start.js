//document.querySelector()：入力したCSSセレクターと一致する最初のelementを取得
//querySelector(#id), qeurySelector(.class), querySelectorAll("#id,.class")
const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
//質問の数
const endPoint = 12;
//それぞれの点数を格納する配列
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//結果値を計算する。配列の中で最も大きな数をリターン
function calResult() {
    var result = select.indexOf(Math.max(...select));
    return result;
}
//結果を表示
function setResult() {
    //calResult()関数で計算された結果値を、point変数に格納
    let point = calResult();
    //.resultName要素を選択
    const resultName = document.querySelector('.resultName');
    //結果値に該当するinfoListのpoint番目のnameを、結果名に格納
    resultName.innerHTML = infoList[point].name;

    //HTMLにimgタグを作成し、resultImg変数宣言
    var resultImg = document.createElement('img');
    //.resultImg要素を選択
    const imgDiv = document.querySelector('#resultImg');
    //imgURL変数宣言。imgフォルダー内の、image-?.pngファイル
    var imgURL = 'img/image-' + point + '.png';
    //resultImgのソース指定
    resultImg.src = imgURL;
    //resultImgの代替テキスト
    resultImg.alt = point;
    //resultImgにBootstrapの「img-fluid」クラスを追加
    resultImg.classList.add('img-fluid');
    //resultImgをimgDivの最後の子リストに追加する
    imgDiv.appendChild(resultImg);

    //.resultDesc要素を選択
    const resultDesc = document.querySelector('.resultDesc');
    //結果値に該当するinfoListのpoint番目のdescを、結果詳細に格納
    resultDesc.innerHTML = infoList[point].desc;
}

//結果画面に遷移
function goResult() {
    //qna画面のfadeOut
    qna.style.WebkitAnimation = 'fadeOut 1s';
    qna.style.Animation = 'fadeOut 1s';
    //setTimeout(実行コード, ms)：ms秒後にタイマーが終わると実行される。
    //450ms後fadeInが1秒間実行され、その450ms後qnaが完全に見えなくなる。
    setTimeout(() => {
        result.style.WebkitAnimation = 'fadeIn 1s';
        result.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            qna.style.display = 'none';
            result.style.display = 'block';
        }, 450)
    }, 450);
    //結果内容表示
    setResult();
}

function addAnswer(answerText, qIdx, idx) {
    //.answerBox要素を選択
    var a = document.querySelector('.answerBox');
    //answerボタンHTMLタグを作成
    var answer = document.createElement('Button');
    //answerタグにクラス名を追加
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    //answerをaの最後の子リストに追加
    a.appendChild(answer);
    //answerボタンにanswerTextの引数を代入
    answer.innerHTML = answerText;
    //answerをクリックしたら起こるイベント
    answer.addEventListener('click', function () {
        //答えリスト選択
        var children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; i++) {
            //ボタンを押せなくする。
            children[i].disabled = true;
            //for文を回して答えリストをfadeOut
            children[i].style.WebkitAnimation = 'fadeOut 0.5s';
            children[i].style.Animation = 'fadeOut 0.5s';
        }
        //450msが過ぎたら、選択された答えに該当する動物の番号を +1
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }
            //答えリストを非表示
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            //次の質問へ
            goNext(++qIdx);
        }, 450);

    }, false);
}

function goNext(qIdx) {
    //質問が最後に達したら結果画面へ
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    //qBox選択
    var q = document.querySelector('.qBox');
    //qnaListの質問を代入
    q.innerHTML = qnaList[qIdx].q;
    //qnaListの答えを代入
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    //statusBar選択
    var status = document.querySelector('.statusBar');
    //statusBarをendPointでわけて進行状況表示
    status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}
//最初画面
function begin() {
    main.style.WebkitAnimation = 'fadeOut 1s';
    main.style.Animation = 'fadeOut 1s';
    setTimeout(() => {
        qna.style.WebkitAnimation = 'fadeIn 1s';
        qna.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            main.style.display = 'none';
            qna.style.display = 'block';
        }, 450)
        //質問の順番０から
        let qIdx = 0;
        //0番目の質問へ
        goNext(qIdx);
    }, 450)
}