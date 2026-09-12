from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from backend.ai.llm import get_llm
from backend.ai.retrievers.chroma import get_vector_store


def get_rag_chain():
    llm = get_llm()
    vector_store = get_vector_store()
    retriever = vector_store.as_retriever()
    
    template = """Answer the question based only on the following context.
    Include the source names in your answer if you can.

    Context:
    {context}

    Question: {question}
    Answer:"""
    prompt = ChatPromptTemplate.from_template(template)

    def format_docs(docs):
        context = "\n\n".join(
            f"Content: {doc.page_content}\nSource: {doc.metadata.get('source', 'Unknown')}" 
            for doc in docs
        )
        print(context,'============================context=>>>>>>>>>>>>>>>>>>>>>>>>>')
        return context
    
    chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    
    return chain, retriever

def query_rag(question: str):
    chain, retriever = get_rag_chain()
    
    answer = chain.invoke(question)
    
    docs = retriever.invoke(question)
    sources = list(set([doc.metadata.get("source", "Unknown") for doc in docs]))
    
    return {
        "answer": answer,
        "sources": sources
    }
