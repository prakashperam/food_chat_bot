const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    SECOND_ITEM : Symbol("roti"),
    THIRD_ITEM : Symbol("samosa")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "shawarama";
        this.sItem2 = "butterNan";
        this.sItem3 = "samosa"
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Conestoga's Shawarma.");
                aReturn.push("What size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SECOND_ITEM
                this.sToppings = sInput;
                console.log(sInput,"toppings")
                aReturn.push("Would you like Butter Roti with Shawarma?");
                break;
            case OrderState.SECOND_ITEM :
                this.stateCur = OrderState.THIRD_ITEM
                this.sItem2 = sInput;
                // if(sInput){
                //     sInput=""
                //     aReturn.push("how many samosas?")
                // }
                // console.log("how many samosa" + sInput)
                aReturn.push("Would you like to order samosa?")
                break;
            case OrderState.THIRD_ITEM:
                this.stateCur = OrderState.DRINKS
                this.sItem3 = sInput;
                aReturn.push("Would you like to order drinks?")
                break;
            
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} and ${this.sItem2}, ${this.sItem3}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                aReturn.push(`Your order total is $45`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                
                break;
        }
        return aReturn;
    }
}