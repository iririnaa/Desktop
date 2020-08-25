fso = new ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("2.txt");
s = fh.Readline();
fh.Close();
fh = fso.OpenTextFile("3.txt");
t = fh.Readline();
fh.Close();
var n = s.length;
var m = t.length;
var repeats=0;
var StopTable = [];
for (var i=0; i<m-1; i++)
{
    StopTable[t.charAt(i)]=i+1;
}

var i=m-1;
while (i<n)
{
    var k=0;
    for (var j=0; j<m; j++)
    {
        if (s.charAt(i-j)==t.charAt(m-1-j))
            k++;
        else
            break;
    }
    if (k==m)
    {
        WScript.echo(i-m+1);
        repeats++;
    }
    if (!(StopTable[s.charAt(i)]))
    {
        i+=m;
    }
    else
    {
        i+=m-StopTable[s.charAt(i)];
    }

}
WSH.echo("Count Of Repeats:");
WSH.echo(repeats);