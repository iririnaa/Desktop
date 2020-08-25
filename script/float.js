Magnitude = 8;
nan = "11111111100000000000000000000001";
inf = "1111111100000000000000000000000";

function InternalRepresentationNumbers(number){ //***
    var numb = Number(number);
    if(isNaN(numb)) return nan;
    var result = "";
    if(numb < 0)
        result += "1";
    else
        result += "0";
    numb = Math.abs(numb);
    var num = GetBinStandardTypeNumber(numb);
    if(num[1] >= 255)
        result += inf;
    else{
        var pow = ConvertNumToBinPow(num[1]);
        result += pow + num[0];
    }
    return result;
}

function ConvertToNumbers(number){
    if(IsNaN(number)) return "NaN";
    if(number == "0" + inf) return "+Inf";
    if(number == "1" + inf) return "-Inf";
    var pow = GetPower(number.substr(1, Magnitude)) - 127;
    var num = number.substr(Magnitude + 1);
    var res = 0;
    if(pow == -127)
        num = "0" + num
    else
        num = "1" + num;
    var p = Math.pow(2, pow);
    for(var i = 0; i < 23 + 1; i++){
        res += num.charAt(i) * p;
        p /= 2;
    }
    return res * (number.charAt(0) == '0' ? 1 : -1);
}

function GetBinStandardTypeNumber(num){
    var pow = -1;
    while(num >= 1){
        num /= 2;
        pow++;
    }
    while(num < 0.5 && pow > -127){
        num *= 2;
        pow--;
    }
    var result = "";
    for(var i = 0; i < 23 + 1; i++){
        num *= 2;
        if (num >= 1){
            result += "1";
            num -= 1;
        } else {
            result += "0";
        }
    }
    return [result.substr(1), pow + 127];
}

function GetPower(number){
    var res = 0;
    var maxPowNum = number.length - 1;
    for(var i = 0; i < number.length; i++)
        res += number.charAt(i) << (maxPowNum - i);
    return res;
}

function ConvertNumToBinPow(number){  //cnt
    var res = "";
    for(var i = 0; i < Magnitude; i++){
        res = (number % 2) + res;
        number >>= 1;
    }
    return res;
}

function IsNaN(number){
    if(number.substr(0, Magnitude + 1) != "111111111")
        return false;
    var lengthNum = Magnitude + 23+ 1;
    for(var i = Magnitude + 1; i < lengthNum; i++)
        if(number.charAt(i) == "1")	return true;
    return false;
}

function AdditionMantissaBin(num1, num2){
    var temp = 0;
    var result = "";
    var deltaPow = 0;
    for(var i = 23; i >= 0; i--){
        result = ((temp + Number(num1.charAt(i)) + Number(num2.charAt(i))) % 2) + result;
        temp = (temp + Number(num1.charAt(i)) + Number(num2.charAt(i))) >> 1;
    }
    while(temp != 0){
        result = (temp % 2) + result;
        temp >>= 1;
        deltaPow++;
    }
    return [result, deltaPow];
}

function SubtractionMantissaBin(num1, num2){
    var temp = 0;
    var result = "";
    for(var i = 23; i >= 0; i--){
        var a = Number(num1.charAt(i));
        var b = temp + Number(num2.charAt(i));
        result = (Math.abs(a - b) % 2).toString() + result;
        if(a - b >= 0)
            temp = 0;
        else
            temp = 1;
    }
    var pow = 0;
    for(var i = 0; result.charAt(i) == "0" && i < 23 + 1; i++)
        pow++;
    return [result, pow];
}

function Plus(num1, num2){
    if(IsNaN(num1) || IsNaN(num2)) return nan;
    var arg1 = num1.charAt(0);
    var arg2 = num2.charAt(0);
    var pow1 = GetPower(num1.substr(1, Magnitude));
    var pow2 = GetPower(num2.substr(1, Magnitude));

    var number1 = "";
    var number2 = "";
    if(pow1 == 0)
        number1 = "0" + num1.substr(Magnitude + 1);
    else
        number1 = "1" + num1.substr(Magnitude + 1);
    if(pow2 == 0)
        number2 = "0" + num2.substr(Magnitude + 1);
    else
        number2 = "1" + num2.substr(Magnitude + 1);
    var d = "";
    var deltaPow = Math.abs(pow1 - pow2);
    for(var i = 0; i < deltaPow; i++)
        d += "0";
    if(pow1 > pow2)
        number2 = (d + number2).substr(0, 23 + 1);
    else
        number1 = (d + number1).substr(0, 23 + 1);

    if(arg1 != arg2){
        if(arg1 == 0)
            return Minus(arg1, number1, pow1, arg2, number2, pow2);
        return Minus(arg2, number2, pow2, arg1, number1, pow1);
    }

    if(pow1 == 255 || pow2 == 255)
        return arg1 + inf;
    var pow = Math.max(pow1, pow2);
    var mantissa = AdditionMantissaBin(number1, number2);
    pow += mantissa[1];
    var add = mantissa[0].substr(1, 23);
    if(pow >= 255)
        return arg1 + inf;
    return arg1 + ConvertNumToBinPow(pow) + add;
}

function Minus(arg1, mantissa1, pow1, arg2, mantissa2, pow2){
    if(pow1 == 255 && pow2 == 255)
        return nan;
    if(pow1 == 255)
        return arg1 + inf;
    if(pow2 == 255)
        return arg2 + inf;
    var minus = "";
    var arg = "";
    if(isLess(mantissa1, mantissa2) < 0){
        minus = SubtractionMantissaBin(mantissa2, mantissa1);
        arg = "1";
    }
    else{
        minus = SubtractionMantissaBin(mantissa1, mantissa2);
        arg = "0";
    }
    if(minus[1] == 24)
        return "00000000000000000000000000000000";
    var pow = Math.max(pow1, pow2);
    var deltaPow = pow - Math.max(0, pow - minus[1]);
    pow -= deltaPow;
    var res = minus[0].substr(deltaPow + 1);
    while(res.length < 23)
        res += "0";
    return arg + ConvertNumToBinPow(pow) + res;
}

function isLess(num1, num2){
    for(var i = 0; i < 23 + 1; i++){
        if(num1.charAt(i) == "1" && num2.charAt(i) == "0")
            return 1;
        if(num1.charAt(i) == "0" && num2.charAt(i) == "1")
            return -1;
    }
    return 0;
}

if(WSH.Arguments(0) == "convert"){
    var num = WScript.STDIN.ReadLine();
    var conv = InternalRepresentationNumbers(num);
    conv += " ~ " + ConvertToNumbers(conv);
    WSH.echo(conv);
}

if(WSH.Arguments(0) == "plus"){
    var str=WScript.STDIN.ReadLine();
    var num1 = InternalRepresentationNumbers(str.split(" ")[0]);
    var num2 = InternalRepresentationNumbers(str.split(" ")[1]);
    var calc = Plus(num1, num2);
    calc += " ~ " + ConvertToNumbers(calc);
    WSH.echo(calc);
}

if(WSH.Arguments(0) == "minus"){
    var str=WScript.STDIN.ReadLine();
    var num1 = InternalRepresentationNumbers(str.split(" ")[0]);
    var num2 = InternalRepresentationNumbers(str.split(" ")[1]);
    num2 =(num2.charAt(0) == "0" ? "1" : "0") + num2.substr(1, Magnitude + 23);
    var calc = Plus(num1, num2);
    calc += " ~ " + ConvertToNumbers(calc);
    WSH.echo(calc);
}