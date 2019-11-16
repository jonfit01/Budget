var budgetController = (function(){
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  var data = {
    allItems:{
      exp:[],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  return {
    addItem: function(type, des, val){
      var newItem, ID;
      
      //create new id
      if (data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else{
        ID = 0;
      }
      


      //create new item
      if(type === 'exp'){
        newItem = new Expense(ID, des, val);
      }else if(type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      //push to new data
      data.allItems[type].push(newItem);

      return newItem;

    }, 

    testing: function(){
      console.log(data);
    }
  }

})();

var UIController = (function(){
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'


  }
  return {
    getInput: function(){
      return {
        type : document.querySelector(DOMStrings.inputType).value,
        description : document.querySelector(DOMStrings.inputDescription).value,
        value : document.querySelector(DOMStrings.inputValue).value
      }
      
    },

    getDOMStrings: function(){
      return DOMStrings;
    }
  }
})();

var controller = (function(budgetCtrl, UICtrl){

  var setUpEventListeners = function(){

    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
      if (event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }
    });
  }

  var ctrlAddItem = function(){

    //get the field input data
    var input = UICtrl.getInput();

    //add the item to budget controller
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //
  }

  return{
    init: function(){
      console.log("Application started");
      setUpEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();

