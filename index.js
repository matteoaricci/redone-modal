$(function () {
  /**
   * Multi Step Form Logic
   */

  let $currentFs, $nextFs, $previousFs;
  let opacity;
  let percent;
  let current = 1;
  let steps = 3;

  let $progressBar = $(".progress-bar");
  let $continueBtn = $(".continue");
  let $previousBtn = $(".previous");

  let $bodyTitle = $(".body-header-title");
  let $stepNumber = $(".step-number");

  let $filterSwitch = $(".custom-control-input");
  let $filterPreset = $(".filter-preset");
  let $noFilterPreset = $(".no-filter-preset");

  let $torqueSetModal = $("#torque-set-modal");

  $torqueSetModal.on("show.bs.modal", function (e) {
    setProgressBar(current);
  });

  // Progress Bar Logic

  function setProgressBar(currentStep) {
    currentStep === 3
      ? $progressBar.css("border-radius", "4px")
      : $progressBar.css("border-radius", "4px 0px 0px 4px");

    percent = parseFloat(100 / steps) * currentStep;
    percent = percent.toFixed();

    $progressBar.css("width", percent + "%");
  }

  // Continue Button Logic

  $continueBtn.on("click", function (e) {
    e.preventDefault();

    $currentFs = $(this).parents(".step");
    $nextFs = $currentFs.next();
    $nextFs.show();

    $bodyTitle.text($nextFs.data().steptitle);
    $stepNumber.text($nextFs.data().step);
    setProgressBar($nextFs.data().step);

    $currentFs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          $currentFs.css({ display: "none", position: "relative" });
          opacity = 1 - now;
          $nextFs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
  });

  // Filter Toggle Logic

  $filterSwitch.on("change.bootstrapSwitch", function (e, state) {
    // $noFilterPreset.toggle();
    // $filterPreset.toggle();
    if (e.target.checked) {
      $noFilterPreset.animate(
        { opacity: 0 },
        {
          step: function (now) {
            $noFilterPreset.css({ display: "none", position: "relative" });
            opacity = 1 - now;
            $filterPreset.css({ opacity: opacity, display: "block" });
          },
          duration: 500,
        }
      );
    } else {
      $filterPreset.animate(
        { opacity: 0 },
        {
          step: function (now) {
            $filterPreset.css({ display: "none", position: "relative" });
            opacity = 1 - now;
            $noFilterPreset.css({ opacity: opacity, display: "block" });
          },
          duration: 500,
        }
      );
    }
  });
});
