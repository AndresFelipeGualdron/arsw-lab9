var bigInt = require("big-integer");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(req);

    let nthh = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let dos = bigInt.two;
    let answer = bigInt.zero;

    let memo = {};

    var fibonacci = function(nth){
        if(memo[nth] !== undefined){
            return memo[nth];
        }else{
            if (nth < 0)
            throw 'must be greater than 0';
            else if (nth === 0)
                return nth_2;
            else if (nth === 1)
                return nth_1;
            else {
                for (var i = 0; i < nth - 1; i++) {
                    answer = nth_2.add(nth_1);
                    nth_2 = nth_1;
                    nth_1 = answer;
                }
                return memo[nth] = fibonacci(nth.subtract(nth_1)).add(fibonacci(nth.subtract(dos)));
            }
        }
        
    }

    answer = fibonacci(nthh);

    context.res = {
        body: answer.toString()
    };
}