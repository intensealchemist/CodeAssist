import subprocess
import google.generativeai as genai
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .serializers import UserRegistrationSerializer, UserLoginSerializer
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


GEMINI_API_KEY = "YOUR API KEY"
genai.configure(api_key=GEMINI_API_KEY)

def query_mistral(prompt, timeout=5):
    command = [
        "/home/atul/CodeAssist/llama.cpp/build/bin/llama-cli",
        "-m", "/home/atul/CodeAssist/llama.cpp/mistral-7b-v0.1.Q4_K_M.gguf",
        "-p", prompt,
        "-n", "200",
        "--ctx-size", "2048"
    ]
    
    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=timeout)
        return result.stdout.strip() if result.returncode == 0 else None
    except subprocess.TimeoutExpired:
        return None
    except Exception:
        return None

def query_gemini(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text if response.text else "Gemini returned an empty response."
    except Exception:
        return "Both Mistral and Gemini failed."

@api_view(['POST'])
def get_response(request):
    prompt = request.data.get("prompt", "")

    if not prompt:
        return Response({"error": "No prompt provided"}, status=400)

    response = query_mistral(prompt) or query_gemini(prompt)
    return Response({"response": response})



class RegisterView(APIView):
    def post(self, request):
        """
        Handle user registration manually, no DRF serializer.
        """
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        password2 = request.data.get('password2')

        if not username or not password or not password2:
            return Response(
                {'error': 'Username, password, and password2 are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if password != password2:
            return Response(
                {'error': 'Passwords do not match.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Username already taken.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        user.save()

        return Response(
            {'message': 'User registered successfully.'},
            status=status.HTTP_201_CREATED
        )



class LoginView(APIView):
    def post(self, request):
        """
        Handle user login manually, no DRF serializer.
        """
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )


        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
def code_review(request):
    if request.method == 'POST':
        code_file = request.FILES.get('codeFile')
        if not code_file:
            return JsonResponse({'feedback': 'No file uploaded.'}, status=400)

        try:
            file_content = code_file.read().decode('utf-8')
        except Exception as e:
            return JsonResponse({'feedback': 'Error reading file.'}, status=500)
        try:
            gemini_api_url = 'NOT YET CREATED'
            payload = {'code': file_content}
            headers = {'Content-Type': 'application/json'}

            gemini_response = requests.post(
                gemini_api_url, data=json.dumps(payload), headers=headers
            )
            gemini_response.raise_for_status()

            gemini_data = gemini_response.json()
            feedback = gemini_data.get('feedback', 'No feedback provided.')
        except Exception as e:
            return JsonResponse({'feedback': 'Error processing file with Gemini API.'}, status=500)

        return JsonResponse({'feedback': feedback})
    else:
        return JsonResponse({'feedback': 'Invalid request method.'}, status=405)

@csrf_exempt
def explain_code(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            code = data.get("code", "").strip()
            if not code:
                return JsonResponse({"explanation": "No code provided."}, status=400)
            gemini_api_url = "API Endpoint"  
            payload = {"code": code}
            headers = {"Content-Type": "application/json"} 

            gemini_response = requests.post(gemini_api_url, data=json.dumps(payload), headers=headers)
            gemini_response.raise_for_status()
            gemini_data = gemini_response.json()
            explanation = gemini_data.get("explanation", "No explanation provided.")
            
            return JsonResponse({"explanation": explanation})
        except Exception as e:
            print("Error:", e)
            return JsonResponse({"explanation": "Error processing your code."}, status=500)
    else:
        return JsonResponse({"explanation": "Invalid request method."}, status=405)



import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def translate_code(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            code = data.get("code", "").strip()
            source_lang = data.get("sourceLang", "")
            target_lang = data.get("targetLang", "")
            if not code:
                return JsonResponse({"translatedCode": "No code provided."}, status=400)

            gemini_api_url = "" 
            payload = {
                "code": code,
                "source_language": source_lang,
                "target_language": target_lang,
            }
            headers = {"Content-Type": "application/json"} 

            gemini_response = requests.post(
                gemini_api_url, data=json.dumps(payload), headers=headers
            )
            gemini_response.raise_for_status()
            gemini_data = gemini_response.json()
            translated_code = gemini_data.get("translated_code", "Translation not provided.")
            
            return JsonResponse({"translatedCode": translated_code})
        except Exception as e:
            print("Translation error:", e)
            return JsonResponse({"translatedCode": "Error translating code."}, status=500)
    else:
        return JsonResponse({"translatedCode": "Invalid request method."}, status=405)
