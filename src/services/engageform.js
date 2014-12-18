'use strict';

angular.module('4screens.settings').factory( 'SettingsEngageformService',
  function( $http, CONFIG ) {
    return {
      get: function( engageFormId ) {
        if( !engageFormId ) {
          throw 'engageFormId has not been set!';
        }

        return $http.get( CONFIG.backend.answers.domain + CONFIG.backend.answers.getQuizUrl.replace( ':quizId', engageFormId ) ).then(function( res ) {
          return res.data;
        });
      },
      sendAnswer: function( response ) {
        if( !response ) {
          throw 'response has not been set!';
        }
        if( !response.quizQuestionId ) {
          throw 'response quizQuestionId has not been set!';
        }

        return $http.post(
          CONFIG.backend.answers.domain + CONFIG.backend.answers.answerUrl.replace( ':questionId', response.quizQuestionId ),
          response
        ).then(function( res ) {
          return res.data;
        });
      },
      getQuestions: function( engageFormId ) {
        if( !engageFormId ) {
          throw 'engageFormId has not been set!';
        }

        return $http.get( CONFIG.backend.answers.domain + CONFIG.backend.answers.getQuestionsUrl.replace( ':quizId', engageFormId ) ).then(function( res ) {
          return res.data;
        });
      }
    };
  }
);
