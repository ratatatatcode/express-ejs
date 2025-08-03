# What is Firebase?
Can we make fire with it?<br>
> Of course not, haha
<br>

Firebase is a backend platform by Google that provides services like authentication, cloud databases (Firestore), file storage, and hosting.

**Why am I going to use this Client SDK?**<br>
Honestly, it's just really easy to set up. I'm also confused about the difference between the Admin and Client SDK. I'll leave it up to you to decide which one to use for our project. Anyway, I'm transitioning to SQL now, haha.<br><br> 

## Setup Firebase Client SDK for ExpressJS and EJS
1. Open [firebase console](https://console.firebase.google.com/u/0/).
2. I assume you already have an account. Now, click "Create a Firebase Project." It's up to you whether you want to enable Google Analytics or not.
3. You will be redirected to the Project Overview page. Under "Get started by adding Firebase to your app," click the **"</>"** (Web) button.
4. Register your app. You can name it whatever you want. Under "Use npm," you will see configuration details similar to what I included in **01_Express.md (.env)**. Copy the values inside the quotation marks and paste them into your .env file.
5. Click "Continue to console"
6. In the sidebar, under **Build, click **"Authentication"** then "Get started." Below "Native providers," click "Email/Password," enable it, and then click "Save."
7. Also under **Build**, click **"Firestore Database"** then "Create Database." Select a location; I usually pick "asia-southeast1 (Singapore)" then click "Next." Choose "Start in test mode" and finally, click "Create."
<br>

> **You are now a certified member of the Fire Nation!**

