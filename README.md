# Tabloid - Fullstack

### Getting Started

1. Pull down this repo

2. Run the two scripts that are in the SQL folder. These will create the Tabloid database and add some test data. 

3. Create a Firebase project.

   - Go to [Firebase](https://console.firebase.google.com/u/0/) and add a new project. You can name it whatever you want (Tabloid is a good name)
   - Go to the Authentication tab, click "Set up sign in method", and enable the Username and Password option.
   - Add at least two new users in firebase. Use email addresses that you find in the UserProfile table of your SQL Server database
   - Once firebase creates a UID for these users, copy the UID from firebase and update the `FirebaseUserId` column for the same users in your SQL Server database.
   - Go to the Storage Tab, and click the "get started" button.
   - click 'Next' and then 'Done'
   - Add folders for "PostHeaders" and "ProfilePictures" in your storagebucket by clicking the "folder+" icon
   - Click the Gear icon in the sidebar to go to Project Settings. You'll need the information on this page for the next few steps

4. `cd` into Tabloid-Fullstack/Tabloid-Fullstack and enter `touch appsettings.Local.json`
5. Paste the following into the appsettings.Local.json file:
`
{
  "FirebaseProjectId": "YOUR_FIREBASE_PROJECT_ID"
}
`
6. Replace the placeholder with your firebase project id 

7. Open your `client` directory in VsCode. Open the `.env.local.example` file.  Replace `__YOUR_API_KEY_HERE__` with your own firebase Web API Key, and add `REACT_APP_FIREBASE_BUCKET=____YOUR_FIREBASE_PROJECT_NAME_HERE___.appspot.com`, replacing `_YOUR_FIREBASE_PROJECT_NAME_HERE_` with the name of your firebase project

8. Rename the `.env.local.example` file to remove the `.example` extension. This file should now just be called `.env.local`

9. Install your dependencies by running `npm install` from the same directory as your `package.json` file
