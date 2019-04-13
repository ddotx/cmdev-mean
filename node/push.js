var OneSignal = require('onesignal-node');

// first we need to create a client
var myClient = new OneSignal.Client({
    userAuthKey: 'ODA1NTk3MDItZTQzNS00Mjg5LWE5MWUtNWRlODFkMTE3OGUx',
    app: { appAuthKey: 'M2E4ZGU0MzMtOTliMS00MTkwLWI1ZGItN2JhZDcyYzQzODdm', appId: '676e2854-a8a1-4ad2-b789-497a24271766' }
});

// we need to create a notification to send
var firstNotification = new OneSignal.Notification({
    contents: {
        en: "CodeMobiles.com",
        th: "โค้ดโมบายส์ จำกัด"
    }
});

// set target users
firstNotification.setIncludedSegments(['All']);
firstNotification.setExcludedSegments(['Inactive Users']);

// set notification parameters
firstNotification.setParameter('data', { "abc": "123", "foo": "bar" });
//firstNotification.setParameter('send_after', 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)');

/*
var firstNotification = new OneSignal.Notification({    
    contents: {    
        en: "Test notification",    
        tr: "Test mesajı"    
    },  
    include_player_ids: ["1dd608f2-c6a1-11e3-851d-000c2940e62c", "2dd608f2-c6a1-11e3-851d-000c2940e62c"]  
});  
*/

// send this notification to All Users except Inactive ones
myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
    if (err) {
        console.log('Something went wrong...');
    } else {
        console.log(data, httpResponse.statusCode);
    }
});