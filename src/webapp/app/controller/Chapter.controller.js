sap.ui.define([
    "SashasProject/controller/BaseController.controller"
  ], function (BaseController) {
    "use strict";
    return BaseController.extend("SashasProject.controller.Chapter", {
  
      onInit: function () {
        this.getOwnerComponent().getRouter().getRoute("chapter").attachPatternMatched(this._onObjectMatched, this);
      },
  
      onAfterRendering: function() {
        this._onObjectMatched();
      },
  
      _onObjectMatched: function(oEvent) {
        var sQuery = this.getModel("Model").oData.classVar;
        var oBinding = this.getView().byId("chapterCarousel").getBinding("pages");
        oBinding.filter([
            new sap.ui.model.Filter("chapter", sap.ui.model.FilterOperator.Contains, sQuery)
        ]);
      },
  
      onPress: function(oEvent) {
        //var oBinding = oEvent.getParameter("chapterCarousel").getBindingContext();
      }
    });
  });