fso = new ActiveXObject("Scripting.FileSystemObject");
var ts  = fso.OpenTextFile(WSH.Arguments(0));
var str = ts.ReadAll();
ts.Close();
var c =str;
str=str.split(' ');
var i=0;
var length=str.length;
while(i<length){
    switch(str[i]){
        case 'Read:':
            WSH.echo(str[i]+' '+str[i+1].replace(/\s+/g,''));
            var a=str[i+1].replace(/\s+/g,'');
            str[a]=WScript.STDIN.ReadLine();
            break;

        case '%':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');;
            str[a] = str[a] % str[b];
            break;


        case '<=>':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');
            var c = str[a];
            str[a]=str[b];
            str[b]=c;
            break;


        case	'=':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');
            str[a] = b;
            break;


        case '-':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');
            str[a] = str[a] - b;
            break;


        case '*':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');
            str[a] = str[a] * str[b];
            break;


        case '?':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');
            if (str[a]==b){
                i=i+3;
                while(str[i]==' '){
                    i++;
                }
            }else{
                for (var j=i; j<length; j++){
                    if(str[j].replace(/\s+/g,'')=='!'){
                        i=j;
                        break;
                    }
                }
            }
            break;


        case 'Write':
            WSH.echo(Math.abs(str[str[i+1].replace(/\s+/g,'')]));
            i=length;
            break;

        case 'Output':
            WSH.echo(str[i+1]);
            i=length;
            break;

        case 'notANumber':
            var b = str[i+1].replace(/\s+/g,'');
            if(!isNaN(str[b])){
                for (var j=i; j<length; j++){
                    if(str[j].replace(/\s+/g,'')=='!'){
                        i=j;
                        break;
                    }
                }
            }
            break;

        case 'isNotAnInteger':
            var b = str[i+1].replace(/\s+/g,'');
            if(str[b.replace(' ')].indexOf('.')==-1){
                for (var j=i; j<length; j++){
                    if(str[j].replace(/\s+/g,'')=='!'){
                        i=j;
                        break;
                    }
                }
            }
            break;

        case 'lessThen':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');
            if(str[b]>=a){
                for (var j=i; j<length; j++){
                    if(str[j].replace(/\s+/g,'')=='!'){
                        i=j;
                        break;
                    }
                }
            }
            break;

        case 'biggerThen':
            var a = str[i+1];
            var b = str[i+2].replace(/\s+/g,'');
            if(str[b]<=parseInt(a)){
                for (var j=i; j<length; j++){
                    if(str[j].replace(/\s+/g,'')=='!'){
                        i=j;
                        break;
                    }
                }
            }
            break;

        case 'go':
            var variable=str[i+1];
            for(var j=0;j< i; j++){
                if(str[j]==variable){
                    i=j;
                }
            }
            break;

    }
    i++;
}