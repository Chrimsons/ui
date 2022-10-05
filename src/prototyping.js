export function registerDateFunctions(){

  Date.prototype.toLocalString = function(){
    return `${this.toLocaleDateString()} ${this.toLocaleTimeString()}`; 
  }

  Date.prototype.toDatetimeLocal = function() {
    let date = this;
    let ten = function (i) {
      return (i < 10 ? '0' : '') + i;
    };
    let YYYY = date.getFullYear();
    let MM = ten(date.getMonth() + 1);
    let DD = ten(date.getDate());
    let HH = ten(date.getHours());
    let II = ten(date.getMinutes());
    let SS = ten(date.getSeconds());
    return YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + II + ':' + SS;
  };
      
  Date.getLongFromDateInput = function(s) {
    let parts = s.split('-'); 
    let year = parseInt(parts[0]);
    let month = parseInt(parts[1]) - 1;
    let day = parseInt(parts[2]);
    return Date.UTC(year,month,day,0,0,0,0);
  }

  Date.getLongFromDateTimeInput = function(s){
    return new Date(s).getTime()
  }

  Date.prototype.addHours = function(h){
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }

}