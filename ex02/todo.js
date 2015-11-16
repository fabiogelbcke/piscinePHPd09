window.onload = function() {

	function getCookie(cookieName) {
		var name = cookieName + "=";
		var cookieList = document.cookie.split(';');
		for(var i = 0; i < cookieList.length; i++) {
			var cookie = cookieList[i];
			while (cookie.charAt(0)==' ') {
				cookie = cookie.substring(1);
			}
			if (cookie.indexOf(name) == 0) {
				return cookie.substring(name.length,cookie.length);
			}
		}
		return null;
	}
	function setCookie(name, value, days)
	{
		if (days)
		{
			var date = new Date();
			date.setTime(date.getTime() + days*24*60*60*1000);
			var expires = "; expires=" + date.toGMTString();
		}
		else
			var expires = "";
		document.cookie = name + "=" + value + expires + ";path=/";
	}
	highestCookieValue = 0;
	function addTask(text) {
		console.log("adding task to DOM: " + text);
		highestCookieValue++;
		itemId = "todo" + highestCookieValue;
            setCookie(itemId, text, 10000);
            var newItem = document.createElement("LI");
            newItem.id = itemId;
            newItem.appendChild(document.createTextNode(text));
            newItem.addEventListener("click", function(eventObject) {
                var areTheySure = confirm("Delete this item?");
                if (areTheySure) {
                    setCookie(eventObject.target.id, "", -1);
                    eventObject.target.remove();
                }
            });
            var list = document.getElementById("ft_list");
            list.insertBefore(newItem, list.childNodes[0]);
        }
    var newButton = document.getElementById("add_item");
    newButton.addEventListener("click", function() {
        console.log("they clicked the button");
        var newTaskText = prompt("Enter the task name", "");
        if (newTaskText) {
            addTask(newTaskText);
        } else {
            console.log("they hit cancel :(");
        }
    });
    var cookieList = document.cookie.split(';');
    for(var i = 0; i < cookieList.length; i++) {
        var cookie = cookieList[i];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf("todo") === 0) {
            var brokenCookie = cookie.split('=');
            var indexOfCookie = brokenCookie[0];
            var valueofCookie = brokenCookie[1];
            setCookie(indexOfCookie, "", -1);
            addTask(valueofCookie);
        }
    }
}
