import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  materialName: DS.attr('string'),
  thickness: DS.attr('number'),
  kValue: DS.attr('number'),

  resistivity: Ember.computed('thickness', 'kValue', function() {
    return (this.get('thickness') / this.get('kValue')).toFixed(3);
  })

});
