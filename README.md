# passrider-app
An app to log a user into the United Passrider app

Express needs to be added to this so we can serve a page to a user
Also Socket.IO to allow easier async communication between the back and frontend
Finally, Angular, for the two-way binding, to make it easy to display results


The user will enter their user/pass (which will be saved and reused in local storage)
Then the user will be presented with a screen allowing them to choose their 'from' and 'to' locations, as well as their departure date.

Ideally, the user will be able to add flights to their 'watch' list.
We *could* just use localStorage for now to store these flights, but MongoDb would be best, so the app can check flights and update the database without the app being open on the user's device
