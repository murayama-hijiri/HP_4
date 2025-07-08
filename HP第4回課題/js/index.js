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
// カレンダー
let currentDate = new Date();
let targetInput = null;
let selectedDate = null;

// カレンダー関数
function createCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // 年月表示
    $(".calendar_header").text(`${year} / ${month + 1}月`);

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let html = "<table><tr>";
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    $.each(days, function (i, d) {
        let className = "";
        if (i === 0) className = "sun";
        if (i === 6) className = "sat";
        html += `<th class="${className}">${d}</th>`;
    });
    html += "</tr><tr>";

    for (let i = 0; i < firstDay; i++) {
        html += "<td></td>";
    }

    for (let day = 1; day <= lastDate; day++) {
        let className = "day";

        if (
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day
        ) {
            className += " selected";
        }

        html += `<td class="${className}">${day}</td>`;
        if ((firstDay + day) % 7 === 0) {
            html += "</tr><tr>";
        }
    }

    html += "</tr></table>";

    $(".custom_calendar").html(html);
}
// inputのバリューを取得する関数
function getInputDate(value) {
    const input_date = value.match(/(\d{4})年(\d{2})月(\d{2})日/);
    if (!input_date) return null;
    const [_, year, month, day] = input_date;
    return new Date(Number(year), Number(month) - 1, Number(day));
}

// カレンダーボタン
$(".prev").on("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    createCalendar(currentDate);
});

$(".next").on("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    createCalendar(currentDate);
});

// カレンダー表示
$("input.calendar").on("click", function () {
    $(".calendar_wrapper").hide();

    targetInput = this;

    const value = $(this).val();
    const parsedDate = getInputDate(value);
    if (parsedDate) {
        selectedDate = parsedDate;
        currentDate = new Date(parsedDate);
    } else {
        selectedDate = new Date();
        currentDate = new Date();
    }

    $(this).closest(".input_parts").find(".calendar_wrapper").css({
        display: "flex",
    });

    createCalendar(currentDate);
});

// inputに反映
$(document).on("click", ".day", function () {
    $(".day").removeClass("selected");
    $(this).addClass("selected");

    const day = $(this).text();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formatted = `${year}年${String(month).padStart(2, "0")}月${String(
        day
    ).padStart(2, "0")}日`;
    selectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
    );

    if (targetInput) {
        $(targetInput).val(formatted);
    }
    $(".calendar_wrapper").hide();
});

// カレンダーを閉じる
$(document).on("click", function (e) {
    if (!$(e.target).closest(".calendar_wrapper, input.calendar").length) {
        $(".calendar_wrapper").hide();
    }
});

// 初期表示
createCalendar(currentDate);
