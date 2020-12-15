sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History",
  'sap/ui/model/Sorter',
  "sap/ui/model/resource/ResourceModel",
  "sap/ui/core/util/File",
  'sap/m/MessageToast'
], function (Controller, History, Sorter, ResourceModel, File, MessageToast ) {
  "use strict";

  return Controller.extend("SashasProject.controller.BaseController", {
    onInit: function () {
      
    },

    getModel: function (oEvent) {
      return this.getOwnerComponent().getModel("Model");
    },

    getRouter: function (oEvent) {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },

    onMenuButtonPress : function (oEvent) {
      var viewId = this.getView().getId();
      var mainPage = sap.ui.getCore().byId(viewId + "--main");
      mainPage.setSideExpanded(!mainPage.getSideExpanded());
    },

    sideNavIsSelected: function (oEvent) {
      var oItem = oEvent.getParameter("item");
      var oContext = oItem.getBindingContext("Model");
      var sPath = oContext.sPath;
      var aPath = sPath.split("/");
      if (aPath.length == 5) {
        this.getModel("Model").setProperty('/classVar', oContext.oModel.getProperty(sPath).title);
        console.log(this.getModel("Model").oData.classVar);
      }
      
      var oModelObject = oContext.oModel.getProperty(sPath);
      var fNavigation = oModelObject.routTo;
     
      if (fNavigation == "main") {
        this.goToMain();
      } else if (fNavigation == "class") {
        this.goToClass();
      } else if (fNavigation == "chapter") {
        this.goToChapter();
      } else if (fNavigation == "aboutWebsite") {
        this.goToWebsite();
      }
    },

    onNavBack: function (oEvent) {
      var oHistory, sPreviousHash;
      oHistory = History.getInstance();
      sPreviousHash = oHistory.getPreviousHash();
      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        this.getRouter().navTo("main", {}, true /*no history*/);
      }
    },

    goToMain: function (oEvent) {
      this.getRouter().navTo("main");
    },

    goToClass: function (oEvent) {
      this.getRouter().navTo("class");
      this.getView().fireAfterRendering();
    },

    goToChapter: function (oEvent) {
      this.getRouter().navTo("chapter");
    },

    goToWebsite: function (oEvent) {
      this.getRouter().navTo("aboutWebsite");
    }
  });
});
