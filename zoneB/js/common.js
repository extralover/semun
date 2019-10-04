$(document).ready(function () {
	// gnb 버튼
	$(".btn_gnb").on("click", function () {
		if ($(this).hasClass("on")) {
			if ($(window).width() <= 1280) {
				$("body").css({
					"height": "auto",
					"overflow": "visible"
				});
				$(".gnb").removeClass("on");
				setTimeout(function () {
					$(".btn_gnb").removeClass("on");
					$("header").removeClass("menu");
				}, 310)
			}
		} else {
			if ($(window).width() <= 1280) {
				$("body").css({
					"height": "100%",
					"overflow": "hidden"
				});
				$("header").addClass("menu");
				$(".btn_gnb").addClass("on");
				$(".gnb").addClass("on");
			}
		}
	});

	$(".cate_btns button").on("click", function () {
		var thisCate = $(this).attr("class");
		if (thisCate=="cate0") {
			$(".cate_list > li").show();
		} else {
			$(".cate_list > li").hide();
			$(".cate_list > li." + thisCate).show();
		}

		$(".cate_btns button").removeClass("on");
		$(this).addClass("on");
	});

	// 전화번호 변경
	$(".tel_wrap3 .btn_tel").on("click", function() {
		$(".tel_hide").toggle();
	})

	$(".checkbox_list .check_all").on("click", function() {
		var thisName = $(this).attr("name");
		if ($(this).is(":checked") == true) {
			$(".checkbox_list input[name='" + thisName +"']").prop("checked", true);
		} else {
			$(".checkbox_list input[name='" + thisName +"']").prop("checked", false);
		}
	})

	// input file
	var fileTarget = $('.filebox .upload-hidden');

	fileTarget.on('change', function () {
		if (window.FileReader) {
			// 파일명 추출
			var filename = $(this)[0].files[0].name;
		}

		else {
			// Old IE 파일명 추출
			var filename = $(this).val().split('/').pop().split('\\').pop();
		};

		$(this).siblings('.upload-name').val(filename);
	});

	//preview image
	var imgTarget = $('.preview-image .upload-hidden');

	imgTarget.on('change', function () {
		var parent = $(this).parent().parent();
		parent.children('.upload-display').remove();

		if (window.FileReader) {
			//image 파일만
			if (!$(this)[0].files[0].type.match(/image\//)) return;

			var reader = new FileReader();
			reader.onload = function (e) {
				var src = e.target.result;
				parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img src="' + src + '" class="upload-thumb"></div></div>');
			}
			reader.readAsDataURL($(this)[0].files[0]);
		}

		else {
			$(this)[0].select();
			$(this)[0].blur();
			var imgSrc = document.selection.createRange().text;
			parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');

			var img = $(this).siblings('.upload-display').find('img');
			img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\"" + imgSrc + "\")";
		}
	});

	// calendar
	var dateFormat = "yy-mm-dd",
		from = $("#from")
			.datepicker()
			.on("change", function () {
				to.datepicker("option", "minDate", getDate(this));
			}),
		to = $("#to").datepicker()
			.on("change", function () {
				from.datepicker("option", "maxDate", getDate(this));
			});

	function getDate(element) {
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}

		return date;
	}

	// 결제방법
	$(".pay_method .radio_list input[type='radio']").on("click", function() {
		if ($("#pay_card").is(":checked")) {
			$(".payCard").show();
			$(".payCash").hide();
		} else if ($("#pay_cash").is(":checked")) {
			$(".payCard").hide();
			$(".payCash").show();
		}
	});

	// 약관 팝업
	$(".openPop").on("click", function () {
		var thisHref = $(this).attr("href").substring(1);
		var thisTxt = $(this).text();
		$("body").css({
			"height": "100%",
			"overflow": "hidden"
		});
		$(".terms_pop").show();
		$(".terms_pop .pop_in." + thisHref + "").show();
		$(".terms_pop h3").text(thisTxt);
	});
	// 팝업 닫기
	$(".terms_pop .btn_pop").on("click", function () {
		$("body").css({
			"height": "auto",
			"overflow": "visible"
		});
		$(".terms_pop .pop_in").hide();
		$(".terms_pop").hide();
	});
	// 이용안내
	$(".info_use .txt button").on("click", function () {
		$(".info_use > li").removeClass("on");
		$(this).parent().parent("li").addClass("on");
		if ($(window).width() <= 1024) {
			var thisTop = $(this).position().top;
			$(window).scrollTop(thisTop);
		}
	});
});

// 주소 입력
function execDaumPostcode() {
	new daum.Postcode({
		oncomplete: function (data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var addr = ''; // 주소 변수
			var extraAddr = ''; // 참고항목 변수

			//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
			if (data.userSelectedType === 'R') {
				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
				if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
					extraAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if (data.buildingName !== '' && data.apartment === 'Y') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if (extraAddr !== '') {
					extraAddr = ' (' + extraAddr + ')';
				}
				// 조합된 참고항목을 해당 필드에 넣는다.
				document.getElementById("extraAddress").value = extraAddr;

			} else {
				document.getElementById("extraAddress").value = '';
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('postcode').value = data.zonecode;
			document.getElementById("address").value = addr;
			// 커서를 상세주소 필드로 이동한다.
			document.getElementById("detailAddress").focus();
		}
	}).open();
}