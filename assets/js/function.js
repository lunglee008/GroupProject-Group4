(function($) {
var tempJSONString = '{"photo_of_day":[{"pid": "01","name": "Jack Chan","bird_type": 1,"thumbnail": ["images/upload/p01s.jpg"],"picture": ["images/upload/p01.jpg"],"date": "2023/01/02 1:30PM","title": "title","content":"content","email": "jack.chan@abccompany.com","location": "Hong Kong","coordinate":["22.31944","114.17778"]},{"pid": "02","name": "Jack Chan","bird_type": 1,"thumbnail": ["images/upload/p02s.jpg"],"picture": ["images/upload/p02.jpg"],"date": "2023/01/02 1:30PM","title": "title","content":"content","email": "jack.chan@abccompany.com","location": "Hong Kong","coordinate":["22.31944","114.17778"]},{"pid": "03","name": "Jack Chan","bird_type": 1,"thumbnail": ["images/upload/p03s.jpg"],"picture": ["images/upload/p03.jpg"],"date": "2023/01/02 1:30PM","title": "title","content":"content","email": "jack.chan@abccompany.com","location": "Hong Kong","coordinate":["22.31944","114.17778"]},{"pid": "04","name": "Jack Chan","bird_type": 1,"thumbnail": ["images/upload/p04s.jpg"],"picture": ["images/upload/p04.jpg"],"date": "2023/01/02 1:30PM","title": "title","content":"content","email": "jack.chan@abccompany.com","location": "Hong Kong","coordinate":["22.31944","114.17778"]},{"pid": "05","name": "Jack Chan","bird_type": 1,"thumbnail": ["images/upload/p05s.jpg"],"picture": ["images/upload/p05.jpg"],"date": "2023/01/02 1:30PM","title": "title","content":"content","email": "jack.chan@abccompany.com","location": "Hong Kong","coordinate":["22.31944","114.17778"]},{"pid": "06","name": "Jack Chan","bird_type": 1,"thumbnail": ["images/upload/p06s.jpg"],"picture": ["images/upload/p06.jpg"],"date": "2023/01/02 1:30PM","title": "title","content":"content","email": "jack.chan@abccompany.com","location": "Hong Kong","coordinate":["22.31944","114.17778"]}]}';
var photoOfTodayJSON = JSON.parse(tempJSONString).photo_of_day;
var _paramsResult = getUrlParameter();
var pid = _paramsResult["pid"];

init();

function init(){
    //loadmainJson();
    //checkLogin("bird_photographer");
    checkLogin("");
    clearContent();
    if(pid != undefined){
        showPhoto();
    }else{
        showPhotoOfToday(photoOfTodayJSON);
    }

    $(".floating_back_button").click(function(){ floating_back_buttonClick(); return false; });
}

function tempLogin(){
    //checkLogin("username123");
}

function floating_back_buttonClick(){
    showPhotoOfToday(photoOfTodayJSON);
}

function checkLogin(__loginID = ""){
    if(__loginID.length == 0){
        $(".after_login_button").remove();
    }else{
        $(".before_login_button").remove();
        $(".after_login_username").html("User: "+__loginID);
    }
}

function clearContent(){
    $(".floating_back_button").hide();
    $(".features_top_view").hide();
    $(".row.aln-center.photo-today").empty();
    $(".main_top_view").hide();
    $(".container.post.photo").empty();
}

function loadmainJson(){
    $.getJSON("data.txt", function(data){
        console.log(data);
    }).fail(function(){
        console.log("An error has occurred.");
    });
}

function photoThumbnailClick($this){
    var _paramsResult = getUrlParameter($this.attr('href'));
    window.history.pushState('page2', 'Title', $this.attr('href'));
    pid = _paramsResult["pid"];
    showPhoto();
}

function jumpToPhoto(){
    $('html, body').animate({scrollTop: $(".main_top_view").offset().top}, 0);
}

function showPhoto(){
    clearContent();
    var _jsonTemp;
    for(var i = 0;i<photoOfTodayJSON.length;i++){
        if(photoOfTodayJSON[i].pid == pid){
            _jsonTemp = photoOfTodayJSON[i];
           break;
        }
    }

    if(_jsonTemp.length != 0){

        var $newdiv = $( "<div id=\"content\"><article class=\"box post\"><header><h2 class=\"ptitle\"></h2></header><span class=\"image featured\"><img class=\"pimage\" src=\"\" alt=\"\" /></span><h4><span class=\"pname\"></span></h4><h4><span class=\"pdate\"></span></h4><h4><span class=\"plocation\"></span><br></h4><br><p><span class=\"pcontent\"></span></p></article></div>");

        var _name = _jsonTemp.name;
        var _pid = _jsonTemp.pid;
        var _date = _jsonTemp.date;
        var _title = _jsonTemp.title;
        var _location = _jsonTemp.location;
        var _picture = _jsonTemp.picture[0];
        var _content = _jsonTemp.content;
        $newdiv.find(".pname").append(_name);
        $newdiv.find(".pdate").append(_date);
        $newdiv.find(".ptitle").append(_title);
        $newdiv.find(".plocation").append(_location);
        $newdiv.find(".pcontent").append(_content);
        $newdiv.find(".pimage").attr('src', _picture);
        $newdiv.find(".pimage").prop('alt', _title);
        $(".container.post.photo").append($newdiv);
    }
    $(".floating_back_button").show();
    $(".main_top_view").show();
    jumpToPhoto();
}

function showPhotoOfToday(__json){
    clearContent();
    for(var i = 0;i<__json.length;i++){
        var _jsonTemp = __json[i];
        var $newdiv = $( "<div class=\"col-4 col-6-medium col-12-small\"><a href=\"#\" class=\"image featured\"><section><img class=\"pimage\" src=\"\" alt=\"\" /><header><h3 class=\"ptitle\"></h3></header><p><span class=\"pdate\"></span><br><span class=\"pname\"></span><br><span class=\"plocation\"></span></p></section></a></div>");
        var _name = _jsonTemp.name;
        var _pid = _jsonTemp.pid;
        var _date = _jsonTemp.date;
        var _title = _jsonTemp.title;
        var _location = _jsonTemp.location;
        var _thumbnail = _jsonTemp.thumbnail;
        var url = window.location.href.split('?')[0];
        url = url.split('#')[0];
        $newdiv.find(".image.featured").click(function(){ photoThumbnailClick($(this)); return false; });
        $newdiv.find(".image.featured").attr("href", url +"?pid="+_pid);

        $newdiv.find(".pname").append(_name);
        $newdiv.find(".pdate").append(_date);
        $newdiv.find(".ptitle").append(_title);
        $newdiv.find(".plocation").append(_location);
        $newdiv.find(".pimage").attr('src', _thumbnail);
        $newdiv.find(".pimage").prop('alt', _title);
        $(".row.aln-center.photo-today").append($newdiv);
    }
    $(".features_top_view").show();
}

function getUrlParameter(_path = "") {
    var url = (_path.length == 0)?window.location.toString():_path;
    url = url.split('#')[0];
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}


})(jQuery);