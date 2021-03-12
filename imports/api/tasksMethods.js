import { check } from 'meteor/check';
import { ProdCollection } from '/imports/db/ProdCollection';

Meteor.methods({
  'tasks.insert'(ID,nome,qty,price) {
    check(nome, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    // Verifica que o produto nao existe antes de adicionar
    if(!(ProdCollection.find({ID}).count() > 0)){
      ProdCollection.insert({
        ID,
        nome,
        qty,
        price,
        createdAt: new Date(),
        userId: this.userId,
      });
    }
  },

  'tasks.clear'(){
    ProdCollection.deleteMany({});
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = ProdCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    ProdCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = ProdCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    ProdCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
