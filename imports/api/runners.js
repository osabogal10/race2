import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Runners = new Mongo.Collection('runners');

if (Meteor.isServer) {
  Meteor.publish('runners', () => {
    return Runners.find({});
  });
}

Meteor.methods(
  {
    'runners.add': function() {
      const name = Meteor.user().username;
      if(!name){
        throw new Meteor.Error('Not Authorized');
      }
      Runners.upsert(
        {name},
        {
          name,
          pos:0
        });

      const player = Runners.findOne({name});
      return player;
    },    
    'runners.run'() {
      const name = Meteor.user().username;
      if(!name){
        throw new Meteor.Error('Not Authorized');
      }

      Runners.update({name},
        {$inc:{pos:1}
      });
    }
  }
);
