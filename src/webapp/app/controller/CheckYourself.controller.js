sap.ui.define([
  "SashasProject/controller/BaseController.controller"
], function (BaseController) {
  "use strict";
  return BaseController.extend("SashasProject.controller.CheckYourself", {

    onInit: function () {
      this.getOwnerComponent().getRouter().getRoute("checkYourself").attachPatternMatched(this._onObjectMatched, this);
    },

    onAfterRendering: function() {
      this._onObjectMatched();
    },

    //what should be done in case it is routed to the page, but onInit is not called because the page was rendered already earlier
    _onObjectMatched: function(oEvent) {
      var aSelectedFormulas = this.getModel("Model").oData.selectedFormulasVar;

      if (aSelectedFormulas.length > 0) {
        this.onFilterBySelectedFormulas();
      } else {
        this.onTakeTenRandom();
      }
    },

    //when routed from Main page, 10 random formulas are set to carousel model
    onTakeTenRandom: function() {
      var aFormulaIds = [];
        for (var i = 0; i < 55; i++) {
          aFormulaIds[i] = i;
        }
        var aRandomFormulaIds = aFormulaIds.sort(() => 0.5 - Math.random());
        let aTenRandomRormulaIds = aRandomFormulaIds.slice(0, 10);
        var oData = this.getModel().oData.formulas;
        var oSortedCurrentModel = {
          "formulas": []
        };
        aTenRandomRormulaIds.forEach(function(item, index) {
          oData.forEach(function(itemInOData, index) {
            if (itemInOData.id == item) {
              oSortedCurrentModel.formulas.push(itemInOData);
            }
          });
        });     
        this.getView().byId("formulaCarousel").setModel(new sap.ui.model.json.JSONModel(oSortedCurrentModel));
    },

    //when routed from Class page, sorted formulas by selected formulas are set to carousel model
    onFilterBySelectedFormulas: function() {
      var aSelectedFormulas = this.getModel("Model").oData.selectedFormulasVar;
      var oData = this.getModel().oData.formulas;
      var oSortedCurrentModel = {
        "formulas": []
      };

      aSelectedFormulas.forEach(function(itemInSelectedFormulas, index) {
        oData.forEach(function(itemInOData, index) {
          if (itemInOData.id == itemInSelectedFormulas) {
            oSortedCurrentModel.formulas.push(itemInOData);
          }
        });
      });   
      this.getView().byId("formulaCarousel").setModel(new sap.ui.model.json.JSONModel(oSortedCurrentModel));
    }
  });
});
