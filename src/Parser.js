
/**
 * Parse an infix notation in following formats
 * * A + B - C || D
 * * A AND B NOT C OR D
 * * A && B !C || D
 */
class Parser{

    /**
     * @param {string} exp Infix notation or boolean expression
     */
    constructor(exp, options){
        this.options = Object.assign({ onEmpty: true, allowMathOperators: true}, options);
        this._originalExp = exp;

        if(typeof exp !== "undefined" ){
            if(exp.trim() === "" && this.options.onEmpty) this.test = function(){ return this.options.onEmpty;}
            else{
                this._replaceOperators(exp);
            }
        }
        
    }

    /**
     * Test if the set expression/notation returns true for given input
     * @param {string | array} operands 
     */
    test(operands){
        if(typeof this._originalExp === "undefined") throw new Error("The parser is set to test boolean expression only");
        if(typeof operands === "string"){
            operands = [operands];
        }
        const boolExpArr = this._convertToBooleanExpression(operands )
        //console.log(boolExpArr)
        return this._testBoolean(boolExpArr.join(" "));
    }

    _testBoolean(booleanExp){
        try{
            //return eval(this._exp.replace ("key", "'"+key+"'"));
            //console.log(booleanExp)
            return eval(booleanExp);
        }catch(e){
            throw new Error("Invalid Expression: " + (this._originalExp || booleanExp) );
        }
    }

    /**
     * Accepts boolean expression
     * * True And False Or True But Not False
     * * Yes And Yes Or Yes But Not No
     * * Y + N -N
     * * 
     * @param {string} booleanExp
     */
    evaluate(booleanExp){
        this._replaceOperators(booleanExp);
        //console.log(this.tokens);
        this._replaceBooleanOperands(this.tokens);
        try{
            //return eval(this._exp.replace ("key", "'"+key+"'"));
            return eval(this.tokens.join(" "));
        }catch(e){
            throw new Error("Invalid Expression: " + booleanExp );
        }
    }

    _replaceBooleanOperands(){
        for(let i = 0; i < this.tokens.length; i++){
            const token = this.tokens[i].toLowerCase();
            if(token === "yes" || token === "y"){
                this.tokens[i] = "true";
            }else if(token === "no" || token === "n"){
                this.tokens[i] = "false";
            }else{
                this.tokens[i] = token;
            }
        }
    }

    _convertToBooleanExpression(operands ){
        const boolExpArr =Array.from(this.tokens);
        //console.log(boolExpArr)
        for(let i = 0; i < this.tokensIndexArr.length; i++){
            const index = this.tokensIndexArr[i];
            const operand = this.tokens[index];
            boolExpArr[index] = operands.indexOf(operand) !== -1;
        }
        return boolExpArr;
    }

    _replaceOperators(exp){
        exp = exp.replace("&&", " && ");
        exp = exp.replace("||", " || ");
        exp = exp.replace("(", " ( ");
        exp = exp.replace(")", " ) ");
        exp = exp.replace("!", " ! ");
        if(this.options.allowMathOperators){
            exp = exp.replace("+", " + ");
            exp = exp.replace("-", " ! ");
        }

        exp = exp.trim();
        this.tokens = exp.split(/[ \t]+/g);
        this.tokensIndexArr = [];
        for(let i = 0; i < this.tokens.length; i++){
            const token = this.tokens[i].trim().toLowerCase();
            
            if(token === "and" || token === "+" || token === "&&" || token === "but"){
                this.tokens[i] = "&&";
            }else if(token === "or"  || token === "||" ){
                this.tokens[i] = "||";
            }else if(token === "not" || token === "-"  || token === "!"){
                const previouseToken = this.tokens[i-1];
                if(previouseToken && previouseToken !== "&&" && previouseToken !== "||" && previouseToken !== "("){
                    this.tokens[i] = "&& !";
                }else{
                    this.tokens[i] = "!";
                }
            }else if(token === "(" || token === ")"){
            }else{
                this.tokensIndexArr.push(i);
                //this.tokens[i] = "key ==='" + this.tokens[i].trim() +"'";
                this.tokens[i] = this.tokens[i].trim();
            }
        }
    }
    
}

module.exports = Parser;