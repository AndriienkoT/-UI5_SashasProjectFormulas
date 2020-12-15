sap.ui.define([
  "sap/ui/core/Control"

], function (Control) {
  "use strict";
  return Control.extend("SashasProject.control.FlipCard", {
    metadata : {
      properties: {
        frontText: 'string',
        backText: 'string'
      },
      events: {
        click: {}
      }
    },
    renderer: function (oRm, oControl) {
      oRm.write("<div");
      oRm.writeControlData(oControl);
      oRm.addClass("flip");
      oRm.writeClasses();
      oRm.write(">");
      oRm.write('<div class="card">');
      oRm.write('<div class="face front">');
      oRm.write(oControl.getFrontText());
      oRm.write('</div>');
      oRm.write('<div class="face back">');
      oRm.write(oControl.getBackText());
      oRm.write('</div>');
      oRm.write('</div>');
      oRm.write("</div>");
    },

    onAfterRendering: function () {
      var $this = this.$();
      var self = this;
      $this.click(function () {
        if ($(this).hasClass('flipped') === false) {
          self.fireClick();
        }
      });

      $this.find('.card').mouseover(function () {
        $(this).addClass('flipped');
      });
      $this.find('.card').mouseleave(function () {
        $(this).removeClass('flipped');
      });
    }
  });
});
