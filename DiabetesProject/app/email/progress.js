if (Meteor.isClient) {

  Progress = new Mongo.Collection("progress");

 Template.progressBar.onCreated(function () {
  var self = this;

  self.autorun(function () {
    self.subscribe("Progress");
  });
});

  Template.progressBar.helpers({
  curValue: function () {
    query = Progress.findOne({user: Meteor.userId()}).curValue;
    if(query != undefined){
      return query;
    }else{
     console.log("collection isn't ready");
    }
  }
});
 // function changeColor(value){
    //run some code
  //}

}

if (Meteor.isServer) {

  Progress = new Mongo.Collection("progress");

  Meteor.publish("progress", function () {
    return Progress.find({user: this.userId});
  });

}