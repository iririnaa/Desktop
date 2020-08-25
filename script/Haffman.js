var str=WScript.STDIN.ReadLine();
var frequency = [];
var countOfEntry = 0;
var preMin=100000000;
var min=100000000;
var preMinName="";
var minName="";
var finalArr= [];
var tempString = "";
var decode = "";
var encode = "";
var chars=[];

for(var i=0 ; i<str.length;i++){
    frequency[str.charAt(i)]=0;
}

for(var i=0; i<str.length;i++){
    frequency[str.charAt(i)]++;
}

for (var i in frequency){
    countOfEntry++;
}

function GetNode(arr){
    for(var i in arr){
        if(arr[i]<min){
            min=arr[i];
            minName=i;
        }
    }
    for(var i in arr){
        if(arr[i]<=preMin && i!=minName){
            preMin=arr[i];
            preMinName=i;
        }
    }

    min=100000000;
    preMin=100000000;
    finalArr[preMinName] = 1;
    finalArr[minName] = 0;
    finalArr[preMinName+minName]= 0;
    frequency[preMinName+minName]=frequency[preMinName]+frequency[minName];
    delete frequency[preMinName];
    delete frequency[minName];
    preMinName=""
}

GetNode(frequency);

for(var i in finalArr){
    GetNode(frequency);
}

for(var i in finalArr){
    if(i.length>1 && i.length!=countOfEntry){
        chars = i.split('');
        for(var j = 0 ; j < chars.length; j++)
            finalArr[chars[j]]=finalArr[i].toString()+finalArr[chars[j]];
    }
    if(i.length!=1)
        delete finalArr[i];
}

for (var i = 0 ; i < str.length; i++){
    encode+=finalArr[str.charAt(i)];
}

WSH.echo(encode);

for(var i in finalArr){
    WSH.echo(i+'-'+finalArr[i]);
}

for(var i = 0; i < encode.length; i++){
    tempString+=encode.charAt(i);
    for(var j in finalArr)
        if(finalArr[j]==tempString){
            decode+=j;
            tempString="";
            break;
        }
}

WSH.echo(decode);

if(decode==str)
    WSH.echo("SUCCESS");