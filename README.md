# Diabetes Risk Predictor

This is a project that I started on Friday 3rd of June for the Global initiative Field trip

> In brief, Global Innovation Field Trip (GIFT) is a 24-hour, live, online event where students in grades K to 12 can give 10-minute presentations about anything they have done involving innovation, invention, and creativity. GIFTs are held 4 times a year and in 2 years have featured nearly 1,000 innovators from 51 countries giving almost 650 presentations on a wide variety of creative, new, and innovative topics and projects. The next GIFT will be 16/17 July (Saturday/Sunday) and will be the greatest one yet!

For this occasion, I decided I wanted to show one of my machine learning projects but
since I am still very new to ml and my last project(the water potability finder) wasn't good
enough for me I decided to create a new project with a proper UI and a very detailed ml explanation. The Project I decided on is the project you are looking at and that is a Diabetes Risk Predictor Model. From the start date (3rd June) to the end date (10th July). And during this time
there were many changes to the project's design, flow, and implementation which you can see with the commits.

The final project here consists of 3 parts

1. the model & their explanation

   - this is all explained in the main.ipynb file. In that file, you will get a clear understanding of what my taught process was in creating the model

2. the API

   - this is built with fast API. This is how I am hosting the model.
   - this is where I've created all the methods for getting predictions from the model, checking for pre-diabetes, and checking for type 2 diabetes.

3. the frontend

   - made with next.js and tailwind CSS.
   - utilizes the API as the backend
   - includes a lot of animations

Thank you and I hope you liked the project

More over to run the entire app local

1. Create a new python virtual environment `py -m venv venv` <br> (You can use conda or something else but this is what I did)
2. Activate the env and go to the root directory and run <br> ` pip install -r requirements.txt`
3. In the same terminal go to the api directory and run `uvicorn main:app --reload`
4. Create a new terminal instance, go to frontend, do `npm i` after which the next.js app will be created 4. in the same terminal you ran the npm install command run `npm run dev` to actually start the server
5. If the app is running annd you now want to test the main.ipynb file go for it with
   the new env that you created.

**CATALOG**
It can all be seen in the log.txt file
