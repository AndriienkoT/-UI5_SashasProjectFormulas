sap.ui.define([
  "SashasProject/controller/BaseController.controller"
], function (BaseController) {
  "use strict";

  return BaseController.extend("SashasProject.controller.App", {

    onInit: function() {
      this.getModel("Model").oData.classVar = "";
      this.getModel("Model").oData.selectedFormulasVar = [];
    },

    onGoToCheckYourself: function () {
      this.getModel("Model").oData.selectedFormulasVar = [];
      this.getRouter().navTo("checkYourself");
    }
  });
});
