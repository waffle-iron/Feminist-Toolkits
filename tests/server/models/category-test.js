'use strict';

var expect = require('chai').expect;
var Category = require('../../../server/db/models/category');
var db = require('../../../server/db/_db');

describe('Category', function () {

  /**
   * First we clear the database and recreate the tables before beginning each run
   */
  before(function () {
    return db.sync({force: true});
  });

  it('has name', function () {
    return Category.create({
      name: 'Migratory Birds',
    }).then(function (savedCategory) {
      expect(savedCategory.name).to.equal('Migratory Birds');
    });

  });

  it('requires name', function () {

    var category = Category.build({
    });

    return category.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('notNull');
      });


  });

  it('name cannot be empty', function () {

    var category = Category.build({
      name: '',
    });

    return category.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error');
      });

  });
});
