function changeColor(type,color,isChecked,bgcolor,isbold){
	var list = type.split(',');
	if(isChecked){
		for(i=0; i<list.length;i++){
			if(bgcolor)
				if(isbold)
					$("."+list[i]).css("color",color).css("font-weight",'bold');
				else
					$("."+list[i]).css("color",color).css("background-color",bgcolor);
			else
				$("."+list[i]).css("color",color);
		}
	}else{
		for(i=0; i<list.length;i++)
			$("."+list[i]).css("color","black").css("background-color","white").css("font-weight",'inherit');
	}
}

function hideSlash(isChecked){
	if(isChecked){
		$(".Slash").show();
	}else{
		$(".Slash").hide();
	}
}

function boldException(isChecked){
	if(isChecked){
		$(".Exception").css("font-weight","bold");
	}else{
		$(".Exception").css("font-weight","normal");
	}
}

function getOpenTag(tag,clazz, id){
    if(clazz){
        if(id){ // class and id
            return "<"+tag+" class=\""+clazz+"\" id=\""+id+"\">";
        }else{  // class no id
            return "<"+tag+" class=\""+clazz+"\">";
        }
    }else{  // no class no id
        return "<"+tag+">";
    }

}
function getCloseTag(tag){
    return "</"+tag+">";
}

function parseJSON(json){
	var contents = json.contents;
	var str = "";
    var openDouble = false;   // if double qoute is open, next double qoute attach to word in left, else attach to right
    var openSingle = false;  // as above
    var attachRight = false; //
	for(i=0; i<contents.length;i++){
		str+=getOpenTag('p','paragraph')+"\n";
		var para = contents[i];
		for(j=0;j<para.length;j++){
            console.log(para[j]);
			str+=getOpenTag('span','sentence')+"\n";
			
			var sent = para[j].tokens;
			
			for(z=0;z<sent.length;z++){
				var token = sent[z];
                var id = i+"_"+j+"_"+z;
				if(token['tagged']=="Exception"){
                    str+=getOpenTag('span','word Exception',id);
					var nestTokens = token['tokens'];
					for(y=0;y<nestTokens.length;y++){
                        id +="_"+y; // exception token have id P_S_W_T , paragraph_sentence
						var ntoken = nestTokens[y];
						str+="<span class=\""+ntoken['tagged']+"\">"+ntoken['word']+"</span>";
						if(y!= nestTokens.length-1)
							str+=" ";
					}
					str+="</span>";
					
				}else{
					str+="<span class=\""+token['tagged']+"\" id=\""+id+"\">"+token['word']+"</span>";
					if(z!= sent.length-2)
						str+=" ";
				}
				if(token['slashed']=='true'){
					str+="<span class=\"Slash\">/</span>";
				}
			}
			
			str+=getCloseTag('span');
		}
		
		str+=getCloseTag('p')+"\n";
	}

	return str;
}

function parseSentence(sent){

}

function startReader(){
	if(!json){
		alert('Clash a text before reading');
		return ;
	}
  if(window.sq){
	sq.again();
	// window.sq.closed && window.document.dispatchEvent(new Event('squirt.again'));
  } else {
	window.sq = {};
	s = document.createElement('script');
	s.src = 'squirt/squirt.js';
	document.body.appendChild(s);
  }
}