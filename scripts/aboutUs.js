var aboutUsListName = 'About Us';

$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + aboutUsListName + "')/items'",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var aboutUsHtml = '';
    var purposeHtml = '<div id="purpose" class="articleContainer"><div class="articleTitle">Purpose</div>';
    var whatWeDoHtml = '<div id="whatWeDo" class="articleContainer"><div class="articleTitle">What We Do</div>';
    var activitiesHtml = '<div id="activities" class="articleContainer"><div class="articleTitle">Activities</div>';
    var visionHtml = '<div id="vision" class="articleContainer"><div class="articleTitle">Vision</div>';
    var missionHtml = '<div id="mission" class="articleContainer"><div class="articleTitle">Mission</div>';
    var goalHtml = '<div id="goal" class="articleContainer"><div class="articleTitle">Goal</div>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + aboutUsListName + "')/items?$orderby=orderContacts");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].aboutTypeSubprocess);
      if (data.d.results[i].aboutTypeSubprocess == "Purpose") {
      purposeHtml = purposeHtml + "<div class='articleContent'>" + data.d.results[i].aboutContent + "</div></div>";
      $("#purpose").addClass('articleContainerShow');
      aboutUsHtml = aboutUsHtml + purposeHtml;
    } else if (data.d.results[i].aboutTypeSubprocess == "What We Do") {
      whatWeDoHtml = whatWeDoHtml + "<div class='articleContent'>" + data.d.results[i].aboutContent + "</div></div>";
      $("#whatWeDo").addClass('articleContainerShow');
      aboutUsHtml = aboutUsHtml + whatWeDoHtml;
    } else if (data.d.results[i].aboutTypeSubprocess == "Activities") {
      activitiesHtml = activitiesHtml + "<div class='articleContent'>" + data.d.results[i].aboutContent + "</div></div>";
      $("#activities").addClass('articleContainerShow');
      aboutUsHtml = aboutUsHtml + activitiesHtml;
    } else if (data.d.results[i].aboutTypeProcess == "Vision") {
      visionHtml = visionHtml + "<div class='articleContent'>" + data.d.results[i].aboutContent + "</div></div>";
      $("#vision").addClass('articleContainerShow');
      aboutUsHtml = aboutUsHtml + visionHtml;
    } else if (data.d.results[i].aboutTypeProcess == "Mission") {
      missionHtml = missionHtml + "<div class='articleContent'>" + data.d.results[i].aboutContent + "</div></div>";
      $("#mission").addClass('articleContainerShow');
      aboutUsHtml = aboutUsHtml + missionHtml;
    } else if (data.d.results[i].aboutTypeProcess == "Goal") {
      goalHtml = goalHtml + "<div class='articleContent'>" + data.d.results[i].aboutContent + "</div>";
$     ("#goal").addClass('articleContainerShow');
      aboutUsHtml = aboutUsHtml + goalHtml;
    }
  });
    console.log(purposeHtml);
    console.log(aboutUsHtml);
    $('#article').html(aboutUsHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});
