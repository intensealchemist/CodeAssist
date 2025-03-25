import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import requests

print("Loading StarCoder model...")
starcoder_model = AutoModelForCausalLM.from_pretrained(
    "bigcode/starcoder",
    load_in_4bit=True, 
    device_map="auto"
)
starcoder_tokenizer = AutoTokenizer.from_pretrained("bigcode/starcoder")

MISTRAL_API_URL = "YOUR API KEY"
HF_API_KEY = "YOUR API KEY"

def get_response(prompt, model="starcoder"):
    if model == "starcoder":
        inputs = starcoder_tokenizer(prompt, return_tensors="pt").to("cuda")
        with torch.no_grad():
            output = starcoder_model.generate(**inputs, max_new_tokens=200)
        return starcoder_tokenizer.decode(output[0], skip_special_tokens=True)

    elif model == "mistral":
        headers = {"Authorization": f"Bearer {HF_API_KEY}"}
        response = requests.post(MISTRAL_API_URL, headers=headers, json={"inputs": prompt})
        return response.json().get("generated_text", "Error: Unable to get response")

    else:
        return "Invalid model selection"
