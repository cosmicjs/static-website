# API-Powered Static Website
![HTML](https://cosmicjs.com/uploads/01c0c800-9a3e-11e6-8103-8117827beac1-html.jpg)
### [View Demo](http://static-website.cosmicapp.co)
### Why?
You get the best of all worlds:

1. The flexibility to manage content from the [Cosmic JS CMS API](https://cosmicjs.com).
2. The speed of static HTML.
3. The option to use Markdown files.

### How it Works

1. The build process fetches content from the Cosmic JS API, then builds the static HTML files.
2. [Metalsmith](http://www.metalsmith.io/) transforms your Markdown into HTML pages.
3. A light Node.js server is used to serve static files and perform rebuilds at the route `/rebuild-site`.

### Article
For further reading, check out the article [How to Build an API-Powered, Static Website: The Best of Both Worlds](https://cosmicjs.com/blog/how-to-build-an-api-powered-static-website-the-best-of-both-worlds).
### Getting Started
#### Install
Make sure you have yarn installed.  Why?  Because it's new, we love new, and it's provides [quite a few improvements](https://code.facebook.com/posts/1840075619545360) over the old  `npm install`.
```
git clone https://github.com/cosmicjs/static-website
cd static-website
yarn
```
#### Start Server
```
yarn start
```
Your static site will now be serving static files from `/build` at [http://localhost:3000](http://localhost:3000).

### Easy Rebuilding
Rebuild the website at any time by accessing [http://localhost:3000/rebuild-site](http://localhost:3000/rebuild-site).

### Add / Edit Content
You can easily manage the content in your static site on Cosmic JS.  Follow these steps:

1. [Log in to Cosmic JS](https://cosmicjs.com).
2. Create a bucket.
3. Go to Your Bucket > Apps.
4. Install the [Static Website App](https://cosmicjs.com/apps/static-website).
5. Deploy your Static Site to the Cosmic App Server at Your Bucket > Web Hosting.

Now you can edit your content and rebuild your static site on-the-fly by accessing `http://your-bucket-slug.cosmicapp.co/rebuild-site`.  

### Webhooks
If you would like to rebuild your site after every content edit, this is made easy with Webhooks.

[Click here for a tutorial on how to set up Webhooks](https://cosmicjs.com/blog/adding-webhooks-in-4-steps).

To set up your Webhooks:

1. Go to Your Bucket > Webhooks and add the Webhooks product to your bucket.
2. Add a Webhook that is triggered when an object is published.
3. Point the Webhook to `http://your-bucket-slug.cosmicapp.co/rebuild-site`.
4. Save.
