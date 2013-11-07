var config = {
	url: "https://script.google.com/macros/s/AKfycbzcw8Gr8Z5lLA1b9CZtYm-1__Ymr8AHxygGtlyZL2NR3nhtO5Q/exec"
}

function checkAuth()
{
	$.ajax({
		url: config.url,
    data: {a: 'login'},
    dataType: "jsonp",
    jsonp: "c"
	})
		.done(function(jqxhr, textStatus, error) {
      showPage("page_main");
    })
		.fail(function(jqxhr, textStatus, error) {
      showPage("page_login");
      $("#btnLogin").click(function(e) {
        window.open(config.url, '_blank', 'width=500,height=650');
        e.preventDefault();
        return false;
      });
		});
}

function showPage(page_id)
{
	$(".page").hide();
	$("#"+page_id).show();
}

