function skillsMember() {
  return {
    restrict: 'E',
    scope: {
      member: '=',
      skills: '='
    },git add member.js
    template: '<h3>{{member.name}}</h3><ul><li ng-repeat="skill in skills">{{skill}}</li></ul>'
  };
}
