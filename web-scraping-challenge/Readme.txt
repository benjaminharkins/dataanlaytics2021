#Web-Scraping-Challenge


*************************************************************************
*Prior to running code, check if selenium is installed. If, not install.*
*************************************************************************


############################
#jupyter Notebook File code#
############################

#Importing dependencies
import pandas as pd
import numpy as np
from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

### NASA Mars News


# browser = init_browser()
executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)



url = "https://mars.nasa.gov/news/"
browser.visit(url)

html = browser.html
soup = BeautifulSoup(html, "html.parser")


news_pull = soup.find("div", class_="list_text")


print(news_pull)

# Scrape the Latest News Title
news_title = news_pull.find("div", class_="content_title").get_text()

print(news_title)

# Scrape the Latest Paragraph Text
news_briefing = news_pull.find("div", class_="article_teaser_body").get_text()

print(news_briefing)

# Quit the browser
browser.quit()

### JPL Mars Space Images - Featured Image

# Visit the url for JPL Featured Space Image

# browser = init_browser()
executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)

url__beginning = "https://data-class-jpl-space.s3.amazonaws.com/JPL_Space/"
url_end = "index.html"
url = f"{url__beginning}{url_end}"
browser.visit(url)

html = browser.html
soup = BeautifulSoup(html, "html.parser")

#Make sure to save a complete url string for this image.

img_url = soup.find(class_="headerimage fade-in").get("src")

print(img_url)

img_url = f"{url__beginning}{img_url}"
print(img_url)

# Quit the browser
browser.quit()

### Mars Facts

# browser = init_browser()
executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)


url = 'https://space-facts.com/mars/'

mars_table = pd.read_html(url)
mars_table

#Converting table data into dataframe table
mars_data_df=mars_table[1]
mars_data_df.columns=["ID", "description","value"]
mars_data_df.set_index("ID",inplace=True)
mars_data_df

#Converting dataframe data into html data
mars_html_table=mars_data_df.to_html()
print(mars_html_table)

# Quit the browser
browser.quit()

# browser = init_browser()
executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)



url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
browser.visit(url)

html = browser.html
soup = BeautifulSoup(html, "html.parser")

#Finding images
images_hemispheres=soup.find("div",class_='collapsible results')
print(images_hemispheres)

#Finding images again but with the prettify function for readability
images_hemi=soup.find("div",class_='collapsible results')
print(images_hemi.prettify())

#Locating all a tags in prior find
hemispheres=images_hemi.find_all('a')
print(hemispheres)

#Creating for loop to run through results of prior code and append to an empty list
hemisphere_image_urls=[]
for hemisphere in hemispheres:
    if hemisphere.h3:
        title=hemisphere.h3.text
        link=hemisphere["href"]
        main_url="https://astrogeology.usgs.gov/"
        forward_url=main_url+link
        browser.visit(forward_url)
        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')
        hemisphere2=soup.find("div",class_= "downloads")
        image=hemisphere2.ul.a["href"]
        hemisphere_dict={}
        hemisphere_dict["title"]=title
        hemisphere_dict["img_url"]=image
        hemisphere_image_urls.append(hemisphere_dict)
        browser.back()

#Printing list of images along with their urls
hemisphere_image_urls

# Quit the browser
browser.quit()

##################
#app.py File code#
##################

from flask import Flask, render_template, redirect,jsonify
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/mars")

@app.route("/")
def home():

    mars = mongo.db.collection.find_one()

    return render_template("index.html", mars=mars)


# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    mars_data = scrape_mars.scrape_info()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, mars_data, upsert=True)

    # Redirect back to home page
    return redirect("/",code=302)


if __name__ == "__main__":
    app.run(debug=True)

##########################
#scrape_mars.py File code#
##########################

from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
import pandas as pd
import pymongo
import requests

def init_browser():
    executable_path = {"executable_path": "chromedriver"}
    return Browser("chrome", **executable_path, headless=False)

def scrape_info():
    browser = init_browser()

    time.sleep(1)

    ### NASA Mars News

    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    url = "https://mars.nasa.gov/news/"
    browser.visit(url)

    html = browser.html
    soup = BeautifulSoup(html, "html.parser")

    news_title = news_pull.find("div", class_="content_title").get_text()

    news_briefing = news_pull.find("div", class_="article_teaser_body").get_text()


    ### JPL Mars Space Images - Featured Image

    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    url__beginning = "https://data-class-jpl-space.s3.amazonaws.com/JPL_Space/"
    url_end = "index.html"
    url = f"{url__beginning}{url_end}"
    browser.visit(url)

    html = browser.html
    soup = BeautifulSoup(html, "html.parser")

    img_url = soup.find(class_="headerimage fade-in").get("src")

    print(img_url)

    img_url = f"{url__beginning}{img_url}"
    print(img_url)
   
  
    ### Mars Facts
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)


    url = 'https://space-facts.com/mars/'

    mars_table = pd.read_html(url)
    mars_table
    
    #Converting table data into dataframe table
    mars_data_df=mars_table[1]
    mars_data_df.columns=["ID", "description","value"]
    mars_data_df.set_index("ID",inplace=True)
    mars_data_df

    #Converting dataframe data into html data
    mars_html_table=mars_data_df.to_html()
    print(mars_html_table)

   
    ### Mars Hemispheres
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)



    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url)

    html = browser.html
    soup = BeautifulSoup(html, "html.parser")

    #Finding images
    images_hemispheres=soup.find("div",class_='collapsible results')
    print(images_hemispheres)

    #Finding images again but with the prettify function for readability
    images_hemi=soup.find("div",class_='collapsible results')
    print(images_hemi.prettify())

    #Locating all a tags in prior find
    hemispheres=images_hemi.find_all('a')
    print(hemispheres)

    #Creating for loop to run through results of prior code and append to an empty list
    hemisphere_image_urls=[]
    for hemisphere in hemispheres:
        if hemisphere.h3:
            title=hemisphere.h3.text
            link=hemisphere["href"]
            main_url="https://astrogeology.usgs.gov/"
            forward_url=main_url+link
            browser.visit(forward_url)
            html = browser.html
            soup = BeautifulSoup(html, 'html.parser')
            hemisphere2=soup.find("div",class_= "downloads")
            image=hemisphere2.ul.a["href"]
            hemisphere_dict={}
            hemisphere_dict["title"]=title
            hemisphere_dict["img_url"]=image
            hemisphere_image_urls.append(hemisphere_dict)
            browser.back()

    #Printing list of images along with their urls
    hemisphere_image_urls


    mars_data_dict={
        "mars_news_title": news_title,
        "mars_news_paragraph": news_briefing,
        "featured_mars_image": image_url,
        "mars_facts": mars_html_table,
        "mars_hemispheres": hemisphere_image_urls
    }

    # Quit the browser
    browser.quit()
   
    return mars_data_dict 

#####
#EOF#
#####