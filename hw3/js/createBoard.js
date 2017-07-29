
/*
    document.getElementById('buttonID').onclick = function () { 
    document.getElementById('theme_css').href = '../red.css';
    };
*/
function switch_style(stylesheet){
    document.getElementsById("theme_css").href= stylesheet;
}
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
    size : 12
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



