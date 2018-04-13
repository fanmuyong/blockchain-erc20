var GetRandomNum = function(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

module.exports = {
   getRandomNum:GetRandomNum
}
