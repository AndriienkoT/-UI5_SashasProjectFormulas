sap.ui.define([
  "SashasProject/controller/BaseController.controller"
], function (BaseController) {
  "use strict";
  return BaseController.extend("SashasProject.controller.Class", {

    onInit: function () {
      this.getOwnerComponent().getRouter().getRoute("class").attachPatternMatched(this._onObjectMatched, this);
      this.getModel("Model").oData.selectedFormulasVar = [];
      this.getView().setModel(this.getModel());
    },

    onAfterRendering: function() {
      this._onObjectMatched();

      //set selection mode of smart list
      var oTree = this.getView().byId("chapterSmartList").getList();
			oTree.setMode("MultiSelect");

      //set item selection of smart list
      var that = this;
      this.getView().byId("chapterSmartList").getList().attachSelect(function(oEvent){
        that.onHandleItemSelect();
      });
    },

    //what should be done in case it is routed to the page, but onInit is not called because the page was rendered already earlier
    _onObjectMatched: function(oEvent) {
      var oData = this.getModel().oData.formulas;
      var oSortedCurrentModel = {
        "formulas": []
      };
      var sClassVar = this.getModel("Model").oData.classVar;
      oData.forEach(function(item, index) {
        if (sClassVar == "" || item.class == sClassVar) {
          var nChapterExist = null;
          oSortedCurrentModel.formulas.forEach(function(itemInSortedCurrentModel, index) {
            if (itemInSortedCurrentModel.text == item.chapter) {
              nChapterExist = index;
            }
          });
          if (nChapterExist == null) {
            var oNewItem = {
              "text" : item.chapter,
              "nodes" : []
            };
            oNewItem.nodes.push(item);
            oSortedCurrentModel.formulas.push(oNewItem);
          } else {
            oSortedCurrentModel.formulas[nChapterExist].nodes.push(item);
          }
        }
      });
      var oSmartlist = this.getView().byId("chapterSmartList");

      //removing selections
      oSmartlist.getList().removeSelections(true);
      oSmartlist.setModel(new sap.ui.model.json.JSONModel(oSortedCurrentModel));

      //displaying "goToCardsButton"
      this.getView().byId("goToCardsButton").setVisible(false);
      this.getView().byId("selectFormulasButton").setVisible(true);
    },

    //press of "selectFormulasButton" (smart list expanding)
    onSelectFormulasPress: function(oEvent) {
      var that = oEvent.getSource().getParent().getParent().getParent().oController;
      that.getView().byId("chapterSmartList").getList().expandToLevel(1);
    },

    //press of "goToCardsButton" (navigating to "checkYourself")
    onDeselectFormulasPress: function(oEvent) {
      var that = oEvent.getSource().getParent().getParent().getParent().oController;
      that.getRouter().navTo("checkYourself");
    },

    //handling of selection of smart list item
    onHandleItemSelect: function(oEvent) {
      var aSelectedItems = this.getView().byId("chapterSmartList").getList().getSelectedItems();
      var oButton = this.getView().byId("selectFormulasButton");
      var aSelectedFormulas = [];
      aSelectedItems.forEach(function (item, index) {
        aSelectedFormulas.push(item.getProperty("title"));
      });
      var uniqueArray = aSelectedFormulas.filter(function(item, pos) {
          return aSelectedFormulas.indexOf(item) == pos;
      });
      this.getModel("Model").oData.selectedFormulasVar = uniqueArray;
      if (aSelectedItems.length > 0) {
        //displaying "goToCardsButton"
        this.getView().byId("selectFormulasButton").setVisible(false);
        this.getView().byId("goToCardsButton").setVisible(true);
      } else {
        //displaying "selectFormulasButton"
        this.getView().byId("goToCardsButton").setVisible(false);
        this.getView().byId("selectFormulasButton").setVisible(true);
      }
    }
  });
});
