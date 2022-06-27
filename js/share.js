function kakaoShare() {
    Kakao.Link.sendCustom({
        templateId: ${ YOUR_TEMPLATE_ID },
        templateArgs: {
        'title': '제목 영역입니다.',
        'description': '설명 영역입니다.'
    }
    });
}