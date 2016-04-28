(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

  PrescriptionNewOrEditCtrl.$inject = [
    '$rootScope',
    '$scope',
    'Prescription',
    '$stateParams',
    'Account',
    'ngDialog',
    '$state'
  ];

  function PrescriptionNewOrEditCtrl($rootScope, $scope, Prescription, $stateParams, Account, ngDialog, $state) {
    $rootScope.pageHeader = "Create Prescription";

    var patientId = $stateParams.patientId;
    
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }
    var user = Account.getAuthenticatedAccount();
    

    var pid = $stateParams.prescriptionId;
    if (_.isEmpty(pid)) {
      $scope.prescription = new Prescription;
      Init();
    } else {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        pid: pid,
        columnsToGet: ""
      };

      $scope.prescription = Prescription.get(params);
      $scope.prescription.$promise.then(function (response) {
        delete $scope.prescription.pid; // We do not want to send the pid;
        delete $scope.prescription._id;
        if ($scope.loadImageFn && !_.isUndefined($scope.canvasIdx)
                               && $scope.prescription.images.length > $scope.canvasIdx) {
          $scope.loadImageFn($scope.prescription.images[$scope.canvasIdx].src);
        }
        InitItems();
      });
    }

    $scope.canvasIdx = 0;
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.dialogTitle = "New Prescription";
    $scope.canvasEnabled = user.loggedInUser.settings.canvasEnabled;
    $scope.loadCanvas = LoadCanvas;

    function LoadCanvas(currIdx) {
      if( _.isUndefined(currIdx) ) {
        $scope.prescription.images[$scope.canvasIdx].src = $scope.saveImageFn();
        $scope.canvasIdx++;
        $scope.prescription.images.push({});
        $scope.loadImageFn($scope.prescription.images[$scope.canvasIdx].src);
      } else {
        if( currIdx < 0 || currIdx > $scope.prescription.images.length-1 ) return; // Defensive check
        $scope.prescription.images[$scope.canvasIdx].src = $scope.saveImageFn();
        $scope.canvasIdx = currIdx;
        $scope.loadImageFn($scope.prescription.images[$scope.canvasIdx].src);
      }
    }

    // API exposed by WILL directive
    $scope.setDirectiveFn = function(saveImageFn, loadImageFn) {
        $scope.saveImageFn = saveImageFn;
        $scope.loadImageFn = loadImageFn;
    };

    // Prescription
    $scope.save = UpsertPrescription;
    $scope.close = ClosePrescription;
    $scope.minimize = Minimize;
    $scope.addMedicines = AddMedicines;
    $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;
    $scope.templateNameDialog = TemplateNameDialog;
    $scope.search = SearchMedicine;

    // Medicine/Advises
    $scope.upsertItem = UpsertItem;

    // Canvas | free write
    $scope.closeCanvas = CloseCanvas;

    function Init() {
      $scope.prescription.patientId = patientId;
      $scope.prescription.doctorId = user.userId;
      // Fill defaults from session object maybe
      $scope.prescription.isUpdate = false; // for edit we change this to true
      // Medications
      $scope.prescription.medcines = [];
      $scope.prescription.advises = [];
      $scope.prescription.images = [{}]; // Save prescription images

      InitItems();

      var defaultDate = new Date();
      // Add 7 days
      defaultDate.setDate(defaultDate.getDate() + 7);
      $scope.prescription.nextVisit = {};
      $scope.prescription.nextVisit.date = moment(defaultDate).format("DD/MM/YYYY hh:mm A");
    }

    function InitItems() {
      ['medcines', 'advises'].forEach(function (itemsStr) {
        var len = $scope.prescription[itemsStr].length;
        if (len == 0 || (!_.isEmpty($scope.prescription[itemsStr][len - 1]) &&
            Object.keys($scope.prescription[itemsStr][len - 1]).length !== 1)) {
          $scope.prescription[itemsStr].push({});
        }
      });
    }

    function UpsertPrescription() {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        prescription: $scope.prescription
      };

      ['medcines', 'advises'].forEach(function (itemStr) {
        var len = $scope.prescription[itemStr].length;
        if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
            Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
          $scope.prescription[itemStr].pop();
        }
      });

      $scope.myPromise = Prescription.upsert(params, function (response) {
        if (_.isEqual(response.respCode, 1)) {
          $scope.closeThisDialog({
            state: 'saved',
            data: response.pid
          });
        } else {
          // Show Error
          console.log(response);
        }
      });
    }

    function TemplateNameDialog() {
      var templateNameDialog = ngDialog.open({
        template: 'Prescriptions/partials/prescriptions.template-name-dialog.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: true,
        closeByEscape: false,
        closeByDocument: false,
        controller: 'PrescriptionNewOrEditCtrl'
      });
    }

    function UpsertPrescriptionAsTemplate() {


      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        isTemplate: "true",
        templateName: $scope.templatename,
        prescription: $scope.prescription
      };

      ['medcines', 'advises'].forEach(function (itemStr) {
        var len = $scope.prescription[itemStr].length;
        if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
            Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
          $scope.prescription[itemStr].pop();
        }
      });

      $scope.myPromise = Prescription.upsert(params, function (response) {
        if (_.isEqual(response.respCode, 1)) {
          $scope.closeThisDialog({
            state: 'saved',
            data: response.pid
          });
        } else {
          // Show Error
          console.log(response);
        }
      });
    }

    function UpsertItem(item, index) {
      var itemStr, itemsStr;
      $scope.itemStr = itemStr = item;
      $scope.itemsStr = itemsStr = item + 's';

      $scope[itemStr] = {};
      $scope.editMode = !_.isUndefined(index);
      if ($scope.editMode)
        angular.copy($scope.prescription[itemsStr][index], $scope[itemStr]);

      var upsertDialog = ngDialog.open({
        template: 'Prescriptions/partials/prescriptions.upsert-' + itemStr + '.html',
        className: 'ngdialog-theme-default custom-width-2',
        scope: $scope,
        showClose: false,
        closeByEscape: false,
        closeByDocument: false,
        controller: 'PrescriptionUpsertItemCtrl'
      });

      upsertDialog.closePromise.then(function (data) {
        if (data.value == "Add") {
          $scope.prescription[itemsStr].push($scope[itemStr]);
        } else if (data.value == "Update") {
          $scope.prescription[itemsStr][index] = $scope[itemStr];
        }
      });
    }

    function Minimize() {
      $scope.closeThisDialog({state: 'minimized'});
    }

    function ClosePrescription() {
      $scope.closeThisDialog({state: 'closed'});
    }

    function CloseCanvas() {
      $scope.canvasEditable = false;
    }

    function AddMedicines() {
      // Save prescription image
      $scope.prescription.imgDiagnosis = $scope.saveImageFn();

      $state.go('PrescriptionAddMedicines', {
        patientId: $stateParams.patientId,
        prescription: $scope.prescription
      });
    }

    function SearchMedicine(searchText) {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        doctorId: user.userId,
        searchText: searchText,
        limit: 5,
        columnsToGet: ""
      };
      $scope.myPromise = Prescription.searchMed(params).$promise;
      return Prescription.searchMed(params).$promise;
    }
  }
})();
