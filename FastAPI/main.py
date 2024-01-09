from fastapi import FastAPI, HTTPException, Query, Request
import requests
from fastapi.middleware.cors import CORSMiddleware
import re
from downloader import downloader
from pydantic import BaseModel
from chatbot import csv_upload,chatbot_query

# import os
# os.environ["OPENAI_API_KEY"] = "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"

app = FastAPI()
Chain=None

class Item(BaseModel):
    link: str

class FilePath(BaseModel):
    filePath: str

origins=['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/search")
async def search(tags: str = None, query: str = None):
    # Implement your search logic here, considering both tags and query
    # You can handle each parameter as needed
    tags_lis=[]
    query_lis=[]

    if tags:
        tags_lis=re.split(r'\W+', tags)
        tags_lis=list(filter(None, tags_lis))

    if query:
        query_lis=re.split(r'\W+', query)
        query_lis=list(filter(None, query_lis))

    main_api_url = "https://catalog.data.gov/api/3/action/package_search"

    # Set up the parameters for the API request
    params = {
        "q": query_lis,
        "fq=tags": tags_lis,
    }

    filtered_params = {key: values for key, values in params.items() if values}

    # Concatenate values with '+' for the 'key' parameter
    formatted_params = '&'.join([f"{key}={'+'.join(map(str, values))}" if key=='q'
                                else f"{key}:{'+'.join(map(str, values))}" for key, values in filtered_params.items() ])

    # Concatenate the formatted parameters to the URL
    full_url = f"{main_api_url}?{formatted_params}"

    # Make the GET request
    

    try:
        # Make a request to the data.gov API
        response = requests.get(full_url)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes

        # Print the response content
        data=response.json()
        

        back_data=[]
        title_check = []

        for item in data['result']['results']:

            for res in item['resources']:
                if res['format']=="csv"or"CSV":
                    if item['title'] in title_check:
                        pass
                    else:
                        dict={}
                        dict['title']=item['title']
                        dict['description']=item['notes']
                        dict['link']=res['url']
                        title_check.append(item['title'])
                        back_data.append(dict)

        return {"results": back_data}

    except requests.RequestException as e:
        # Handle API request errors
        raise HTTPException(status_code=500, detail=f"Error fetching data from data.gov API: {str(e)}")


@app.post("/card_clicked")
async def card_clicked(item:Item):  
    
    # Now you can use the decoded_link as needed
    # print(link_request)
    print(item.link)
    downloader(item.link)
    return {"message": "Download started successfully"}


@app.post("/set_csv")
async def set_csv(file_path:FilePath):
    global Chain
    Chain=csv_upload(file_path.filePath)
    return {"message": f"Csv successfully uploaded"}

@app.post("/ask_chatbot")
async def ask_chatbot(question: str):
    if Chain is not None:
        chatbot_query(question, Chain)
        return {"result": "got result"}
    else:
        print("csv not uploaded")
        return {"error": "Csv not uploaded yet"}