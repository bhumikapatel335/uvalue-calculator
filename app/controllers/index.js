import Ember from 'ember';
import CONSTANTS from 'uvalue-calculator/helpers/contants';

export default Ember.Controller.extend({

  outsideSurface: CONSTANTS.OUTSIDE_SURFACE,

  insideSurface: CONSTANTS.INSIDE_SURFACE,

  totalSurface: Number(CONSTANTS.OUTSIDE_SURFACE) + Number(CONSTANTS.INSIDE_SURFACE),

  totalRes: Ember.computed('model.length', function() {
    var total = this.get('totalSurface');
    var materials = this.store.peekAll('material');
    materials.forEach(function(material) {
      var resistivity = material.get('resistivity');
      total = Number(total) + Number(resistivity);
    });

    return total.toFixed(3);
  }),

  uValue: Ember.computed('totalRes', function() {
    return (1 / this.get('totalRes')).toFixed(3);
  }),

  actions: {
    addMaterial: function(materialName, thickness, kValue) {
      var material = this.store.createRecord('material', {
        materialName: materialName,
        thickness: thickness,
        kValue: kValue
      });
    },

    deleteMaterial: function(material) {
      this.store.deleteRecord(material);
    }
  }
});
