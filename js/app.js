var app = angular.module('app', ['pascalprecht.translate','ngCookies']);

app.component('feature', {
    template: '<div class="icon"> <img ng-if="$ctrl.image" ng-src="{{$ctrl.image}}"> <i ng-if="$ctrl.icon" ng-class="$ctrl.icon"></i></div> </div><div class="feature-single"><h1>{{$ctrl.headline|translate}}</h1><p style="white-space: pre-wrap;">{{$ctrl.text|translate}}</p></div>',
    bindings: {
        feature: '<',
        domain: '<',
        icon: '<',
        image: '<'
    },
    controller: function() {
        this.$onInit = function() {
            if(this.domain==undefined)
                this.domain='FEATURES';
            this.headline = this.domain+'.'+this.feature;
            this.text = this.domain+'.' + this.feature + "_TEXT";
        };
    },
});

app.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/',
        suffix: '.json'
    });
    $translateProvider.registerAvailableLanguageKeys(['en', 'zh'], {
        'en-US': 'en',
        'en-UK': 'en',
        'zh-ZH': 'zh'
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters')
        .determinePreferredLanguage()
        .useCookieStorage()
        .fallbackLanguage('en');
}]);

app.controller('language', ['$scope', '$translate', function($scope, $translate) {
    $scope.language = $translate.proposedLanguage() || $translate.use();
    $scope.changeLanguage = function(key) {
        $translate.use(key).then(function(lang) {
            $scope.language = lang;
            console.log('change lang to: ' + lang);
        });
    };
}]);
