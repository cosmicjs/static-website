# Static Site

[View Demo](http://static-website.cosmicapp.co)

###An API-First Static Website
Easily create a static website using the [Cosmic JS CMS API](https://cosmicjs.com). 

###How it Works

1. The build process fetches content from the Cosmic JS API, then builds the static HTML files.
2. [Metalsmith](http://www.metalsmith.io/) is also thrown in, in case you would like to use markdown to edit your content for certain pages.
3. It runs a light Node.js server to perform rebuilds at the route `/rebuild-site`

You get the best of all worlds:

1. An easy way to edit content from the Cosmic JS Dashboard.
2. A flexible API to store and fetch content that can be delivered to any device or application regardless of programming language.
3. A light-weight, static website that loads fast and allows you to also contribute Markdown pages.

###Getting Started
####Install
Make sure you have yarn installed.  Why?  Because it's new, we love new, and it's faster than `npm install`.
```
git clone https://github.com/tonyspiro/static-website
cd static-website
yarn
```
####Start Server
```
yarn start
```
Your static site will now be serving static files from `/build` at http://localhost:3000.

###Easy Rebuilding
Rebuild the website at any time by accessing `http://localhost:3000/rebuild-site`

###Add / Edit Content
You can easily manage the content in your static site on Cosmic JS.  Follow these steps:

1. [Log in to Cosmic JS](https://cosmicjs.com).
2. Create a bucket.
3. Go to Your Bucket > Apps.
4. Install the Static Site App.
5. Deploy your Static Site to the Cosmic App Server at Your Bucket > Web Hosting.

Now you can edit your content and rebuild your static site on-the-fly by accessing `http://your-bucket-slug.cosmicapp.co/rebuild-site`.  

###Webhooks
If you would like to rebuild your site after every content edit, this is made easy with Webhooks.

[Click here for a tutorial on how to set up Webhooks](https://cosmicjs.com/blog/adding-webhooks-in-4-steps).

To set up your Webhooks:

1. Go to Your Bucket > Webhooks and add the Webhooks product to your bucket.
2. Add a Webhook that is triggered when an object is published.
3. Point the Webhook to `http://your-bucket-slug.cosmicapp.co/rebuild-site`.
4. Save.