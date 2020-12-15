sap.ui.define([
  "SashasProject/controller/BaseController.controller"
], function (BaseController) {
  "use strict";
  return BaseController.extend("SashasProject.controller.Class", {

    onInit: function () {
      this.getOwnerComponent().getRouter().getRoute("class").attachPatternMatched(this._onObjectMatched, this);
    },

    onAfterRendering: function() {
      this._onObjectMatched();
    },

    _onObjectMatched: function(oEvent) {
      var sQuery = this.getModel("Model").oData.classVar;
      var oBinding = this.getView().byId("classCarousel").getBinding("pages");
      oBinding.filter([
          new sap.ui.model.Filter("class", sap.ui.model.FilterOperator.Contains, sQuery)
      ]);


    },

    onPress: function(oEvent) {
      //var oBinding = oEvent.getParameter("classCarousel").getBindingContext();
    }
  });
});
