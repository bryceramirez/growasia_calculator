(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Analysis = App.Controller.Page.extend({

    index: function(params) {
      new App.View.Header({
        el: '#headerView'
      });

      new App.View.Slider({
        params: params,
        el: '#sliderView'
      });

      new App.View.Map({el: '#mapCountries', options:{mode: 'country'}});

      new App.View.Selectors({el: '#mapSelectors'});

      var infoModalView = new App.View.ModalInfo({});

      this.addSelectLib();
      this.removeFields();
      this.selectFields();
    },

    show: function(params) {
      new App.View.Header({
        el: '#headerView'
      });

      var analysisModel = new App.Model.Analysis({
        id: params.id,
        type: 'total'
      });
      var analysisCompareModel = new App.Model.Analysis({
        id: params.id,
        type: 'total'
      });

      var analysisActionsView = new App.View.AnalysisActions({
        el: '#analysisActions'
      });

      var analysisSidebarView = new App.View.AnalysisSidebar({
        el: '#analysisSidebarView',
        model: analysisModel,
        modelCompare: analysisCompareModel
      });

      var analysisTotalView = new App.View.AnalysisTotal({
        el: '#analysisTotalView',
        model: analysisModel,
        modelCompare: analysisCompareModel
      });

      var analysisChartsView = new App.View.AnalysisCharts({
        el: '#analysisChartsView',
        model: analysisModel,
        modelCompare: analysisCompareModel
      });

      var analysisToggleView = new App.View.AnalysisToggle({
        el: '#analysisToggleView',
        model: analysisModel,
        modelCompare: analysisCompareModel
      })

      var shareModalView = new App.View.Share({});
      var saveModalView = new App.View.Save({});
      var infoModalView = new App.View.ModalInfo({});
      infoModalView.setGuidance({guidanceType: 'analysis-results'});

      // Fetch the analysis before render the graphs
      analysisModel.fetch();

      this.removeFields();

      this.addSelectLib();
    },

    addSelectLib: function() {
      var $selectors = $('select');

      $selectors.select2({
        theme: "default",
        minimumResultsForSearch: -1,
      });

      $.each($selectors, function() {
        var classList = this.className.split(/\s+/);
        for (var i = 0; i < classList.length; i++) {
          if (classList[i].includes('theme')) {
            $(this).next('.select2-container').addClass(classList[i]);
          }
        }
      });
    },

    selectFields: function() {
    },

    removeFields: function() {
      $(document).on('click', '.-js-remove-fields', function(event) {
        event && event.preventDefault();

        $(this).prev('input[type=hidden]').val('1');
        $(this).parents('.-js-input-wrapper').addClass('is-hidden');
        $(this).parents('.-js-input-wrapper').find('input').removeClass('-js-required');
        return event.preventDefault();
      });
    }

  });


})(this.App);
