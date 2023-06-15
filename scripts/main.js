const currentUserToken={
        currentUserId:"",
        idToken:"",
        role:""
}
function pageLoad()
{
    cognitoApp.auth.parseCognitoWebResponse(window.location.href);
            var currentUser =cognitoApp.auth.getCurrentUser();

            if (currentUser) {

                cognitoApp.auth.getSession();

                currentSession = cognitoApp.auth.signInUserSession;

                currentUserToken.currentUserId = currentUser;
                currentUserToken.idToken = currentSession.idToken.jwtToken;
                console.info(currentUserToken);

                var tokenDetails = parseJwt(currentSession.idToken.jwtToken)
                if (tokenDetails['cognito:groups'])
                {
                    var groups = tokenDetails['cognito:groups'][0];
                    currentUserToken.role = groups;
                }
                
            }

            $("#btnSignIn").on('click', function(btn){
                cognitoApp.auth.getSession();
            });

            $("#btnSignOut").on('click', function(btn){
                currentUserToken.role ="";
                currentUserToken.idToken="";
                currentUserToken.currentUserId="";
                cognitoApp.auth.signOut();
            });

            $("#btnSignOut").hide();
            $("#btnSignIn").hide();

            if (currentUserToken.currentUserId==="")
            {
                $("#btnSignIn").show();
            }
            else
            {
                $("#btnSignOut").show();
            }

}



        function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }

function setAuthHeader()
{

    var forms= $('form');
    forms.submit(function(event) {

        // Stop the form from submitting normally
        event.preventDefault();
    
        // Get form data
        var formData = new FormData($(this)[0]);
        console.log(formData);        
        // Set up the AJAX request
        $.ajax({

          url: $(this).attr('action'),
          type: 'POST',
          beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer '+ currentUserToken.idToken);
            request.setRequestHeader('Content-type', 'multipart/form-data');
          },
          data: formData,
          contentType: true,
          processData: false,
          success: function(response) {
         
            window.location.href='/hotel/admin.html';
          }
        });
    
      });
}        