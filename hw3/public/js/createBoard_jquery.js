function addThemes(){
    $( "#light_theme_link" ).click(function() {
        $("#theme_css").attr("href", "css/light_theme.css")
    });
    $( "#dark_theme_link" ).click(function() {
        $("#theme_css").attr("href", "css/dark_theme.css")
    });
}


function createAudiofiles(sb){

    var af = $("#audiofiles");

    for(i = 0; i<sb.size; i++){
        var new_audio = $("<audio></audio>", {"id": "a"+i, "style": "display:none"});
        var source = $("<source></source>", {"src": sb.sound[i], "type": sb.type[i]});
        new_audio.append(source[0]);
        af.append(new_audio[0]);
    }
}

function createImageBoard(sb){
    var t = $("#sb_grid_template");
    var sb_grid = $("#sb_grid");
    var sb_img = t.contents().find("img");

    for(i= 0; i<sb.size; i++){

        sb_img.attr("id", 'i'+i);
        sb_img.attr("src", sb.image[i]);
        sb_grid.append(t.html());
        $("#"+sb_img.attr("id")).click(function() {
            soundAction(this.id.replace(/[^0-9]/g, ''));
        });
    }
}
function createImageList(sb){
    var sb_list = $("#sb_list");
    sb_list.html("<ul></ul>");

    for(i=0; i<12;i++){
        var list_id = 'l'+i;
        var sound_name = sb.sound[i].replace("audio/", "");
        var li = $("<li></li>");
        var link = $("<a></a>", {"id": list_id, "href": "#"});
        link.html(sound_name);
        link.click(function() {
            soundAction(this.id.replace(/[^0-9]/g, ''));
        });
        li.append(link);
        sb_list.append(li);
    }
}

function soundAction(num){
    var audio_id = 'a' + num;
    var sound = $("#"+audio_id)[0];
    document.getElementById("testing").innerHTML +=audio_id;
    if (sound.paused) {
        sound.play();
    } else {
        sound.pause();
    }
}
function changeSoundBoard(jsObject){
    var sb= jsObject;

    for(i=0; i<sb.size;i++){
        var new_img = sb.image[i];
        var new_audio = sb.sound[i];
        var new_audio_type=sb.type[i];
        var new_audio_name = sb.sound[i].replace("audio/", "");
        var old_id= 'i'+i;
        var old_lid='l'+i;
        var old_aid='a'+i;

        var old_img = $("#"+old_id);
        var old_audio_list = $("#"+old_lid);
        var old_audio = $("#"+old_aid);

        old_img.attr("src", new_img);
        old_audio.attr("src", new_audio);
        old_audio_list.html(new_audio_name);
        old_audio.attr("type",new_audio_type);
    }
}

function toggleBoard(){
    var sb_list = $("#sb_list");
    var sb_grid = $("#sb_grid");
    var btn = $("#togglebtn");
    if(sb_list.css("display") == "none"){
        sb_list.show();
        sb_grid.hide();
        btn.html("Toggle To Icon View");
    }
    else{
        sb_list.hide();
        sb_grid.show();
        btn.html("Toggle To List View");
    }
}

function loadJSON(jsonFile) {

     $.ajax({
          url: jsonFile,
          type: 'get',
          dataType: 'json',
          contentType: 'application/json',
          success: function (data) {

            if(loaded) {
                changeSoundBoard(data);
            } else {
                createAudiofiles(data);
                createImageBoard(data);
                createImageList(data);
                loaded = true;
            }
          }
      });
}

loaded = false;
