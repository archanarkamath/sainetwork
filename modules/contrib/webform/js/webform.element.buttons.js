/**
 * @file
 * JavaScript behaviors for jQuery UI buttons (checkboxradio) element integration.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.webform = Drupal.webform || {};
  Drupal.webform.buttons = Drupal.webform.buttons || {};
  Drupal.webform.buttons.selector = Drupal.webform.buttons.selector || [
    // Applies to Classy, Bartik, and Seven themes.
    '.js-webform-buttons .form-radios',
    // Applies to Stable and Bootstrap themes.
    '.js-webform-buttons .js-form-type-radio'
  ].join(',');

  /**
   * Create jQuery UI buttons element.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformButtons = {
    attach: function (context) {
      $(context).find(Drupal.webform.buttons.selector).once('webform-buttons').each(function () {
        var $buttons = $(this);

        // Remove classes around radios and labels and move to main element.
        $buttons.find('input[type="radio"], label').each(function () {
          $buttons.append($(this).removeAttr('class'));
        });

        // Remove all empty div wrappers.
        $buttons.find('div').remove();

        // Must reset $buttons since the contents have changed.
        $buttons = $(this);

        // Get radios.
        var $input = $buttons.find('input[type="radio"]');

        // Create checkboxradio.
        $input.checkboxradio({icon: false});

        // Disable checkboxradio.
        $input.checkboxradio('option', 'disabled', $input.is(':disabled'));

        // Turn checkboxradio off/on when the input is disabled/enabled.
        // @see webform.states.js
        $input.on('webform:disabled', function () {
          $input.checkboxradio('option', 'disabled', $input.is(':disabled'));
        });
      });
    }
  };

})(jQuery, Drupal);
