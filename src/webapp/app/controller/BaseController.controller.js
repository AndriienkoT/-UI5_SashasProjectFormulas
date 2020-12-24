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

    getModel: function (oEvent) {
      return this.getOwnerComponent().getModel("Model");
    },

    getRouter: function (oEvent) {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },

    //press of side navigation button
    onMenuButtonPress : function (oEvent) {
      var viewId = this.getView().getId();
      var aViewId = viewId.split("-");
      if (aViewId[aViewId.length - 1] == "checkYourself") {
        var mainPage = sap.ui.getCore().byId(viewId + "--class");
      } else {
        var mainPage = sap.ui.getCore().byId(viewId + "--" + aViewId[aViewId.length - 1]);
      }
      mainPage.setSideExpanded(!mainPage.getSideExpanded());
    },

    //slection of items in side navigation
    sideNavIsSelected: function (oEvent) {
      var oItem = oEvent.getParameter("item");
      var oContext = oItem.getBindingContext("Model");
      var sPath = oContext.sPath;
      var aPath = sPath.split("/");
      if (aPath.length == 5) {
        if (aPath[2] == "1") {
          this.getModel("Model").setProperty('/classVar', oContext.oModel.getProperty(sPath).title);
        } else if (aPath[2] == "2") {
          this.getModel("Model").setProperty('/chapterVar', oContext.oModel.getProperty(sPath).title);
        }
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

    //press of back arrow
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
      this.getView().fireAfterRendering();
    },

    goToWebsite: function (oEvent) {
      this.getRouter().navTo("aboutWebsite");
    }
  });
});
