FSO = new ActiveXObject("Scripting.FileSystemObject");
var file = FSO.OpenTextFile("input.txt");
var input=file.ReadAll();
file.close();
var alph="abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ-:()*.,/'\"!;?[]&@_$^{}=%+ "
var codedString="";
var count=WScript.STDIN.ReadLine();
var number=0;
for(var i=0;i<input.length;i++)
{
    number=alph.indexOf(input.split('')[i]) + parseInt(count);
    while(number>alph.length)
        number=number-alph.length;
    while(number<0)
        number=alph.length+number
    codedString+=alph.split('')[number];
}

WSH.echo(codedString);

var chast = CreateAlpabetTableOfFrequency();

var strch = CreateGivenStringFrequency()

var sh = GetShift();

var decoded = "";

for(var i = 0; i<codedString.length; i++)
{
    index = alph.indexOf(codedString.split('')[i])+sh;
    while(index>=alph.length)
        index = index - alph.length;
    while(index<0)
        index = alph.length + index
    decoded+=alph.split('')[index];
}

WSH.echo(decoded);

if(input==decoded)
    WSH.echo("SUCCESS!");

function CreateAlpabetTableOfFrequency() {

    var arr = [];
    fso = new ActiveXObject("Scripting.FileSystemObject");
    fh = fso.OpenTextFile("Chastoty.txt");
    i = 0;
    while (!fh.AtEndOfStream){
        s = fh.Readline();
        if(s.indexOf(' ')==0)
        {
            arr[' '] = parseFloat(s);
        }
        else
            arr[s.split(' ')[0]] = s.split(' ')[1];
        i++;
    }
    fh.Close();
    return arr
}

function GetShift(){
    var Min = 0;
    var D = 0;
    for (i = 0; i < alph.length; i++)
    {
        Min += Math.abs(parseFloat(chast[alph.charAt(i)]) - parseFloat(strch[alph.charAt(i)]));
    }
    WSH.echo(Min);
    WSH.echo( );
    shift_min = 0;
    for (shift = 1; shift < alph.length; shift++)
    {
        D = 0;
        for (i = 0; i < alph.length; i++)
        {
            D += Math.abs(parseFloat(chast[alph.charAt((i+shift)%alph.length)]) - parseFloat(strch[alph.charAt(i)]));
        }
        WSH.echo(D);
        if (parseFloat(Min) > parseFloat(D))
        {
            Min = D;
            shift_min = shift;
        }

    }
    return shift_min
}

function CreateGivenStringFrequency(){
    var arr = [];
    for(j = 0; j < alph.length; j++)
    {
        arr[alph.charAt(j)] = 0;
    }
    for(j = 0; j < codedString.length; j++)
    {
        if(alph.indexOf(' ')>0)
            arr[' ']++;
        arr[codedString.charAt(j)]++;
    }
    return arr
}