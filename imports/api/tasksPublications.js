import { Meteor } from 'meteor/meteor';
import { ProdCollection } from '/imports/db/ProdCollection';

Meteor.publish('tasks', function publishTasks() {
  return ProdCollection.find({ userId: this.userId });
});
