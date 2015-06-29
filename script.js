var myApp = angular.module('myApp', []);
myApp.controller('playersController', function (playerFactory){
   that = this;
   that.players = [];
   that.searchWord = {};
   playerFactory.getPlayers(function(data){
      that.players=data;
   })
   this.addPlayer = function(){
      
      this.errormessage = playerFactory.addPlayer(this.newPlayer);
      console.log('controller' + this.errormessage);
      this.newPlayer = {};
   }
   this.removePlayer = function(item){
      playerFactory.removePlayer(item)
   }
   
});
myApp.controller('ordersController', function (orderFactory){
   that = this;
   that.orders = [];
   orderFactory.getOrders(function(data){
      that.orders=data;
   })
   this.addOrder = function(){
      orderFactory.addOrder(this.newOrder);
      this.newOrder = {};
   }
});
myApp.factory('playerFactory', function (){
   var players = [
      {name:'Bo Jackson', position: 'RB', team:'Raiders'},
      {name:'Reggie White', position: 'DE', team:'Packers'},
      {name:'Dick Butkus', position: 'LB', team:'Bears'},
      {name:'Emmitt Smith', position: 'RB', team:'Cowboys'}];
   var factory = {};
   factory.getPlayers = function (callback){
      callback(players);
   }
   factory.addPlayer = function(player){
      for(i in players){
         if(players[i].name == player.name){
            errormessage = 'Player already exists';
            return errormessage;
         }
      }
      players.push(player);
   }
   factory.removePlayer = function(item){
      players.splice(players.indexOf(item),1);
   }
   return factory
});
myApp.factory('orderFactory', function(){
   var orders = [];
   var factory = {};
   factory.addOrder = function(order){
      order.date = new Date;
      orders.push(order);
   }
   factory.getOrders = function(callback){
      callback(orders);
   }
   return factory
});
myApp.filter('range', function(){
   return function(input,total){
      total = parseInt(total);
      for(var i = 1; i<total+1;i++)
         input.push(i);
      return input;
   }
});