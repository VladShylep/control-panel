$(document).ready(() => {
  const data = getLocalStorageData("data");

  handleStep();

  $("#marketing-name").val(data.marketingName);
  $("#technical-name").val(data.technicalName);

  toggleSteps(data);

  handleMarketingNameInput();
  handleTechnicalNameInput();
  $("#step-2").click(function(){
    window.location.href = "ulotka.html"
  }); 
});

const handleMarketingNameInput = () => {
  $("#marketing-name").on("input", () => {
    const value = $("#marketing-name").val();
    const data = getLocalStorageData("data");

    localStorage.setItem(
      "data",
      JSON.stringify({ ...data, marketingName: value })
    );
    toggleSteps({ ...data, marketingName: value });
  });
};

const handleTechnicalNameInput = () => {
  $("#technical-name").on("input", () => {
    const value = $("#technical-name").val();
    const data = getLocalStorageData("data");

    localStorage.setItem(
      "data",
      JSON.stringify({ ...data, technicalName: value })
    );
    toggleSteps({ ...data, technicalName: value });
  });
};

const getLocalStorageData = (key) => {
  const data = localStorage.getItem(key);
  const parsedData = JSON.parse(data);

  return parsedData;
};

const toggleSteps = (data) => {
  if (data.technicalName || data.marketingName) {
    $(".step").each((index, el) => {
      if ($(el).hasClass("step-disabled")) {
        $(".step").removeClass("step-disabled").prop('disabled', false);
      }
    });
  } else {
    $(".step").each((index, el) => {
      if ($(el).hasClass("step-disabled")) return $("#step-1").removeClass("step-disabled");

      $(".step").addClass("step-disabled").prop('disabled', true);
    });
  }
};

const handleStep = () => {
  $(".step").each((index, el) => {
    $(el).click(() => {
      const step = $(el).find(".step-text").text() || $(el).text();

      $(".step.step-active").removeClass("step-active");
      $(el).addClass("step-active");

      if (step === "Definition") {
        $(".description").css("display", "block");
        $(".conditions").css("display", "block");
        $(".summary").css("display", "none");
        return $(".description > .title").text("Description");
      }

      $(".description > .title").text(step);

      if (step === "Summary") {
        $(".description").css("display", "none");
        $(".conditions").css("display", "none");
        $(".summary").css("display", "flex");
      }
    });
  });
};
