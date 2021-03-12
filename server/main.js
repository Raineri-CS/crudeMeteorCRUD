import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ProdCollection } from '/imports/db/ProdCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText, user) =>
  ProdCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'krejciContrataNois';
const SEED_PASSWORD = 'ArchRocks';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (ProdCollection.find().count() === 0) {
    [
    ].forEach(taskText => insertTask(taskText, user));
  }
});
