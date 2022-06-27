const url = 'https://jk12lovetypes.netlify.app';

function setShare() {
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = '십이간지 연애유형 결과'
    const shareDes = infoList[resultAlt].name;
    const shareImage = url + 'img/image-' + resultAlt + '.png';
    const shareURL = url + 'page.result-' + resultAlt + '.html';

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: shareTitle,
            description: shareDes,
            imageUrl: shareImage,
            link: {
                mobileWebUrl: shareURL,
                WebUrl: shareURL,
            },
        },
        itemContent: {
            profileText: 'Kakao',
            profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            titleImageText: 'Cheese cake',
            titleImageCategory: 'Cake',
            items: [
                {
                    item: 'Cake1',
                    itemOp: '1000원',
                },
                {
                    item: 'Cake2',
                    itemOp: '2000원',
                },
                {
                    item: 'Cake3',
                    itemOp: '3000원',
                },
                {
                    item: 'Cake4',
                    itemOp: '4000원',
                },
                {
                    item: 'Cake5',
                    itemOp: '5000원',
                },
            ],
            sum: '총 결제금액',
            sumOp: '15000원',
        },
        social: {
            likeCount: 10,
            commentCount: 20,
            sharedCount: 30,
        },
        buttons: [
            {
                title: '결과 확인하기',
                link: {
                    mobileWebUrl: shareURL,
                    WebUrl: shareURL
                },
            },
        ]
    });
}