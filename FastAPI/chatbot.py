from langchain.document_loaders import CSVLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
# from langchain_community.llms import VertexAI
import os
# AIzaSyBfC19UW2oyq2fb-atswzNtPuPOj2xUWp4
# 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
os.environ["OPENAI_API_KEY"] = "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"
# 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

def csv_upload(filepath):
    # Load the documents
    loader = CSVLoader(filepath)

    # Create an index using the loaded documents
    index_creator = VectorstoreIndexCreator()
    docsearch = index_creator.from_loaders([loader])

    # Create a question-answering chain using the index
    chain = RetrievalQA.from_chain_type(
        llm=OpenAI(),
        chain_type="stuff",
        retriever=docsearch.vectorstore.as_retriever(),
        input_key="question"
    )

    return chain



def chatbot_query(query,chain=None):
# Pass a query to the chain

    response = chain({"question": query})

    print(response['result'])

# chain=csv_upload("C:/Users/dwive/OneDrive/Desktop/newest.csv")
# question="what are the column values in csv"
# chatbot_query(question,chain)