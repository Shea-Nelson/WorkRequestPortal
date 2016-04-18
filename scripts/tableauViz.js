var viz;

/*window.onload = function () {*/
  var vizDiv = document.getElementById('myViz');
  var vizUrl = 'http://dorreport.fdor.dor.state.fl.us/t/GTA/views/WRMS-OverviewbyProcess/OverviewbyProcess';
  var options = {
    width: '1204px',
    height: '836px',
  };

  viz = new tableau.Viz(vizDiv, vizUrl, options);
/*};*/

// Content below is to resolve warning for missing 'tableau' object
var tableau;
