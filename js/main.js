//= jquery/jquery.custom.js
//= emmiter.js

var htmlData = [];
$.getJSON('js/json/html.json', function(data){ htmlData = data; });
// .success(function() { alert("Успешное выполнение"); })
// .error(function() { alert("Ошибка выполнения"); })
// .complete(function() { alert("Завершение выполнения") });
