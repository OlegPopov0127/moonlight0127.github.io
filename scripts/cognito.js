const config={
    cognito:{
        identityPoolId:"ap-southeast-2_2Dm0JvSbL",
        cognitoDomain:"hotel.auth.ap-southeast-2.amazoncognito.com",
        appId:"104q5t9t9moj02ga6ufi39j6ct"
    }
}

var cognitoApp={
    auth:{},
    Init: function()
    {

        var authData = {
            ClientId : config.cognito.appId,
            AppWebDomain : config.cognito.cognitoDomain,
            TokenScopesArray : ['email', 'openid','profile'],
            RedirectUriSignIn : 'http://localhost:8080/hotel/',
            RedirectUriSignOut : 'http://localhost:8080/hotel/',
            UserPoolId : config.cognito.identityPoolId, 
            AdvancedSecurityDataCollectionFlag : false,
                Storage: null
        };

        cognitoApp.auth = new AmazonCognitoIdentity.CognitoAuth(authData);
        cognitoApp.auth.userhandler = {
            onSuccess: function(result) {
              
            },
            onFailure: function(err) {
            }
        };
    }
}