var siteNavListName = 'Site Navigation Links';
var customLinksListName = 'Helpful Links';
var announcementsListName = 'Announcements';
var dashboardLinksListName = 'dashboardLinks';

var GET = {};
var query = window.location.search.substring(1).split('&');
for (var i = 0, max = query.length; i < max; i++)
{
  if (query[i] === '') // check for trailing & with no param
        continue;

  var param = query[i].split('=');
  GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || '');
}

console.log(GET.workbook);
console.log(GET.view);

var currentUrl = window.location.href.toUpperCase();
console.log(currentUrl);
var pageName = currentUrl.substring(currentUrl.lastIndexOf('/SITEPAGES/') + 7, currentUrl.length);
console.log('page name is ' + pageName);
currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/SITEPAGES'));
console.log(currentUrl);
var processId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1, currentUrl.length);
var parentProcessId = currentUrl.substring(currentUrl.lastIndexOf('/PROCESS/') + 9, currentUrl.lastIndexOf('/'));
var processName = '';
var subprocessName = '';
var dateToday = new Date();
console.log(processId);
console.log(parentProcessId);
/************ Get SiteNav Links ***********/
$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + siteNavListName + "')/items?$orderby=orderLinks",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var siteNavLinksHtml = '<ul>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + siteNavListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].URL.Description);
    });
    $.each(data.d.results, function (i, item) {
      siteNavLinksHtml = siteNavLinksHtml + "<li><a href='" + data.d.results[i].URL.Url + "'>" + data.d.results[i].URL.Description + "</a></li>";
    });
    siteNavLinksHtml = siteNavLinksHtml + "</ul>";
    console.log(siteNavLinksHtml);
    $("#siteNavLinks").html(siteNavLinksHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

/*********** Get HelpfulLink Links ***********/
$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + customLinksListName + "')/items?$orderby=orderLinks",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var customLinksHtml = '<ul>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + customLinksListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].URL.Description);
    });
    $.each(data.d.results, function (i, item) {
      customLinksHtml = customLinksHtml + "<li><a  title='All documentation and instructions for submitting requests can be found using the links in this Helpful Links section. Please be sure to attach all necessary documentation with your request to ensure it is processed as quickly as possible.' href='" + data.d.results[i].URL.Url + "'>" + data.d.results[i].URL.Description + "</a></li>";
    });
    customLinksHtml = customLinksHtml + "</ul>";
    console.log(customLinksHtml);
    $("#helpNavLinks").html(customLinksHtml);
    $(function () {
      $("nav a[title]").tooltips();
    });
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

/*********** Get Current Announcements ***********/
$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + announcementsListName + "')/items?$filter=Expires ge datetime'" + dateToday.toISOString() + "'",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var announcementsHtml = '<ul>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + announcementsListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].Title);
    });
    $.each(data.d.results, function (i, item) {
      announcementsHtml = announcementsHtml + "<li> <img class='imgAnnouncements' alt='megaphone' src='/sites/gta/SiteAssets/megaPhone.svg'/>" + data.d.results[i].Title + "</li>";
  });
    announcementsHtml = announcementsHtml + "</ul>";
    console.log(announcementsHtml);
    $("#announcements").html(announcementsHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

/************ Get Dashboard Links ************/
$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + dashboardLinksListName + "')/items?$orderby=orderLinks",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var dashboardLinksHtml = '<ul>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + dashboardLinksListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].Title);
    });

    $.each(data.d.results, function (i, item) {
      dashboardLinksHtml = dashboardLinksHtml + "<li><a href=https://dorsp13.fdor.dor.state.fl.us/sites/gta/tech/mgmt/workrequest/SitePages/Work%20Request%20Dashboard.aspx?workbook=" + data.d.results[i].Workbook + "&view=" + data.d.results[i].view+ ">" + data.d.results[i].Title + "</a></li>";
    });

    dashboardLinksHtml = dashboardLinksHtml + "</ul>";
    console.log(dashboardLinksHtml);
    $("#dashboardLinks").html(dashboardLinksHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

/************ configure tableau html *************/
var tableauWorkbook = 'WRMS-OverviewbyProcess_0';
var tableauView = 'OverviewbyProcess';
var tableauHtml;
if (GET.workbook != null) {
  tableauWorkbook = (GET.workbook);
  tableauView = (GET.view);
}

tableauWorkbook = tableauWorkbook + '&#47;';
tableauHtml =
"<div class='tableauPlaceholder' style='width: 1204px; height: 836px;'>" +
"<object class='tableauViz' width='1204' height='836' style='display:none;'>" +
    "<param name='host_url' value='http%3A%2F%2Fdorreport.fdor.dor.state.fl.us%2F' />" +
    "<param name='site_root' value='&#47;t&#47;GTA' />" +
    "<param name='name' value='" + tableauWorkbook + tableauView + "'/>" +
    "<param name='tabs' value='no' />" +
    "<param name='toolbar' value='yes' /> " +
    "<param name='showVizHome' value='n' /> " +
  "</object>" +
"</div>";
$("#tableauChart").html(tableauHtml);
console.log(tableauHtml);

/************ Add Global Bread Crumbs ************/
if (parentProcessId.length > 1  && pageName != 'INDEX.ASPX') {
  console.log('This is a subprocess');
  addGlobalNavigation('subprocess');
} else if (processId != 'gta' && pageName != 'INDEX.ASPX') {
  addGlobalNavigation('process');
}

function addGlobalNavigation(processType) {
  var url = '/sites/gta/SiteAssets/code/pageTemplates/CenOpPageTemplate/data/acronym.jsn';
  var callback = function (response) {
    console.log(response);
    if (processType == 'process') {
      $.each(response, function (i, item) {
        if (item.acronym == processId.toUpperCase()) {
          processName = item.title;
          $('#DeltaPlaceHolderPageTitleInTitleArea').after(': <a href="' + currentUrl + '">' + processName + '</a>');
          /*document.styleSheets[0].addRule('#pageTitle::before', 'content: "' + processName + '";');*/
          console.log(processName + ' ' + currentUrl);
        }
      });
    }
    if (processType == 'subprocess') {
      $.each(response, function (i, item) {
        if (item.acronym == processId.toUpperCase()) {
          subprocessName = item.title;
          processName = item.parent;
          $('#DeltaPlaceHolderPageTitleInTitleArea').after('<a href="' +
            currentUrl + '">' +
            subprocessName + '</a>');
          $('#DeltaPlaceHolderPageTitleInTitleArea').after(': <a href="' +
           currentUrl.substring(0, currentUrl.lastIndexOf('/')) + '">' +
           processName + ' - </a>');
          /*document.styleSheets[0].addRule('#pageTitle::before', 'content: "' + processName + '";');*/
          console.log(subprocessName + ' ' + processName + ' ' + currentUrl);
        }
      });
    }
  };

  $.getJSON(url, callback);
}

/************ Move Search to suiteBarLeft ************/
/*$('#SearchBox').detach().appendTo('#s4-bodyContainer');*/



window.onload = function () {
  /*var vizDiv = document.getElementById('myViz');
  var vizUrl = 'http://dorreport.fdor.dor.state.fl.us/t/GTA/views/WRMS-OverviewbyProcess/OverviewbyProcess';
  var options = {
    width: '1204px',
    height: '836px',
  };

  var viz = new tableau.Viz(vizDiv, vizUrl, options);

  // Content below is to resolve warning for missing 'tableau' object
  var tableau;*/

  setTimeout(function () {
    document.body.style.opacity = '100';}, 500);
};
