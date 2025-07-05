// 写真、テキスト、ボタン変更
$(function () {
    $(".room_button").click(function () {
        $(".room_button").removeClass("active");
        $(".room_content_img img").removeClass("active");
        $(".room_content_main_text").removeClass("active");
        let id = $(this).attr("id");
        $(this).addClass("active");
        $("." + id).addClass("active");
    });
});
// バリデーション
$(function () {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const tel_pattern = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/;
    $(".submit_button").click(function () {
        $(".validation_text").text("");
        let validation_check = true;
        let email = $("#email").val();
        let tel = $("#tel").val();
        $("[required]").each(function () {
            let id = $(this).attr("id");
            let val = $(this).val();
            if (!val) {
                $(".validation_text." + id).text("＊入力必須です");
                validation_check = false;
            }
        });
        if (email && !email_pattern.test(email)) {
            $(".validation_text.email").text(
                "＊メールアドレスの形式が正しくありません"
            );
            validation_check = false;
        }

        if (tel && !tel_pattern.test(tel)) {
            $(".validation_text.tel").text(
                "＊電話番号の形式が正しくありません"
            );
            validation_check = false;
        }
        if (validation_check == false) {
            return false;
        }
    });
});
