import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Define cache directory on D: drive
cache_dir = "D:/huggingface"

# Download tokenizer & model to D:
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1", cache_dir=cache_dir)
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    cache_dir=cache_dir,
    torch_dtype=torch.float16,
    device_map="auto"
)

def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    output = model.generate(**inputs, max_new_tokens=100)
    return tokenizer.decode(output[0], skip_special_tokens=True)

prompt = "Hello, how are you?"
response = generate_response(prompt)
print(response)
