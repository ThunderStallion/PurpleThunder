
/*
    document.getElementById('buttonID').onclick = function () {
    document.getElementById('theme_css').href = '../red.css';
    };
*/

var sb = {
   size : 12,
   image: ["images/audiosound.png","images/audiosound.png", "images/audiosound.png",
            "images/audiosound.png","images/audiosound.png", "images/audiosound.png",
            "images/audiosound.png","images/audiosound.png", "images/audiosound.png",
            "images/audiosound.png","images/audiosound.png", "images/audiosound.png"],
   sound: ["audio/applause.wav", "audio/bassc2.wav", "audio/bassc3.wav",
            "audio/bassloop.wav", "audio/boom.wav", "audio/contrac2.wav",
            "audio/fatsynslap.wav", "audio/guitarc4.wav", "audio/hihat.wav",
            "audio/hornc5.wav", "audio/pianoc6.wav", "audio/snare.wav"],
   type:["audio/wav", "audio/wav", "audio/wav", "audio/wav",
        "audio/wav", "audio/wav", "audio/wav", "audio/wav",
         "audio/wav", "audio/wav", "audio/wav", "audio/wav"]

}

var cats = {
    size : 12,
    image: ["images/cat1.png","images/cat2.png", "images/cat3.jpg", "images/cat4.png",
            "images/cat1.png","images/cat2.png", "images/cat3.jpg", "images/cat4.png",
            "images/cat1.png","images/cat2.png", "images/cat3.jpg", "images/cat4.png"],
    sound: ["audio/cat1.wav", "audio/cat2.wav","audio/cat3.wav",
            "audio/cat4.wav", "audio/cat5.wav", "audio/cat6.wav",
            "audio/cat7.wav", "audio/cat8.wav","audio/cat9.wav",
            "audio/cat10.wav", "audio/cat11.wav", "audio/cat12.wav"],
    type:["audio/wav", "audio/wav", "audio/wav", "audio/wav",
        "audio/wav", "audio/wav", "audio/wav", "audio/wav",
         "audio/wav", "audio/wav", "audio/wav", "audio/wav"]
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
    for(i = 0; i<sb.size; i++){
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

    for(i= 0; i<sb.size; i++){
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
                this.parentElement.style.border="thick solid green";
                sound.play();
                this.parentElement.style.border="thick solid transparent";
            } else {
                sound.pause();
                this.parentElement.style.border="thick solid transparent";
        }

        }, false);
    }
}
function createImageList(){
    var sb_list = document.getElementById("sb_list");
    sb_list.innerHTML+= "<ul>";

    for(i=0; i<12;i++){
        var list_id = 'l'+i;
        sb_list.innerHTML+='<li> <img id="'+list_id+'" src="'+sb.image[i]+'"></li>';


        document.getElementById(list_id).addEventListener('click', function(){
            var img_id = this.id;
            var audio_id = 'a' + img_id.replace(/[^0-9]/g, '');
            var sound = document.getElementById(audio_id);
            document.getElementById("testing").innerHTML +=audio_id;
            if (sound.paused) {
                this.parentElement.style.border="thick solid green";
                sound.play();
                this.parentElement.style.border="thick solid transparent";
            } else {
                sound.pause();
                this.parentElement.style.border="thick solid transparent";
        }

        }, false);
    }
    sb_list.innerHTML+= "</ul>"
}
function changeSoundBoard(jsObject){
    var sb= jsObject;

    for(i=0; i<sb.size;i++){
        var new_img = sb.image[i];
        var new_audio = sb.sound[i];
        var new_audio_type=sb.type[i];
        var old_id= 'i'+i;
        var old_lid='l'+i;
        var old_aid='a'+i;

        var old_img = document.getElementById(old_id);
        var old_limg = document.getElementById(old_lid);
        var old_audio = document.getElementById(old_aid);

        old_img.src = new_img;
        old_audio.src = new_audio;
        old_limg.src = new_img;
        old_audio.type = new_audio_type;
    }
}



