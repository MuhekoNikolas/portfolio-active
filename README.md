## About

This repository contains the active-development version of v3.0 of my portfolio. By "active," I mean that this repo is dedicated to ongoing development and will not be put into production. This setup allows me to make changes without the risk of breaking the entire project. For a more structured and stable version of this project, please refer to the passive development version.

I developed this version shortly after starting the [SMA (Social Media App)](https://github.com/MuhekoNikolas/sma) project. In the SMA project, users could have a blog-like experience by writing and uploading text to the website. Inspired by this, I decided to incorporate a blog feature into my portfolio.

In this portfolio version, I implemented OAuth2 authentication to create a "blog for all" environment. This feature allows anyone with an account to start their own blog and upload posts for other users, instead of restricting the blogging capability to just myself. The site features a robust blog writing environment, courtesy of a modified version of TinyMCE editor and Iframely, along with numerous other features. However, this project is still under development, and many more features, especially related to the blog, are in progress.

## How to Run

1. **Install Node.js**:
   - This project has been tested to run properly on Node v22.4.1, but lower versions might also work.

2. **Install Dependencies**:
   - Run the following command to install all necessary dependencies:
     ```sh
     npm install
     ```
   - If you encounter any "Module not found" errors, use npm to install the missing modules.

3. **Configure Secret Keys**:
   - Obtain secret keys from services such as Google, Facebook, GitHub, and Twitter for OAuth2 login and account management.
   - Refer to the `.env.struct` file for more information regarding the required keys.

4. **Run the Application**:
   - Execute the following command to run the `index.js` file:
     ```sh
     node index.js
     ```
   - Visit the site at [http://localhost:8061](http://localhost:8061).