sap.ui.define([
  "SashasProject/controller/BaseController.controller"
], function (BaseController) {
  "use strict";

  return BaseController.extend("SashasProject.controller.App", {

    onGoToCheckYourself: function () {
      this.getRouter().navTo("checkYourself");
    }
  });
});
