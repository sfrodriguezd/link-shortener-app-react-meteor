import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';


Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if(link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
  //
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('This is from my custom middleware.');
  //   console.log(req.url, req.method, req.headers, req.query);
  //   // res.statusCode = 404;
  //   // res.setHeader('my-custom-header', 'Sebastian was here!');
  //   // // res.write('<h1>This is my middleware in action!</h1>');
  //   // res.end();
  //   next();
  // });
});
  // code to run on server at startup

  // try {
  //   throw new Meteor.Error(400, 'Please enter a valid email.');
  // } catch (e) {
  //   console.log(e);
  // }

  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 15,
  //     optional: true
  //   },
  //   age: {
  //     type: Number,
  //     min: 0
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone
  //   }
  // });
  //
  // petSchema.validate({
  //   // name: 3,
  //   age: 1,
  //   contactNumber: '333'
  // });

  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 0
  //   },
  //   email: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });
  //
  // employeeSchema.validate({
  //   name: 'Me',
  //   hourlyWage: 20,
  //   email: 'test@test.com'
  // })
