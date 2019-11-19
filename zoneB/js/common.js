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
