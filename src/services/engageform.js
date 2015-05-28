'use strict';

angular.module('4screens.settings').provider( 'SettingsEngageformService', function() {
    var mockPost = false;

    this.mockPostCommunication = function mockPosts() {
      mockPost = true;
    };

    this.$get = function( $http, $q, CONFIG ) {

      // Gives the ability to send mocked post requests if the mockPosts settings is set to true.
      function sendPostRequest( url, data ) {
        if (mockPost) {
          var deferred;
          deferred = $q.defer();
          deferred.resolve({ data: data });
          return deferred.promise;
        } else {
          return $http.post( url, data );
        }
      }

      return {
        get: function( engageFormId ) {
          if (!engageFormId) {
            throw 'engageFormId has not been set!';
          }

          return $http.get( CONFIG.backend.answers.domain + CONFIG.backend.answers.getQuizUrl.replace( ':quizId', engageFormId ) ).then(function( res ) {
            return res.data;
          });
        },
        sendAnswer: function( response ) {
          if (!response) {
            throw 'response has not been set!';
          }
          if (!response.quizQuestionId) {
            throw 'response quizQuestionId has not been set!';
          }

          return sendPostRequest(
            CONFIG.backend.answers.domain + CONFIG.backend.answers.answerUrl.replace( ':questionId', response.quizQuestionId ),
            response
          ).then(function( res ) {
              return res.data;
            });
        },
        getQuestions: function( engageFormId ) {
          if (!engageFormId) {
            throw 'engageFormId has not been set!';
          }

          return $http.get( CONFIG.backend.answers.domain + CONFIG.backend.answers.getQuestionsUrl.replace( ':quizId', engageFormId ) ).then(function( res ) {
            return res.data;
          });
        },

        submitQuiz: function( engageFormId, userIdent, globalUserIdent ) {
          return sendPostRequest( CONFIG.backend.answers.domain + CONFIG.backend.answers.submitQuizUrl.replace( ':quizId', engageFormId ), { userIdent: userIdent, globalUserIdent: globalUserIdent } ).then(function( res ) {
            return res.data;
          });
        },

        // Gives global user ident
        getGlobalUserIndent: function () {
          return $http.get( CONFIG.backend.answers.domain + CONFIG.backend.user.getGlobalIdent ).then(function( res ) {
            return res.data.globalUserIdent;
          });
        }
      };
    };
  }
);
