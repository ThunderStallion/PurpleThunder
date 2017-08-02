var loaded = false; //check to see if page has been loaded first time
var err_msg = ""; //alert error message
var load_fail = false, theme_fail = false;


function addThemes(){

    try{
        $( "#light_theme_link" ).click(function() {
            $("#theme_css").attr("href", "css/light_theme.css")
        });
        $( "#dark_theme_link" ).click(function() {
            $("#theme_css").attr("href", "css/dark_theme.css")
        });
    }catch(err){
        errmsg+="Error setting up theme\n";
        alertErrors();
    }
}


function createAudiofiles(sb){
    try{
        var af = $("#audiofiles");

        for(i = 0; i<sb.size; i++){
            var new_audio = $("<audio></audio>", {"id": "a"+i, "style": "display:none"});
            var source = $("<source></source>", {"src": sb.sound[i], "type": sb.type[i]});
            new_audio.append(source[0]);
            af.append(new_audio[0]);
        }
    }catch(err){
        err_msg+="Error creating the audio files\n";
        alertErrors();
    }
}

function createImageBoard(sb){
    try{
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

    }catch(err){
      err_msg+="Error Creating the Board\n";
      alertErrors();
    }
}
function createImageList(sb){
    try{
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
    catch(err){
      err_msg+="Error Creating the Image List\n";
      alertErrors();
    }
}

function soundAction(num){
    try{
        var audio_id = 'a' + num;
        var sound = $("#"+audio_id)[0];
        if (sound.paused) {
            sound.play();
        } else {
            sound.pause();
        }
    } catch(err){
      err_msg+="Error Playing Sound\n";
      alertErrors();
    }
}
function changeSoundBoard(jsObject){

    try {
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
    catch(err){
        err_msg+="Error has occured changing Soundboard Contents\n";
        alertErrors();
    }
}

function toggleBoard(){
    try{
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
    } catch(err){
        err_msg+="Error has occured toggling board view type\n";
        alertErrors();
    }
}

function loadJSON(jsonFile) {

     $.ajax({
          url: jsonFile,
          type: 'get',
          dataType: 'json',
          contentType: 'application/json',
          success: function (data) {
            try {
                if(loaded) {
                    changeSoundBoard(data);
                } else {
                    createAudiofiles(data);
                    createImageBoard(data);
                    createImageList(data);
                    loaded = true;
                }
            } catch(err) {
                err_msg+="Error pulling file with AJAX\n";
                alertErrors();
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
                err_msg+="Error pulling file with AJAX\n";
                alertErrors();
          }
      });
}

function alertErrors(){
    if(err_msg != ""){
        $("#error_box").css("display", "block");
        $("#error_boc").html(err_msg);
    }
}
