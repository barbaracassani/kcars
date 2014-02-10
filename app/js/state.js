define('state', ['breve-js'], function (breve) {

   return breve.makeObservable({
       init : function () {
            this.currentLevel = 0;
            this.currentScore = 0;
            this.onLevelChanged();
       },
       onLevelChanged : function() {
           this.publish('onLevelChanged', this.currentLevel, this.currentScore);
       }
   })

});