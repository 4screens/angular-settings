/*
 4screens-settings v0.1.2
 (c) 2014 Nopattern sp. z o.o.
 License: proprietary
*/
'use strict';

angular.module( '4screens.settings', [] );

'use strict';

angular.module('4screens.settings').provider( 'SettingsEngageformService', function() {
    var mockPost = false;

    this.mockPostCommunication = function mockPosts() {
      mockPost = true;
    };

    this.$get = ["$http", "$q", "CONFIG", function($http, $q, CONFIG) {

      // Gives the ability to send mocked post requests if the mockPosts settings is set to true.
      function sendPostRequest(url, data) {
        if (mockPost) {
          var deferred;
          deferred = $q.defer();
          deferred.resolve({data: data});
          return deferred.promise;
        } else {
          return $http.post(url, data);
        }
      }

      return {
        get: function(engageFormId) {
          if (!engageFormId) {
            throw 'engageFormId has not been set!';
          }

          return $http.get(CONFIG.backend.answers.domain + CONFIG.backend.answers.getQuizUrl.replace(':quizId', engageFormId)).then(function(res) {
            return res.data;
          });
        },
        sendAnswer: function(response) {
          if (!response) {
            throw 'response has not been set!';
          }
          if (!response.quizQuestionId) {
            throw 'response quizQuestionId has not been set!';
          }

          return sendPostRequest(
            CONFIG.backend.answers.domain + CONFIG.backend.answers.answerUrl.replace(':questionId', response.quizQuestionId),
            response
          ).then(function(res) {
              return res.data;
            });
        },
        getQuestions: function(engageFormId) {
          if (!engageFormId) {
            throw 'engageFormId has not been set!';
          }

          return $http.get(CONFIG.backend.answers.domain + CONFIG.backend.answers.getQuestionsUrl.replace(':quizId', engageFormId)).then(function(res) {
            return res.data;
          });
        },

        submitQuiz: function(engageFormId, userIdent) {
          return sendPostRequest(CONFIG.backend.answers.domain + CONFIG.backend.answers.submitQuizUrl.replace(':quizId', engageFormId), {userIdent: userIdent}).then(function(res) {
            return res.data;
          });
        }
      };
    }]
  }
);

'use strict';

angular.module('4screens.settings').factory( 'SettingsSocialhubService',
  ["$http", "CONFIG", function( $http, CONFIG ) {
    return {
      get: function( widgetId ) {
        CONFIG.frontend.socialhubWidget.id = widgetId;
        return $http.get( CONFIG.backend.domain + CONFIG.frontend.socialhubWidget.get.replace( ':widgetId', widgetId ) ).then(function( res ) {
          return res.data;
        });
      }
    };
  }]
);