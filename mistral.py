@app.post("/generate")
async def generate_text(request: PromptRequest):
    command = f'./bin/llama-cli -m TinyLlama-1.1B-chat-v1.0.gguf -p "{request.prompt}" -n 200'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    print("STDOUT:", result.stdout)  # Debugging
    print("STDERR:", result.stderr)  # Debugging
    
    return {"response": result.stdout, "error": result.stderr}
