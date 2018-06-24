var app = angular.module('app', ['pascalprecht.translate']);

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
        .fallbackLanguage('en');
}]);

app.controller('language', ['$scope', '$translate', function($scope, $translate) {
    $scope.language=$translate.proposedLanguage() || $translate.use();
    $scope.changeLanguage = function(key) {
        $translate.use(key).then(function(lang){
            $scope.language=lang;
            console.log('change lang to: ' + lang);
        });
    };
}]);
