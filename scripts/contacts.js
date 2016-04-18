$(document).ready(function () {
  var contactsName = 'Contacts';
  var contactsHtml = '';
  var contactsArray = [];
  var counter = 0;

  $.ajax({
    url: currentUrl + "/_api/web/lists/getbytitle('" + contactsName + "')/items'",
    method: 'GET',
    headers: { "Accept": "application/json; odata=verbose" },
    success: function (data) {
      console.log(currentUrl + "/_api/web/lists/getbytitle('" + contactsName + "')/items");
      console.log(data.d.results);
      if (data.d.results.length > 0) {
        $('#contactsList').addClass('contactsListShow');
      }

      $.each(data.d.results, function (i, item) {
        counter = data.d.results.length;
        var employeeRole = data.d.results[i].role;
        var responsibilities = data.d.results[i].responsibilities;
        var listPosition = data.d.results[i].orderContacts;
        function GetCurrentUser() {
          console.log('responsibilities = ' + responsibilities);

          //PersonId for dev and personId for prod
          if (currentUrl.indexOf('DORSPDEV') > 0) {
          var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + data.d.results[i].PersonId + ")";
          }
          else {
            var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + data.d.results[i].personId + ")";
          }
          var requestHeaders = { "accept" : "application/json;odata=verbose" };

          $.ajax({
            url : requestUri,
            contentType : "application/json;odata=verbose",
            headers : requestHeaders,
            success : onSuccess,
            error : onError
          });
        }

        function onSuccess(data, request) {
          loginName = data.d.LoginName.split('|')[1];
          accountName = data.d.LoginName;
          console.log('Yo' + loginName);
          console.log('Yo Yo' + accountName);
          ContactHtml(loginName, employeeRole, responsibilities, listPosition);
        }

        function onError(error) {
          console.log(error);
        }

        GetCurrentUser();

        function ContactHtml(loginName, employeeRole, responsibilities, listPosition) {
          var requestHeaders = {
          "Accept": "application/json;odata=verbose",
          "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
          };

          jQuery.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(@v)?@v='" + encodeURIComponent(loginName) + "'",
            type: 'GET',
            //data: JSON.stringify(theData),
            contentType: "application/json;odata=verbose",
            headers: requestHeaders,
            success: function (data) {

              var preferredName = '';
              var workPhone = '';
              var manager = '';
              var office = '';
              var pictureURL = '';
              var positionTitle = '';
              var workEmail = '';

              var obj = data;
              var rootObj = obj["d"];
              var userProfProps = rootObj["UserProfileProperties"];
              var results = userProfProps["results"];

              // results is array with 101 properties

              //last name has index 6
              var lNameObj = results[6];
              var lNameKey = lNameObj["Key"];
              var lNameValue = lNameObj["Value"];

              //first name has index 4
              var fNameObj = results[4];
              var fNameKey = fNameObj["Key"];
              var fNameValue = fNameObj["Value"];


              console.log(lNameKey);
              console.log(lNameValue);

              console.log(fNameKey);
              console.log(fNameValue);

              console.log(data.d);

              $.each(results, function (i, item) {
                if (results[i].Key == 'PreferredName') {
                  console.log('yo pname is ' + results[i].Value);
                  preferredName = results[i].Value;
                }

                if (results[i].Key == 'WorkPhone') {
                  console.log('yo workphone is ' + results[i].Value);
                  workPhone = results[i].Value;
                }

                if (results[i].Key == 'Manager') {
                  console.log('yo manager is ' + results[i].Value);
                  manager = results[i].Value;
                }

                if (results[i].Key == 'Office') {
                  console.log('yo office is ' + results[i].Value);
                  office = results[i].Value;
                }

                if (results[i].Key == 'PictureURL') {
                  console.log('yo pictureURL is ' + results[i].Value);
                  pictureURL = results[i].Value;
                }

                if (results[i].Key == 'Title') {
                  console.log('yo title is ' + results[i].Value);
                  positionTitle = results[i].Value;
                }

                if (results[i].Key == 'WorkEmail') {
                  console.log('yo WorkEmail is ' + results[i].Value);
                  workEmail = results[i].Value;
                }
              });

              var contactObj = { role: employeeRole, email: workEmail, phone: workPhone,
                                name: preferredName, location: office, jobTitle: positionTitle,
                                responsibility: responsibilities, listOrder: listPosition, };
              console.log("here contactObj");
              console.log(contactObj);
              contactsArray.push(contactObj);
              console.log("contactsArray.length is " + contactsArray.length);
              console.log('counter is ' + counter);
              if (contactsArray.length == counter) {
                contactsArray.sort(compare);
                console.log(contactsArray[0].name);
                console.log(contactsArray[3]);
                console.log(contactsArray[1]);
                $.each(contactsArray, function (i, item) {
                  contactsHtml = contactsHtml + '<li class="contact">' +
                  '<div class="preferredName contactAttr"><a href="mailto:' + item.email + '">' +
                  item.name + '<div class="emailImg contactAttr"><img alt="send email" src="/sites/gta/SiteAssets/code/pageTemplates/cenOpPageTemplate/assets/sendEmail.png"></div></a></div>' +
                  '<div class="phone contactAttr">Phone: ' + item.phone + '</div>' +
                  '<div class="office contactAttr">Location: ' + item.location + '</div>' +
                  '<div class="employeeRole contactAttr">Role: ' + item.role + '</div>' +
                  '<div class="title contactAttr">Postion Title: ' + item.jobTitle + '</div>' +
                  '<div class="responsibilities contactAttr">Responsibilities:   ' + item.responsibility + '</div>' +

                  /*'<div class="manager contactAttr">Manager: ' + manager + '</div>' + */
                  '</li>';
                });
              }


              console.log(contactsHtml);
              $('.contactsContainer').html(contactsHtml);

            },

            error: function (jqxr, errorCode, errorThrown) {
            console.log("Error" + jqxr.responseText);
            }

          });
        };
      });
    }
  });
  function compare(a,b) {
  if (a.listOrder < b.listOrder)
    return -1;
  else if (a.listOrder > b.listOrder)
    return 1;
  else
    return 0;
}

});
