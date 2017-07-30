
/*
    document.getElementById('buttonID').onclick = function () { 
    document.getElementById('theme_css').href = '../red.css';
    };
*/
var loaded = false; //check to see if page has been loaded first time
var sb = null, instr = null, cats = null; //JSON objects that hold configs for soundboard
var err_msg = ""; //alert error message
var load_fail = false, theme_fail = false;



/* fetches JSON config from firebase URL, actually spent a lot of time here 
    because didn't know it was asynchronous. Once fetched, it will load up the soundboard,
    grid, audio, and themes*/
function fetchJSONFile(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            sb = instr;
            if(loaded == true){
                cats = JSON.parse(this.responseText);
            }
            else{
               instr = JSON.parse(this.responseText);
                sb=instr;
                createAudiofiles();
                createImageBoard();
                createImageList();
                addThemes();
                alertErrors();
                loaded= true;
            }
            return JSON.parse(this.responseText);
        }
        else{
            if(load_fail == false){
                err_msg+="Error loading config file with AJAX\n";
                load_fail = true;
            }
        }
    };
  xhttp.open("GET", url, true);
  xhttp.send();
}
/*encapsulation of loading the JSON config files*/
function loadData(){
    var instr = fetchJSONFile('../instr.json');
    var cats = fetchJSONFile('../cats.json');
}
/* Event Listeners for the Theme Changing button
   -- Will change the css style sheet link */
function addThemes(){
    try{
        document.getElementById("light_theme_link").addEventListener('click', function(){
            document.getElementById("theme_css").href="css/light_theme.css";
        });
        document.getElementById("dark_theme_link").addEventListener('click', function(){
            document.getElementById("theme_css").href="css/dark_theme.css";
        });
    }catch(err){
        if(theme_fail==false){
            errmsg+="Error changing the theme\n";
        }
    }
}

/* Creates the audios chosen by sb JSON object ,assigns id,
 and hides them */
function createAudiofiles(){
    try{
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
    }catch(err){
        if(audio_fail ==false){
            err_msg+="Error creating the audio files\n";
        }
    }
}

/* Creates the images chosen by sb JSON object ,assigns id,
 and adds click listener that will play the audio assigned to it
 image and audio should have same numeral in id */
function createImageBoard(){
  try{
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
            if (sound.paused) {
                sound.play();
            } else { 
                sound.pause();
		    }

        }, false);
    }
  }catch(err){
      err_msg+="Error Creating the Board\n";
  }
}
/* Creates the list of images for the List Toggle View
 chosen by sb JSON object ,assigns id, and adds click listener 
 that will play the audio assigned to it image and audio should have same numeral in id */
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
            if (sound.paused) {
                sound.play();
            } else { 
                sound.pause();
		    }

        }, false);
    }
    sb_list.innerHTML+= "</ul>"
}

/* Allows the list to play the sound assigned to each link*/
function soundAction(num){
    var audio_id = 'a' + num;
    var sound = document.getElementById(audio_id);
    if (sound.paused) {
        sound.play();
    } else { 
        sound.pause();
    }
}
/*onclick function for the Change Content button to reassign
  the variables of all the necessary components of both the grid
  and list when clicked on */
function changeSoundBoard(jsObject){
    try{
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
    }catch(err){
        err_msg+="Error has occured changing Soundboard Contents\n";
    }
}


/*onclick function for the toggle Icon/List view button
  -- changes the style.display of sb_list and sb_grid to 
     hide one and show the other*/
function toggleBoard(){
    try{
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
    }catch(err){
        err_msg+="Error has occured toggling board view type\n";
    }
}

function alertErrors(){
    if(err_msg != ""){
        document.getElementById("error_box").style.display="block";
        document.getElementById("error_box").innerHTML = err_msg;
    }
}


