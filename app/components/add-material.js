import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({

  errors: DS.Errors.create(),

  actions: {
    addMaterial: function() {
      if (this.validateInput()) {

        var materialName = this.get('materialName');
        var thickness = this.get('thickness');
        var kValue = this.get('kValue');

        // Send action to controller
        this.sendAction('addMaterial', materialName, thickness, kValue);

        // Clear form after adding material
        this.setProperties({
          materialName: '',
          thickness: '',
          kValue: ''
        });
      }
    }
  },

  //validate all the input fields
  validateInput: function() {

    this.set('errors', DS.Errors.create());

    var materialName = this.get('materialName');
    var thickness = this.get('thickness');
    var kValue = this.get('kValue');

    if (materialName === undefined || materialName.trim() === '') {
      this.get('errors').add('materialName', "Material Name cannot be empty");
    }

    if (thickness === undefined || thickness.trim() === '') {
      this.get('errors').add('thickness', "Thickness cannot be empty");
    } else if (isNaN(thickness)) {
      this.get('errors').add('thickness', "Please enter number only");
    }

    if (kValue === undefined || kValue.trim() === '') {
      this.get('errors').add('kValue', "K Value cannot be empty");
    } else if (isNaN(kValue)) {
      this.get('errors').add('kValue', "Please enter number only");
    }

    return this.get('errors.isEmpty');
  }
});
