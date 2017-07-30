
/*
    document.getElementById('buttonID').onclick = function () { 
    document.getElementById('theme_css').href = '../red.css';
    };
*/
var loaded = false; 
var sb = null, instr = null, cats = null;

function fetchJSONFile(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            instr = JSON.parse(this.responseText);
            sb = instr;
            if(loaded == true){
                document.getElementById("testing").innerHTML+= "HAS BEEN LOADED";
            }
            else{
               document.getElementById("testing").innerHTML+= "HAS NOT BEEN LOADED";

                createAudiofiles();
                createImageBoard();
                createImageList();
                addThemes();
                loaded= true;
            }
            return JSON.parse(this.responseText);
        }
    };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function loadData(){
    var instr = fetchJSONFile('../instr.json');
    var cats = fetchJSONFile('../cats.json');
    sb = instr;
    console.log(JSON.stringify(sb));
}

function addThemes(){

    document.getElementById("light_theme_link").addEventListener('click', function(){
        document.getElementById("theme_css").href="css/light_theme.css";
    });
    document.getElementById("dark_theme_link").addEventListener('click', function(){
        document.getElementById("theme_css").href="css/dark_theme.css";
    });
}

function reloadCss()
{
    var links = document.getElementsByTagName("link");
    for (var cl in links)
    {
        var link = links[cl];
        if (link.rel === "stylesheet")
            link.href += "";
    }
}

function createAudiofiles(){
    var af = document.getElementById("audiofiles");
    for(i = 0; i<12; i++){
        var new_audio = document.createElement("audio");
        new_audio.id = "a"+i;
        new_audio.style.display = "none";
        var source = document.createElement("source");
        source.src= sb.sound[i];
        source.type= sb.type[i];
        new_audio.appendChild(source);
        af.appendChild(new_audio);
    }
}

function createImageBoard(){

    var t = document.getElementById("sb_grid_template");
    var sb_img = t.content.querySelector("img");
    var sb_grid = document.getElementById("sb_grid");

    for(i= 0; i<12; i++){
        sb_img.src = sb.image[i];
        sb_img.id= 'i'+i;
        var clone = document.importNode(t.content, true);
        sb_grid.appendChild(clone);

        
        document.getElementById(sb_img.id).addEventListener('click', function(){
            var img_id = this.id;
            var audio_id = 'a' + img_id.replace(/[^0-9]/g, ''); 
            var sound = document.getElementById(audio_id);
            document.getElementById("testing").innerHTML +=audio_id;
            if (sound.paused) {
                sound.play();
            } else { 
                sound.pause();
		    }

        }, false);
    }
}
function createImageList(){
    var sb_list = document.getElementById("sb_list");
    sb_list.innerHTML+= "<ul>";

    for(i=0; i<12;i++){
        var list_id = 'l'+i;
        var sound_name = sb.sound[i].replace("audio/", "");
        sb_list.innerHTML+='<li> <a id="'+list_id+'" href="#" onclick="soundAction('+i+')">'+sound_name+'</a>';
       
        document.getElementById(list_id).addEventListener('click', function(){
            var img_id = this.id;
            var audio_id = 'a' + img_id.replace(/[^0-9]/g, ''); 
            var sound = document.getElementById(audio_id);
            document.getElementById("testing").innerHTML +=audio_id;
            if (sound.paused) {
                sound.play();
            } else { 
                sound.pause();
		    }

        }, false);
    }
    sb_list.innerHTML+= "</ul>"
}

function soundAction(num){
    var audio_id = 'a' + num;
    var sound = document.getElementById(audio_id);
    document.getElementById("testing").innerHTML +=audio_id;
    if (sound.paused) {
        sound.play();
    } else { 
        sound.pause();
    }
}
function changeSoundBoard(jsObject){
    var sb= jsObject;

    for(i=0; i<12;i++){
        var new_img = sb.image[i];
        var new_audio = sb.sound[i];
        var new_audio_type=sb.type[i];
        var new_audio_name = sb.sound[i].replace("audio/", "");
        var old_id= 'i'+i;
        var old_lid='l'+i;
        var old_aid='a'+i;

        var old_img = document.getElementById(old_id);
        var old_audio_list = document.getElementById(old_lid);
        var old_audio = document.getElementById(old_aid);
        
        old_img.src = new_img;
        old_audio.src = new_audio;
        old_audio_list.innerHTML = new_audio_name;
        old_audio.type = new_audio_type;
    }
}

function toggleBoard(){
    var sb_list = document.getElementById("sb_list");
    var sb_grid = document.getElementById("sb_grid");
    var btn = document.getElementById("togglebtn");
    if(sb_list.style.display == "none"){
        sb_list.style.display="block";
        sb_grid.style.display="none";
        btn.innerHTML = "Toggle To Icon View";
    }
    else{
        sb_list.style.display="none";
        sb_grid.style.display="block";
        btn.innerHTML= "Toggle To List View";
    }
}



