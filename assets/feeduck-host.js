var config = {
	url: "https://script.google.com/macros/s/AKfycbzcw8Gr8Z5lLA1b9CZtYm-1__Ymr8AHxygGtlyZL2NR3nhtO5Q/exec"
}

function showPage(page_id)
{
	$(".page").hide();
	$("#"+page_id).show();
}

var gs = new function() {
  var ajax = function(action, done, fail) {
    return $.ajax({
      url: config.url,
      data: {a: action},
      dataType: "jsonp",
      jsonp: "c"
    })
      .done(function(jqxhr, textStatus, error) {
        done();
      })
      .fail(function(jqxhr, textStatus, error) {
        fail();
      });
  };

  this.checkAuth = function(done, fail) {
    return ajax('login', done, fail);
  };

  this.create = function(title, done, fail) {
    return ajax('create', title, done, fail);
  }
};

var Progress = function(dom) {
  var wrapper = $(dom);
  var bar = wrapper.children(".progress-bar");
  var _stopped = true;
  var _tick = 100;
  var _self = this;

  this.show = function() {
    wrapper.show();
  };

  this.val = function(value) {
    if ( value == undefined )
    {
      return parseInt(bar.attr("aria-valuenow"));
    }
    else
    {
      if ( value > 100 ) value = 100;
      if ( value < 0 ) value = 0;
      bar.attr("aria-valuenow", value);
      bar.width(value+"%");
    }
  };

  var _progress = function() {
    if ( _stopped )
      return;

    _self.val(_self.val() + 1);
    setTimeout(_progress, _tick);
  }

  this.start = function(sec) {
    _tick = sec * 10 // == sec * 1000 / 100;
    _stopped = false;
    _progress();
  }

  this.stop = function() {
    _stopped = true;
  }
};

/*
        var retrievePageOfFiles = function(request, result) {
          request.execute(function(resp) {
            if ( !resp )
            {
              showFiles(result);
              return;
            }
            result = result.concat(resp.items);
            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
              request = gapi.client.drive.files.list({
                'pageToken': nextPageToken
              });
              retrievePageOfFiles(request, result);
            } else {
              showFiles(result);
            }
          });
        }

//       var initialRequest = gapi.client.drive.files.list({'q': 'mimeType = "application/vnd.google-apps.form" and trashed = false and "root" in parents'});
       var initialRequest = gapi.client.drive.files.list({'q': 'mimeType = "application/vnd.google-apps.form" and trashed = false and "root" in parents', 'fields':'items(alternateLink,iconLink,id,title,properties)'});
        // var initialRequest = gapi.client.drive.files.list({'maxResults': 100, 'q': 'mimeType = "application/vnd.google-apps.folder" and trashed = false and "root" in parents'});
        retrievePageOfFiles(initialRequest, []);
      }

      function getProperty(fileId, key, visibility, callback) {
        var request = gapi.client.drive.properties.get({
          'fileId': fileId,
          'propertyKey': key,
          'visibility': visibility
        });
        request.execute(function(resp) {
          callback(resp);
        });
      }

      function insertProperty(fileId, key, value, visibility) {
        var body = {
          'key': key,
          'value': value,
          'visibility': visibility
        }
        var request = gapi.client.drive.properties.insert({
          'fileId': fileId,
          'resource': body
        });
        request.execute(function(resp) {});
      }

      var largestChangeId;

      function startWatch()
      {
        // WTF!!!
        var request = gapi.client.drive.changes.list({includeDeleted: true, includeSubscribed: true, maxResults: 1});
        request.execute(function(resp) {
          largestChangeId = resp.largestChangeId + 1;
          setTimeout(watching, 1000);
        });
      }

      function watching()
      {
        var request = gapi.client.drive.changes.list({maxResults: 1, startChangeId: largestChangeId});
        request.execute(function(resp) {
          if ( resp.largestChangeId >= largestChangeId )
          {
            // loadFiles();
            setProgress(50);
            largestChangeId = resp.largestChangeId + 1;
            return;
          }
          setTimeout(watching, 1000);
        });
      }

      function loadFiles()
      {
        var showFiles = function(files) {
          var ul = $("#files");
          ul.html("");

          for ( var i = 0 ; i < files.length; i++ )
          {
            var f = files[i];
            if ( f == undefined )
              continue;

            var li = $("<li></li>");
            var img = $("<img/>");
            var a = $("<a></a>");
            img.attr("src", f.iconLink).attr("style", "margin-right:8px;").appendTo(li);
            a.attr("href", f.alternateLink).attr("target", "_blank").text(f.title).appendTo(li);
            li.attr("id", "id_" + f.id).addClass("list-group-item").appendTo(ul);

            getProperty(f.id, 'feeduck', 'PUBLIC', function(resp) {
              if ( resp && !resp.error && resp.value ) {
                var data = JSON.parse(resp.value);
                if ( data.file_id ) {
                  var li = $("li#id_"+data.file_id);

                  var span = $("<span></span>");
                  var a = $("<a></a>");
//                  a.attr("href", "#").text(resp.value).appendTo(span);
                  a.attr("href", "#").text("view code").appendTo(span);
                  span.addClass("pull-right").appendTo(li);
                }
              }
            });
          }
        }


      function handleClientLoad()
      {
        gapi.client.load('drive', 'v2', function() {window.setTimeout(checkAuth, 1)});
      }

      var config = {
        'client_id': '643481099244.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/drive',
        'immediate': true
      };

      function checkAuthGoogle()
      {
        config.immediate = true;
        gapi.auth.authorize(config, resultAuth);
      }

      function resultAuth(authResult)
      {
        if ( authResult && !authResult.error )
        {
          showPage('page_main');
          loadFiles();
        }
        else
        {
          showPage("page_login");
          $("#btnLogin").click(function() {
            config.immediate = false
            gapi.auth.authorize(config, resultAuth);
          });
        }
      }

*/
