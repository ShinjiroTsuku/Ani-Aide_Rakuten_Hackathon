#!/usr/bin/env python3
"""
API Test Script
Used to test if the backend API is working properly
"""

import requests
import json
import time

# API base URL
BASE_URL = "http://localhost:8000"

def test_api():
    """Test all API endpoints"""
    print("🚀 Starting API tests...")
    print("=" * 50)
    
    # Test root path
    print("1. Testing root path /")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print(f"✅ Success: {response.json()}")
        else:
            print(f"❌ Failed: Status code {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print()
    
    # Test get data
    print("2. Testing get data /data")
    try:
        response = requests.get(f"{BASE_URL}/data")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success: Retrieved {len(data)} data items")
            for item in data:
                print(f"   - {item['title']}: {item['content']}")
        else:
            print(f"❌ Failed: Status code {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print()
    
    # Test create data
    print("3. Testing create data /data")
    try:
        new_data = {
            "title": "Test Data",
            "content": "This is data created by the test script",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ")
        }
        response = requests.post(f"{BASE_URL}/data", json=new_data)
        if response.status_code == 200:
            created_item = response.json()
            print(f"✅ Success: Created data with ID {created_item['id']}")
        else:
            print(f"❌ Failed: Status code {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print()
    
    # Test user login
    print("4. Testing user login /auth/login")
    try:
        login_data = {
            "username": "test@example.com",
            "password": "password123"
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ Success: User {user_data['username']} logged in successfully")
            print(f"   Token: {user_data['token'][:20]}...")
        else:
            print(f"❌ Failed: Status code {response.status_code}")
            if response.status_code == 401:
                print("   Invalid username or password")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print()
    print("=" * 50)
    print("🎉 API testing completed!")
    print()
    print("If all tests pass, the backend API is working properly.")
    print("You can now start the frontend for complete testing.")

if __name__ == "__main__":
    test_api() 